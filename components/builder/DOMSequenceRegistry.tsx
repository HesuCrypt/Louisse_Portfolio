'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { builderAudio } from '../../lib/builderAudio';
import { runBuild, type CancelToken } from './builderEngine';
import {
  BUILT_STORAGE_KEY,
  SECTION_ORDER,
  createCursorModel,
  type BuildElement,
  type BuilderMode,
  type BuilderSection,
  type CursorModel,
} from './builderTypes';

export type { BuildElement, BuilderChannel, BuilderMode, BuilderSection, BuildType } from './builderTypes';

export interface DualCursorState {
  alpha: CursorModel;
  beta: CursorModel;
}

export interface BuilderContextValue {
  mode: BuilderMode;
  activeSection: BuilderSection;
  isBuilding: boolean;
  /** True once all sections finished building. */
  isFinished: boolean;
  isMuted: boolean;
  /** True when sessionStorage says this visitor already built or skipped. */
  hasSkipped: boolean;
  /** Bumps on replay so BuildItems can reset their local state. */
  epoch: number;
  canReplay: boolean;
  /** Ordered array of registered elements sorted by sectionId and order. */
  registeredQueue: ReadonlyArray<BuildElement>;
  /** Index of the active element currently being built in registeredQueue. */
  currentStepIndex: number;
  /** Set of item IDs that have completed their creation animation. */
  completedIds: ReadonlySet<string>;
  registeredElements: ReadonlyMap<string, BuildElement>;
  cursorAlpha: CursorModel;
  cursorBeta: CursorModel;
  /** Backwards compatibility alias for single-cursor references */
  cursor: CursorModel;
  register: (element: BuildElement) => void;
  registerItem: (element: BuildElement) => void;
  unregister: (id: string) => void;
  unregisterItem: (id: string) => void;
  markComplete: (id: string) => void;
  isCompleted: (id: string) => boolean;
  skip: () => void;
  skipAll: () => void;
  replay: () => void;
  replayBuild: () => void;
  toggleMute: () => void;
}

const inertCursorAlpha = createCursorModel();
const inertCursorBeta = createCursorModel();

function sortQueue(items: Iterable<BuildElement>): BuildElement[] {
  return Array.from(items).sort((a, b) => {
    const sa = SECTION_ORDER.indexOf(a.sectionId);
    const sb = SECTION_ORDER.indexOf(b.sectionId);
    if (sa !== sb) return sa - sb;
    if (a.order !== b.order) return a.order - b.order;
    return a.id.localeCompare(b.id);
  });
}

/** Fallback so BuildItem renders fully visible anywhere outside a provider. */
const defaultValue: BuilderContextValue = {
  mode: 'instant',
  activeSection: 'completed',
  isBuilding: false,
  isFinished: false,
  isMuted: false,
  hasSkipped: true,
  epoch: 0,
  canReplay: false,
  registeredQueue: [],
  currentStepIndex: 0,
  completedIds: new Set(),
  registeredElements: new Map(),
  cursorAlpha: inertCursorAlpha,
  cursorBeta: inertCursorBeta,
  cursor: inertCursorAlpha,
  register: () => undefined,
  registerItem: () => undefined,
  unregister: () => undefined,
  unregisterItem: () => undefined,
  markComplete: () => undefined,
  isCompleted: () => true,
  skip: () => undefined,
  skipAll: () => undefined,
  replay: () => undefined,
  replayBuild: () => undefined,
  toggleMute: () => undefined,
};

export const BuilderContext = createContext<BuilderContextValue>(defaultValue);

