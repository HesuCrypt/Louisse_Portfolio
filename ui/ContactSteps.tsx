import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { BuildItem } from '../components/builder/BuildItem';

interface FormData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

interface ContactStepsProps {
  options: readonly string[];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isSubmitting: boolean;
  feedback: string;
  onSubmit: (e: React.FormEvent) => void;
}

const fieldStyles =
  'mt-2 w-full rounded-xl border border-white/10 bg-[#0c0d11] px-4 py-3 font-sans text-sm text-fg placeholder-fg-faint transition-colors focus-visible:border-white focus-visible:outline-none';

const fieldLabelStyles = 'font-mono text-2xs tracking-wider2 text-fg-dim uppercase';

export const ContactSteps: React.FC<ContactStepsProps> = ({
  options,
  formData,
  setFormData,
  isSubmitting,
  feedback,
  onSubmit,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  const canProceedStep1 =
    Boolean(formData.inquiryType) && Boolean(formData.name.trim()) && Boolean(formData.email.trim());

  return (
    <BuildItem id="contact-window" section="contact" order={1} type="frame">
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-[#0c0d11]/90 p-6 md:p-8 backdrop-blur-md"
    >
      {/* Terminal chrome: window dots are stamped, then the shell types itself */}
      <div className="mb-5 border-b border-white/10 pb-5">
        <div className="flex items-center gap-2">
          {['bg-amber-400', 'bg-emerald-400', 'bg-sky-400'].map((dot, dotIndex) => (
            <BuildItem
              as="span"
              key={dot}
              id={`contact-dot-${dotIndex}`}
              section="contact"
              order={2 + dotIndex}
              type="stamp"
              className="inline-flex"
            >
              <span className={`block h-3 w-3 rounded-full ${dot}`} />
            </BuildItem>
          ))}
          <span className="ml-3 font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
            louisse@portfolio: ~/contact
          </span>
        </div>
        <div className="mt-4 space-y-1.5 font-mono text-xs">
          <BuildItem
            as="span"
            id="contact-command"
            section="contact"
            order={5}
            type="typewriter"
            content={'> initiate_collaboration --type="Web & AI"'}
            className="block text-emerald-400"
          />
          <BuildItem
            as="span"
            id="contact-response"
            section="contact"
            order={6}
            type="typewriter"
            content="Status: Ready for deployment. Fill credentials below:"
            className="block text-fg-muted"
          />
        </div>
      </div>

      {/* Header with Step Tracker */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold tracking-wider text-fg uppercase">
            Start a Conversation
          </span>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-950/20 px-2 py-0.5 font-mono text-2xs text-emerald-400">
            Step {step} of 2
          </span>
        </div>
        <div className="flex gap-1.5">
          <span
            className={`h-1.5 w-6 rounded-full transition-colors ${
              step >= 1 ? 'bg-emerald-400' : 'bg-white/10'
            }`}
          />
          <span
            className={`h-1.5 w-6 rounded-full transition-colors ${
              step === 2 ? 'bg-emerald-400' : 'bg-white/10'
            }`}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6 space-y-6"
          >
            {/* Inquiry Type Selection Chips */}
            <div>
              <label className={fieldLabelStyles}>Select Topic / Reason</label>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {options.map((option) => {
                  const isSelected = formData.inquiryType === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setFormData((prev) => ({ ...prev, inquiryType: option }));
                      }}
                      className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/40 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                          : 'border-white/10 bg-white/5 text-fg-muted hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name and Email Inputs */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <BuildItem id="contact-field-name" section="contact" order={7} type="stamp" origin="left center">
              <label className={fieldLabelStyles}>
                Your Name / Company
                <input
                  required
                  name="name"
                  placeholder="e.g. Alex Vance"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={fieldStyles}
                />
              </label>
              </BuildItem>

              <BuildItem id="contact-field-email" section="contact" order={8} type="stamp" origin="left center">
              <label className={fieldLabelStyles}>
                Email Address
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="e.g. alex@studio.co"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className={fieldStyles}
                />
              </label>
              </BuildItem>
            </div>

            {/* Next Step Action */}
            <div className="flex justify-end pt-2">
              <BuildItem as="span" id="contact-continue" section="contact" order={9} type="stamp" className="inline-flex">
              <button
                type="button"
                disabled={!canProceedStep1}
                onClick={() => {
                  sound.playClick();
                  setStep(2);
                }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-2.5 font-sans text-xs font-semibold text-black transition-all hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Continue to Message</span>
                <ArrowRight size={14} />
              </button>
              </BuildItem>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-6 space-y-6"
          >
            {/* Selected Topic Summary Pill */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xs text-fg-dim uppercase">Topic:</span>
              <span className="rounded-full border border-emerald-400/40 bg-emerald-950/20 px-2.5 py-0.5 font-mono text-xs text-emerald-400">
                {formData.inquiryType}
              </span>
            </div>

            {/* Message Area */}
            <label className={fieldLabelStyles}>
              Project Scope, Goal, or Inquiry Details
              <textarea
                required
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Tell me a bit about what you want to build, timeline, or key objectives…"
                className={`${fieldStyles} resize-y`}
              />
            </label>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setStep(1);
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs text-fg-muted hover:text-white"
              >
                <ArrowLeft size={13} />
                <span>Back to Details</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !formData.message.trim()}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-sans text-xs font-semibold text-black transition-all hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{isSubmitting ? 'Sending…' : 'Send Message'}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submission Feedback Message */}
      {feedback && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 font-mono text-xs text-emerald-400">
          <CheckCircle2 size={14} className="shrink-0" />
          <span>{feedback}</span>
        </div>
      )}
    </form>
    </BuildItem>
  );
};

