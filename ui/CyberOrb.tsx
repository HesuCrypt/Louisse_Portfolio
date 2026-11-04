import React, { useEffect, useRef } from 'react';

interface CyberOrbProps {
  className?: string;
}

export const CyberOrb: React.FC<CyberOrbProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    autoAngle: 0,
    blinkTimer: 0,
    isBlinking: false,
    isVisible: true,
    reducedMotion: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    stateRef.current.reducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      stateRef.current.reducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Build high-density 3D Fibonacci / latitude sphere dots
    const latSteps = 36;
    const lonSteps = 72;
    const dots: Array<{ x: number; y: number; z: number; isVisorCutout: boolean }> = [];

    for (let i = 1; i < latSteps; i++) {
      const phi = (Math.PI * i) / latSteps;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const ringCount = Math.max(8, Math.floor(lonSteps * sinPhi));
      for (let j = 0; j < ringCount; j++) {
        const theta = (2 * Math.PI * j) / ringCount;
        const x = sinPhi * Math.cos(theta);
        const y = cosPhi;
        const z = sinPhi * Math.sin(theta);

        // Visor cavity cutout
        const isVisorCutout = z > 0.44 && Math.abs(y) < 0.34 && Math.abs(x) < 0.52;
        dots.push({ x, y, z, isVisorCutout });
      }
    }

    let animationFrameId = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const size = Math.round(Math.min(rect.width || 380, rect.height || 380));
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth * 0.45)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight * 0.45)));

      stateRef.current.targetX = normX;
      stateRef.current.targetY = normY;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const render = (time: number) => {
      const st = stateRef.current;
      if (!st.isVisible) {
        animationFrameId = 0;
        return;
      }

      // Smooth inertia interpolation for mouse gaze
      st.currentX += (st.targetX - st.currentX) * 0.075;
      st.currentY += (st.targetY - st.currentY) * 0.075;

      if (!st.reducedMotion) {
        st.autoAngle += 0.0035;
      }

      // Blinking logic
      if (time - st.blinkTimer > 3800) {
        st.isBlinking = true;
        if (time - st.blinkTimer > 4000) {
          st.isBlinking = false;
          st.blinkTimer = time + Math.random() * 2000;
        }
      }

      const width = canvas.clientWidth || 380;
      const height = canvas.clientHeight || 380;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.clearRect(0, 0, width, height);

      // 3D rotation angles (orbit + gaze)
      const rotY = st.currentX * 0.6 + Math.sin(st.autoAngle) * 0.12;
      const rotX = -st.currentY * 0.45 + Math.cos(st.autoAngle * 0.7) * 0.08;

      const cosRY = Math.cos(rotY);
      const sinRY = Math.sin(rotY);
      const cosRX = Math.cos(rotX);
      const sinRX = Math.sin(rotX);

      // 1. Radar degree tick ring around the sphere
      const outerRadius = radius * 1.22;
      ctx.save();
      ctx.translate(cx, cy);

      for (let deg = 0; deg < 360; deg += 6) {
        const rad = (deg * Math.PI) / 180;
        const isMajor = deg % 30 === 0;
        const innerTick = outerRadius - (isMajor ? 7 : 3.5);
        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * innerTick, Math.sin(rad) * innerTick);
        ctx.lineTo(Math.cos(rad) * outerRadius, Math.sin(rad) * outerRadius);
        ctx.strokeStyle = isMajor
          ? 'rgba(255, 255, 255, 0.22)'
          : 'rgba(255, 255, 255, 0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Orbital tracker indicator
      const trackerAngle = -Math.PI * 0.58 + st.currentX * 0.35;
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(
        Math.cos(trackerAngle) * (outerRadius - 10),
        Math.sin(trackerAngle) * (outerRadius - 10),
        2.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();

      // 2. Dark inner core cavity gradient for visor contrast
      const coreGrad = ctx.createRadialGradient(
        cx - radius * 0.2,
        cy - radius * 0.2,
        radius * 0.1,
        cx,
        cy,
        radius * 1.05
      );
      coreGrad.addColorStop(0, 'rgba(16, 17, 20, 0.95)');
      coreGrad.addColorStop(0.75, 'rgba(6, 7, 9, 0.98)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // 3. Render 3D dots in two depth passes (back-to-front sorting)
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];

          // 3D rotation
          const x1 = d.x * cosRY + d.z * sinRY;
          const z1 = -d.x * sinRY + d.z * cosRY;
          const y1 = d.y * cosRX - z1 * sinRX;
          const z2 = d.y * sinRX + z1 * cosRX;

          // Depth split
          if (pass === 0 && z2 >= 0) continue;
          if (pass === 1 && z2 < 0) continue;

          // Visor cutout on front surface
          if (d.isVisorCutout && z2 > 0.18) {
            continue;
          }

          const perspective = 2.6 / (2.6 - z2 * 0.55);
          const px = cx + x1 * radius * perspective;
          const py = cy + y1 * radius * perspective;

          // Specular directional lighting from top-left
          const light = Math.max(0, x1 * -0.48 + y1 * -0.48 + z2 * 0.74);
          const depthAlpha = z2 < -0.15 ? 0.12 : 0.22 + Math.pow(light, 1.35) * 0.78;
          const dotSize = Math.max(1.1, (1.2 + light * 1.6) * (z2 > 0 ? 1 : 0.65));

          ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha.toFixed(3)})`;
          const half = dotSize * 0.5;
          ctx.fillRect(px - half, py - half, dotSize, dotSize);
        }
      }

      // 4. Expressive robotic eyes inside the visor
      const eyeOffsetX = st.currentX * radius * 0.26;
      const eyeOffsetY = st.currentY * radius * 0.2;
      const eyeSpacing = radius * 0.23;
      const eyeCenterX = cx + eyeOffsetX;
      const eyeCenterY = cy + eyeOffsetY;

      const rows = st.isBlinking ? 1 : 5;
      const cols = 2;
      const pixelGap = 4.1;

      [-1, 1].forEach((side) => {
        const baseEyeX = eyeCenterX + side * eyeSpacing;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const px = baseEyeX + (c - 0.5) * pixelGap;
            const py = eyeCenterY + (r - (rows - 1) / 2) * pixelGap;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(px - 2.5, py - 2.5, 5, 5);

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
          }
        }
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!stateRef.current.isVisible) {
        stateRef.current.isVisible = true;
      }
      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      stateRef.current.isVisible = false;
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const handleContentVisibility = (event: Event) => {
      const cvEvent = event as Event & { skipped?: boolean };
      if (cvEvent.skipped) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    container.addEventListener('contentvisibilityautostatechange', handleContentVisibility);

    let observer: IntersectionObserver | null = null;
    if (!('contentVisibility' in document.documentElement.style)) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startLoop();
            } else {
              stopLoop();
            }
          });
        },
        { rootMargin: '200px' }
      );
      observer.observe(container);
    }

    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      mediaQuery.removeEventListener('change', handleMotionChange);
      container.removeEventListener('contentvisibilityautostatechange', handleContentVisibility);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto none auto 420px',
      }}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Top HUD Cardinal Marker */}
      <div className="pointer-events-none mb-2.5 flex items-center gap-4 font-mono text-xs tracking-wider text-white/40 uppercase">
        <span>+</span>
        <span className="flex items-center gap-2 text-white/70">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Neural Core // V2.6
        </span>
        <span>+</span>
      </div>

      {/* Main 3D Canvas */}
      <div className="relative flex items-center justify-center">
        <canvas
          ref={canvasRef}
          aria-label="Interactive 3D AI Neural Core responding to cursor orientation."
          className="aspect-square w-[320px] max-w-full cursor-default sm:w-[380px] md:w-[420px]"
        />
      </div>

      {/* Bottom Minimalist Status Line */}
      <div className="pointer-events-none mt-3.5 flex items-center gap-3 font-mono text-xs tracking-widest text-white/40 uppercase">
        <span>Interactive 3D</span>
        <span className="h-1 w-1 rounded-full bg-white/30" />
        <span>Gaze Tracking</span>
      </div>
    </div>
  );
};