function readBuilt(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(BUILT_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeBuilt(value: boolean) {
  if (typeof window === 'undefined') return;
  try {
    if (value) window.sessionStorage.setItem(BUILT_STORAGE_KEY, 'true');
    else window.sessionStorage.removeItem(BUILT_STORAGE_KEY);
  } catch {
    // private mode: the build simply replays next visit
  }
}

function detectMode(enabled: boolean): BuilderMode {
  if (typeof window === 'undefined' || !enabled) return 'instant';
  if (readBuilt()) return 'instant';
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 'instant';
  return 'cursor';
}

export interface BuilderProviderProps {
  children: React.ReactNode;
  /** Only the home route is built; every other route renders instantly. */
  enabled?: boolean;
  /** Test hook: multiplies all choreography durations down. */
  speed?: number;
}

export const BuilderProvider: React.FC<BuilderProviderProps> = ({
  children,
  enabled = true,
  speed = 1,
}) => {
  const [mode, setMode] = useState<BuilderMode>(() => detectMode(enabled));
  const [activeSection, setActiveSection] = useState<BuilderSection>('hero');
  const [isBuilding, setIsBuilding] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(() =>
    typeof builderAudio.isMuted === 'boolean'
      ? builderAudio.isMuted
      : typeof (builderAudio as any).getMuted === 'function'
        ? (builderAudio as any).getMuted()
        : true
  );
  const [hasSkipped, setHasSkipped] = useState(() =>
    typeof window === 'undefined' ? true : readBuilt()
  );
  const [epoch, setEpoch] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSnapshot, setCompletedSnapshot] = useState<ReadonlySet<string>>(() => new Set());
  const [queueSnapshot, setQueueSnapshot] = useState<ReadonlyArray<BuildElement>>([]);

  const registry = useRef(new Map<string, BuildElement>());
  const completed = useRef(new Set<string>());
  const cursorAlpha = useRef<CursorModel>(createCursorModel()).current;
  const cursorBeta = useRef<CursorModel>(createCursorModel()).current;
  const token = useRef<CancelToken>({ cancelled: true });
  const modeRef = useRef(mode);
  const finishedRef = useRef(false);
  modeRef.current = mode;

  /* --------------------------- registry ------------------------------ */

  const register = useCallback((element: BuildElement) => {
    registry.current.set(element.id, element);
    if (finishedRef.current && !completed.current.has(element.id)) {
      completed.current.add(element.id);
      element.onStart?.();
      element.onProgress?.(1);
      element.onComplete?.();
      setCompletedSnapshot(new Set(completed.current));
    }
    setQueueSnapshot(sortQueue(registry.current.values()));
  }, []);

  const unregister = useCallback((id: string) => {
    registry.current.delete(id);
    setQueueSnapshot(sortQueue(registry.current.values()));
  }, []);

  const markComplete = useCallback((id: string) => {
    completed.current.add(id);
    const el = registry.current.get(id);
    el?.onProgress?.(1);
    el?.onComplete?.();
    setCompletedSnapshot(new Set(completed.current));
    const sorted = sortQueue(registry.current.values());
    const nextIdx = sorted.findIndex((item) => !completed.current.has(item.id));
    setCurrentStepIndex(nextIdx === -1 ? sorted.length : nextIdx);
  }, []);

  const isCompleted = useCallback((id: string) => completed.current.has(id), []);

  /* ------------------------ mute (Web Audio) -------------------------- */

  useEffect(() => builderAudio.subscribe(setIsMuted), []);
  const toggleMute = useCallback(() => {
    builderAudio.toggleMuted();
  }, []);

  /* ------------------------------ skip -------------------------------- */

  const skip = useCallback(() => {
    token.current.cancelled = true;
    registry.current.forEach((element) => {
      completed.current.add(element.id);
      element.onStart?.();
      element.onProgress?.(1);
      element.onComplete?.();
    });
    cursorAlpha.visible = false;
    cursorAlpha.frame = null;
    cursorAlpha.caret = false;
    cursorAlpha.down = false;

    cursorBeta.visible = false;
    cursorBeta.frame = null;
    cursorBeta.caret = false;
    cursorBeta.down = false;

    writeBuilt(true);
    finishedRef.current = false;
    setCompletedSnapshot(new Set(completed.current));
    setCurrentStepIndex(registry.current.size);
    setMode('instant');
    setHasSkipped(true);
    setIsBuilding(false);
    setIsFinished(false);
    setActiveSection('completed');
  }, [cursorAlpha, cursorBeta]);

  /* ----------------------------- replay ------------------------------- */

  const replay = useCallback(() => {
    token.current.cancelled = true;
    writeBuilt(false);
    completed.current.clear();
    finishedRef.current = false;

    cursorAlpha.visible = false;
    cursorAlpha.frame = null;
    cursorBeta.visible = false;
    cursorBeta.frame = null;

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    setCompletedSnapshot(new Set());
    setCurrentStepIndex(0);
    setHasSkipped(false);
    setIsFinished(false);
    setActiveSection('hero');
    setMode('cursor');
    setEpoch((value) => value + 1);
  }, [cursorAlpha, cursorBeta]);

  /* --------------- route enable/disable (home route only) ------------- */

  const previousEnabled = useRef(enabled);
  useEffect(() => {
    if (previousEnabled.current === enabled) return;
    previousEnabled.current = enabled;

    if (!enabled) {
      token.current.cancelled = true;
      cursorAlpha.visible = false;
      cursorAlpha.frame = null;
      cursorBeta.visible = false;
      cursorBeta.frame = null;
      finishedRef.current = false;
      setMode('instant');
      setIsBuilding(false);
      setIsFinished(false);
      return;
    }

    const next = detectMode(true);
    completed.current.clear();
    setCompletedSnapshot(new Set());
    setCurrentStepIndex(0);
    setHasSkipped(readBuilt());
    setMode(next);
    setEpoch((value) => value + 1);
  }, [enabled, cursorAlpha, cursorBeta]);

  /* ------------------------- dual-builder loop ------------------------- */

  useEffect(() => {
    if (mode !== 'cursor') return undefined;

    const mine: CancelToken = { cancelled: false };
    token.current = mine;
    finishedRef.current = false;
    setIsBuilding(true);
    setIsFinished(false);

    void runBuild(mine, {
      getElements: () => Array.from(registry.current.values()),
      isDone: (id) => completed.current.has(id),
      markDone: (id) => {
        completed.current.add(id);
        if (!mine.cancelled) {
          setCompletedSnapshot(new Set(completed.current));
          const sorted = sortQueue(registry.current.values());
          const nextIdx = sorted.findIndex((item) => !completed.current.has(item.id));
          setCurrentStepIndex(nextIdx === -1 ? sorted.length : nextIdx);
        }
      },
      cursorAlpha,
      cursorBeta,
      cursor: cursorAlpha,
      audio: builderAudio,
      speed,
      onSection: (section) => {
        if (!mine.cancelled) setActiveSection(section);
      },
    }).then((built) => {
      if (!built || mine.cancelled) return;
      finishedRef.current = true;
      writeBuilt(true);
      setHasSkipped(true);
      setIsBuilding(false);
      setIsFinished(true);
      setActiveSection('completed');
    });

    return () => {
      mine.cancelled = true;
      cursorAlpha.visible = false;
      cursorAlpha.frame = null;
      cursorAlpha.caret = false;
      cursorAlpha.down = false;

      cursorBeta.visible = false;
      cursorBeta.frame = null;
      cursorBeta.caret = false;
      cursorBeta.down = false;
    };
  }, [mode, epoch, cursorAlpha, cursorBeta, speed]);

  /* -------------------- ESC to skip, mouse conflict ------------------- */

  useEffect(() => {
    if (mode !== 'cursor' || !isBuilding) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') skip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, isBuilding, skip]);

  useEffect(() => {
    if (mode !== 'cursor') return undefined;
    const onMove = () => {
      cursorAlpha.userActiveUntil = performance.now() + 1400;
      cursorBeta.userActiveUntil = performance.now() + 1400;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mode, cursorAlpha, cursorBeta]);

  const value = useMemo<BuilderContextValue>(
    () => ({
      mode,
      activeSection,
      isBuilding,
      isFinished,
      isMuted,
      hasSkipped,
      epoch,
      canReplay: enabled,
      registeredQueue: queueSnapshot,
      currentStepIndex,
      completedIds: completedSnapshot,
      registeredElements: registry.current,
      cursorAlpha,
      cursorBeta,
      cursor: cursorAlpha,
      register,
      registerItem: register,
      unregister,
      unregisterItem: unregister,
      markComplete,
      isCompleted,
      skip,
      skipAll: skip,
      replay,
      replayBuild: replay,
      toggleMute,
    }),
    [
      mode,
      activeSection,
      isBuilding,
      isFinished,
      isMuted,
      hasSkipped,
      epoch,
      enabled,
      queueSnapshot,
      currentStepIndex,
      completedSnapshot,
      cursorAlpha,
      cursorBeta,
      register,
      unregister,
      markComplete,
      isCompleted,
      skip,
      replay,
      toggleMute,
    ]
  );

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
};

export const useBuilder = (): BuilderContextValue => useContext(BuilderContext);
