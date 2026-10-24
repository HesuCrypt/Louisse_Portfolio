import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { socials } from '../data/socials';
import { containerVariants, itemVariants } from '../motion/variants';
import { buildGeneralInquiryEmail } from '../utils/contact';
import {
  getNextInquiryIndex,
  getPreviousInquiryIndex,
  isValidInquiryOption,
} from '../utils/generalContactDropdown';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Body } from '../ui/Text';

const inquiryOptions = [
  'Job Opportunity',
  'Project Collaboration',
  'Freelance Work',
  'Contract Role',
  'General Question',
] as const;

const fieldStyles =
  'mt-2 w-full rounded-none border border-line-mid bg-ink px-3.5 py-3 font-sans text-[0.9375rem] text-fg placeholder-fg-faint transition-colors focus-visible:border-paper focus-visible:outline-none';

const fieldLabelStyles = 'font-mono text-2xs tracking-wider2 text-fg-dim uppercase';

export const GeneralContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen) {
      optionRefs.current[highlightedIndex]?.focus();
    }
  }, [highlightedIndex, isDropdownOpen]);

  const selectInquiryType = (option: (typeof inquiryOptions)[number], index: number) => {
    setFormData((current: typeof formData) => ({ ...current, inquiryType: option }));
    setHighlightedIndex(index);
    setIsDropdownOpen(false);
    setSubmitFeedback('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidInquiryOption(formData.inquiryType, inquiryOptions)) {
      setSubmitFeedback('Select an inquiry type before sending your message.');
      setIsDropdownOpen(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitFeedback('');

    const builtEmail = buildGeneralInquiryEmail(formData);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: formData.name,
            email: formData.email,
            inquiry_type: formData.inquiryType,
            message: formData.message,
          },
          { publicKey }
        );

        setSubmitFeedback('Message sent. I will get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          inquiryType: '',
          message: '',
        });
        setIsSubmitting(false);
        return;
      } catch (error: any) {
        const debugReason =
          error?.text || error?.message || error?.status?.toString() || 'Unknown EmailJS error';
        setSubmitFeedback(`EmailJS error: ${debugReason}. Opening your email app instead.`);
      }
    }

    const subject = encodeURIComponent(builtEmail.subject);
    const body = encodeURIComponent(builtEmail.body);
    window.location.href = `mailto:louissebertillo2004@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
  };

  const selectedInquiryLabel = formData.inquiryType || 'Select inquiry type';

  return (
    <section id="contact" className="scroll-mt-[var(--topbar-h)] py-16 md:py-24">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <SectionHeader
            index="08"
            label="Contact"
            title="Let's work together"
            meta="Response under 24h"
          />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left: intro + direct channels */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <Body className="text-base md:text-[1.0625rem]">
                Open to job opportunities, contract roles, collaborations, and freelance projects.
                Every message lands in my inbox — not a ticket queue.
              </Body>

              <div className="mt-8 border-t border-line">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith('mailto') ? undefined : '_blank'}
                    rel={social.url.startsWith('mailto') ? undefined : 'noreferrer'}
                    className="group flex items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:text-fg"
                  >
                    <span className="flex items-center gap-3">
                      <social.icon size={16} className="text-fg-dim group-hover:text-fg" aria-hidden="true" />
                      <span className="font-sans text-[13px] text-fg-muted group-hover:text-fg">
                        {social.name}
                      </span>
                    </span>
                    <span className="font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line">
                <div id="privacy" className="bg-ink p-5">
                  <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                    Privacy Policy
                  </span>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">
                    I only use your inquiry details to reply and manage communication related to your message.
                  </p>
                </div>
                <div id="terms" className="bg-ink p-5">
                  <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                    Terms of Service
                  </span>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">
                    Scope, timeline, and deliverables are confirmed before any paid project work begins.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="border border-line-mid bg-panel p-5 md:p-8 lg:col-span-8"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                  General Inquiry
                </span>
                <span className="font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                  08 / Contact
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className={fieldLabelStyles}>
                  Name
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    placeholder="Your name or company"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                    className={fieldStyles}
                  />
                </label>
                <label className={fieldLabelStyles}>
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    className={fieldStyles}
                  />
                </label>

                <div className={`${fieldLabelStyles} md:col-span-2`}>
                  <span className="block">Inquiry Type</span>
                  <input type="hidden" name="inquiryType" value={formData.inquiryType} />
                  <div ref={dropdownRef} className="relative mt-2">
                    <button
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                      aria-controls="general-inquiry-options"
                      className="flex w-full items-center justify-between border border-line-mid bg-ink px-4 py-3 text-left font-sans text-[0.9375rem] text-fg transition-colors focus-visible:border-paper focus-visible:outline-none"
                      onClick={() => setIsDropdownOpen((current: boolean) => !current)}
                      onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                        if (event.key === 'ArrowDown') {
                          event.preventDefault();
                          setIsDropdownOpen(true);
                          setHighlightedIndex((current: number) => getNextInquiryIndex(current, inquiryOptions));
                        }

                        if (event.key === 'ArrowUp') {
                          event.preventDefault();
                          setIsDropdownOpen(true);
                          setHighlightedIndex((current: number) => getPreviousInquiryIndex(current, inquiryOptions));
                        }

                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setIsDropdownOpen((current: boolean) => !current);
                        }

                        if (event.key === 'Escape') {
                          setIsDropdownOpen(false);
                        }
                      }}
                    >
                      <span className={formData.inquiryType ? 'text-fg' : 'text-fg-faint'}>
                        {selectedInquiryLabel}
                      </span>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`text-fg-dim transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isDropdownOpen ? (
                      <div className="absolute left-0 right-0 z-20 mt-px border border-line-strong bg-ink">
                        <p className="border-b border-line px-3.5 py-2 font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                          Select Inquiry Type
                        </p>
                        <ul id="general-inquiry-options" role="listbox" aria-label="Inquiry Type">
                          {inquiryOptions.map((option, index) => (
                            <li key={option} className="border-b border-line last:border-b-0">
                              <button
                                ref={(element: HTMLButtonElement | null) => {
                                  optionRefs.current[index] = element;
                                }}
                                type="button"
                                role="option"
                                aria-selected={formData.inquiryType === option}
                                className={`flex w-full items-center gap-3 px-3.5 py-3 text-left font-mono text-xs tracking-wider2 uppercase transition-colors focus-visible:outline-none ${
                                  highlightedIndex === index || formData.inquiryType === option
                                    ? 'bg-paper text-ink'
                                    : 'text-fg-dim hover:bg-panel-2 hover:text-fg'
                                }`}
                                onClick={() => selectInquiryType(option, index)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                                  if (event.key === 'ArrowDown') {
                                    event.preventDefault();
                                    setHighlightedIndex((current: number) => getNextInquiryIndex(current, inquiryOptions));
                                  }

                                  if (event.key === 'ArrowUp') {
                                    event.preventDefault();
                                    setHighlightedIndex((current: number) => getPreviousInquiryIndex(current, inquiryOptions));
                                  }

                                  if (event.key === 'Home') {
                                    event.preventDefault();
                                    setHighlightedIndex(0);
                                  }

                                  if (event.key === 'End') {
                                    event.preventDefault();
                                    setHighlightedIndex(inquiryOptions.length - 1);
                                  }

                                  if (event.key === 'Escape') {
                                    event.preventDefault();
                                    setIsDropdownOpen(false);
                                  }
                                }}
                              >
                                <span
                                  className={`h-1.5 w-1.5 shrink-0 ${
                                    highlightedIndex === index || formData.inquiryType === option
                                      ? 'bg-ink'
                                      : 'bg-line-strong'
                                  }`}
                                  aria-hidden="true"
                                />
                                {option}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>

                <label className={`${fieldLabelStyles} md:col-span-2`}>
                  Message
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me a bit about the role, project, or opportunity…"
                    className={`${fieldStyles} resize-y`}
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[46ch] font-mono text-2xs leading-relaxed text-fg-faint uppercase">
                  By sending this message you agree to the Privacy Policy and Terms.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex shrink-0 items-center justify-center gap-2 border border-paper bg-paper px-5 py-3 font-mono text-[11px] tracking-wider2 text-ink uppercase transition-colors duration-200 hover:bg-ink hover:text-paper disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Sending…' : 'Send Message'}</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>

              {submitFeedback ? (
                <p className="mt-4 font-mono text-2xs tracking-wider2 text-fg-muted uppercase" aria-live="polite">
                  {submitFeedback}
                </p>
              ) : null}
            </motion.form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
