import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ArrowUpRight } from 'lucide-react';
import { socials } from '../data/socials';
import { containerVariants, itemVariants } from '../motion/variants';
import { buildProjectInquiryEmail } from '../utils/contact';
import { Container } from '../ui/Container';
import { Body, H2 } from '../ui/Text';

const fieldStyles =
  'mt-2 w-full rounded-none border border-line-mid bg-ink px-3.5 py-3 font-sans text-[0.9375rem] text-fg placeholder-fg-faint transition-colors focus-visible:border-paper focus-visible:outline-none';

const fieldLabelStyles = 'font-mono text-2xs tracking-wider2 text-fg-dim uppercase';

export const ProjectContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Business Website',
    budget: 'PHP 45k to PHP 60k',
    timeline: 'Within 2 to 4 weeks',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitFeedback('');

    const builtEmail = buildProjectInquiryEmail(formData);
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
            project_type: formData.projectType,
            budget: formData.budget,
            timeline: formData.timeline,
            message: formData.message,
          },
          { publicKey }
        );

        setSubmitFeedback('Inquiry sent. I will get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          projectType: 'Business Website',
          budget: 'PHP 45k to PHP 60k',
          timeline: 'Within 2 to 4 weeks',
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

  return (
    <section id="contact" className="scroll-mt-[var(--topbar-h)] py-16 md:py-24">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="mx-auto max-w-4xl"
        >
          <motion.div variants={itemVariants} className="border-t border-line pt-6">
            <span className="inline-flex items-center gap-2 border border-line-mid px-3 py-1 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
              <span className="h-1.5 w-1.5 bg-paper" aria-hidden="true" />
              Available for 2 projects this month
            </span>
            <H2 className="mt-4">Let&apos;s Work Together</H2>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6">
            <Body className="max-w-2xl text-base md:text-[1.0625rem]">
              Book a free consultation and share your project scope. I will recommend the best package, timeline, and
              implementation plan based on your goals.
            </Body>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="mt-10 border border-line-mid bg-panel p-4 sm:p-6 md:p-8"
          >
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">Project Intake Form</span>
              <span className="font-mono text-2xs tracking-wider2 text-fg-faint uppercase">Free Consultation</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className={fieldLabelStyles}>
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={fieldStyles}
                />
              </label>
              <label className={fieldLabelStyles}>
                Project Type
                <select
                  name="projectType"
                  autoComplete="off"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className={fieldStyles}
                >
                  <option>One-Page Sprint / Landing</option>
                  <option>Starter Website</option>
                  <option>Business Website</option>
                  <option>Professional Authority</option>
                  <option>Bespoke Web App / Creative Tech</option>
                  <option>Custom Project</option>
                </select>
              </label>
              <label className={fieldLabelStyles}>
                Budget Range
                <select
                  name="budget"
                  autoComplete="off"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className={fieldStyles}
                >
                  <option>PHP 10k to PHP 25k</option>
                  <option>PHP 30k to PHP 45k</option>
                  <option>PHP 45k to PHP 60k</option>
                  <option>PHP 60k to PHP 100k</option>
                  <option>PHP 100k and above</option>
                </select>
              </label>
              <label className={`${fieldLabelStyles} md:col-span-2`}>
                Preferred Timeline
                <select
                  name="timeline"
                  autoComplete="off"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className={fieldStyles}
                >
                  <option>Within 1 to 2 weeks</option>
                  <option>Within 2 to 4 weeks</option>
                  <option>Within 1 to 2 months</option>
                  <option>Flexible</option>
                </select>
              </label>
              <label className={`${fieldLabelStyles} md:col-span-2`}>
                Project Details
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What are you building, who is it for, and what outcome do you want?"
                  className={`${fieldStyles} resize-y`}
                />
              </label>
            </div>

            <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[46ch] font-mono text-2xs leading-relaxed text-fg-faint uppercase">
                By sending this inquiry, you agree to the Privacy Policy and Terms below.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 border border-paper bg-paper px-6 py-3 font-mono text-[11px] tracking-wider2 text-ink uppercase transition-colors duration-200 hover:bg-ink hover:text-paper disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? 'Sending…' : 'Book Free Consultation'}
              </button>
            </div>

            {submitFeedback && (
              <p className="mt-4 font-mono text-2xs tracking-wider2 text-fg-muted uppercase" aria-live="polite">
                {submitFeedback}
              </p>
            )}
          </motion.form>

          <motion.div variants={itemVariants} className="mt-10 border border-line-mid bg-panel p-4 sm:p-6 md:p-8">
            <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">Quick FAQ</span>
            <div className="mt-4 border-t border-line">
              <div className="border-b border-line py-4 last:border-b-0">
                <p className="text-[0.9375rem] font-medium text-fg">How soon can we start?</p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-fg-muted">
                  Most projects start within 2 to 5 days after confirmation and initial payment.
                </p>
              </div>
              <div className="border-b border-line py-4 last:border-b-0">
                <p className="text-[0.9375rem] font-medium text-fg">How does payment work?</p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-fg-muted">
                  Standard setup is 50% upfront and 50% before final handoff and deployment.
                </p>
              </div>
              <div className="border-b border-line py-4 last:border-b-0">
                <p className="text-[0.9375rem] font-medium text-fg">Do you offer revisions?</p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-fg-muted">
                  Yes. Every package includes two revision rounds for each page section.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3"
          >
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target={social.url.startsWith('mailto') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto') ? undefined : 'noreferrer'}
                className="group flex items-center justify-between gap-4 bg-ink p-4 transition-colors duration-200 hover:bg-panel sm:p-6"
              >
                <span className="flex items-center gap-4">
                  <social.icon
                    className="text-fg-dim transition-colors group-hover:text-fg"
                    size={20}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[13px] text-fg-muted transition-colors group-hover:text-fg">
                      {social.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                      {social.label}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  className="shrink-0 text-fg-faint transition-colors group-hover:text-fg"
                  size={16}
                  aria-hidden="true"
                />
              </a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            <div id="privacy" className="bg-ink p-5">
              <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">Privacy Policy</span>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">
                I only use your inquiry details to reply, quote, and manage your project communication.
              </p>
            </div>
            <div id="terms" className="bg-ink p-5">
              <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">Terms of Service</span>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">
                Final scope, timeline, and deliverables are confirmed before starting. Extra requests are quoted
                separately.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
