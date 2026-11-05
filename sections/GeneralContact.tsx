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
import { sectionMeta } from '../data/sections';
import { ContactSteps } from '../ui/ContactSteps';

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

  const { index: sectionIndex, label: sectionLabel } = sectionMeta('contact');

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
            index={sectionIndex}
            label={sectionLabel}
            title="Let's work together"
            meta="Response under 24h"
          />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left: intro + direct channels */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <Body className="text-base md:text-[1.0625rem]">
                Available for engineering roles, contract projects, and freelance engagements.
                Direct communication, fast turnaround.
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
            <motion.div variants={itemVariants} className="lg:col-span-8">
              <ContactSteps
                options={inquiryOptions}
                formData={formData}
                setFormData={setFormData}
                isSubmitting={isSubmitting}
                feedback={submitFeedback}
                onSubmit={handleSubmit}
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
