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
import { Body, H2 } from '../ui/Text';

const inquiryOptions = [
  'Job Opportunity',
  'Project Collaboration',
  'Freelance Work',
  'Contract Role',
  'General Question',
] as const;

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
    <section id="contact" className="py-24 md:py-40">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500 mb-4">Contact</p>
            <H2>Let&apos;s Work Together</H2>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <Body className="text-xl md:text-2xl text-neutral-300 max-w-2xl">
              Reach out for job opportunities, contract roles, collaborations, freelance work, or general inquiries.
              I&apos;ll get back to you as soon as I can.
            </Body>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="mb-12 rounded-2xl border border-neutral-800 bg-neutral-950/40 p-6 md:p-8"
          >
            <p className="text-white text-sm mb-5 uppercase tracking-[0.24em]">General Inquiry</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="text-sm text-neutral-400">
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
                />
              </label>
              <label className="text-sm text-neutral-400">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
                />
              </label>
              <div className="text-sm text-neutral-400 md:col-span-2">
                <span className="block">Inquiry Type</span>
                <input type="hidden" name="inquiryType" value={formData.inquiryType} />
                <div ref={dropdownRef} className="relative mt-2">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    aria-controls="general-inquiry-options"
                    className="flex w-full items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-left text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
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
                    <span className={formData.inquiryType ? 'text-white' : 'text-neutral-500'}>
                      {selectedInquiryLabel}
                    </span>
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isDropdownOpen ? (
                    <div className="absolute left-0 right-0 z-20 mt-2 rounded-2xl border border-neutral-800 bg-black/95 p-2 shadow-2xl backdrop-blur">
                      <p className="px-3 pb-2 pt-1 text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                        Select Inquiry Type
                      </p>
                      <ul id="general-inquiry-options" role="listbox" aria-label="Inquiry Type" className="space-y-1">
                        {inquiryOptions.map((option, index) => (
                          <li key={option}>
                            <button
                              ref={(element: HTMLButtonElement | null) => {
                                optionRefs.current[index] = element;
                              }}
                              type="button"
                              role="option"
                              aria-selected={formData.inquiryType === option}
                              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                                highlightedIndex === index || formData.inquiryType === option
                                  ? 'bg-neutral-900 text-white'
                                  : 'text-neutral-400 hover:bg-neutral-950 hover:text-white'
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
                              <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" aria-hidden="true" />
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
              <label className="text-sm text-neutral-400 md:col-span-2">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me a bit about the role, project, or opportunity…"
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
                />
              </label>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-neutral-500">
                By sending this message, you agree to the Privacy Policy and Terms below.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </div>
            {submitFeedback && (
              <p className="mt-3 text-xs text-neutral-200" aria-live="polite">
                {submitFeedback}
              </p>
            )}
          </motion.form>

          <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target={social.url.startsWith('mailto') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto') ? undefined : 'noreferrer'}
                className="group flex items-center justify-between p-6 border border-neutral-900 bg-surface/30 hover:bg-neutral-900 transition-colors rounded-sm"
              >
                <div className="flex items-center gap-4">
                  <social.icon className="text-neutral-400 group-hover:text-white transition-colors" size={24} aria-hidden="true" />
                  <div>
                    <span className="block text-white font-medium">{social.name}</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">{social.label}</span>
                  </div>
                </div>
                <ArrowUpRight className="text-neutral-700 group-hover:text-white transition-colors" size={20} aria-hidden="true" />
              </a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-500">
            <div id="privacy" className="rounded-xl border border-neutral-800 p-4">
              <p className="text-white text-sm mb-2">Privacy Policy</p>
              <p>I only use your inquiry details to reply and manage communication related to your message.</p>
            </div>
            <div id="terms" className="rounded-xl border border-neutral-800 p-4">
              <p className="text-white text-sm mb-2">Terms of Service</p>
              <p>Scope, timeline, and deliverables are confirmed before any paid project work begins.</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
