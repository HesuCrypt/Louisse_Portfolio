import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ArrowUpRight } from 'lucide-react';
import { socials } from '../data/socials';
import { containerVariants, itemVariants } from '../motion/variants';
import { buildProjectInquiryEmail } from '../utils/contact';
import { Container } from '../ui/Container';
import { Body, H2 } from '../ui/Text';

export const ProjectContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Business Website',
    budget: 'PHP 30k to PHP 40k',
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
          budget: 'PHP 30k to PHP 40k',
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
    <section id="contact" className="py-24 md:py-40">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] uppercase tracking-wider text-emerald-400 mb-4">
              Available for 2 projects this month
            </span>
            <H2>Let&apos;s Work Together</H2>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <Body className="text-xl md:text-2xl text-neutral-300 max-w-2xl">
              Book a free consultation and share your project scope. I will recommend the best package, timeline, and
              implementation plan based on your goals.
            </Body>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="mb-12 rounded-2xl border border-neutral-800 bg-neutral-950/40 p-6 md:p-8"
          >
            <p className="text-white text-sm mb-5">Project Intake Form</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="text-sm text-neutral-400">
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
                />
              </label>
              <label className="text-sm text-neutral-400">
                Project Type
                <select
                  name="projectType"
                  autoComplete="off"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
                >
                  <option>Portfolio Starter</option>
                  <option>Starter Website</option>
                  <option>Business Website</option>
                  <option>Professional Website</option>
                  <option>Custom Project</option>
                </select>
              </label>
              <label className="text-sm text-neutral-400">
                Budget Range
                <select
                  name="budget"
                  autoComplete="off"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
                >
                  <option>PHP 5k to PHP 20k</option>
                  <option>PHP 30k to PHP 40k</option>
                  <option>PHP 45k and up</option>
                </select>
              </label>
              <label className="text-sm text-neutral-400 md:col-span-2">
                Preferred Timeline
                <select
                  name="timeline"
                  autoComplete="off"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
                >
                  <option>Within 1 to 2 weeks</option>
                  <option>Within 2 to 4 weeks</option>
                  <option>Within 1 to 2 months</option>
                  <option>Flexible</option>
                </select>
              </label>
              <label className="text-sm text-neutral-400 md:col-span-2">
                Project Details
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What are you building, who is it for, and what outcome do you want?"
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-neutral-500"
                />
              </label>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-neutral-500">
                By sending this inquiry, you agree to the Privacy Policy and Terms below.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {isSubmitting ? 'Sending…' : 'Book Free Consultation'}
              </button>
            </div>
            {submitFeedback && (
              <p className="mt-3 text-xs text-emerald-400" aria-live="polite">
                {submitFeedback}
              </p>
            )}
          </motion.form>

          <motion.div variants={itemVariants} className="mb-12 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-6 md:p-8">
            <p className="text-sm font-medium text-white mb-4">Quick FAQ</p>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white mb-1">How soon can we start?</p>
                <p className="text-neutral-400">Most projects start within 2 to 5 days after confirmation and initial payment.</p>
              </div>
              <div>
                <p className="text-white mb-1">How does payment work?</p>
                <p className="text-neutral-400">Standard setup is 50% upfront and 50% before final handoff and deployment.</p>
              </div>
              <div>
                <p className="text-white mb-1">Do you offer revisions?</p>
                <p className="text-neutral-400">Yes. Every package includes two revision rounds for each page section.</p>
              </div>
            </div>
          </motion.div>

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
              <p>I only use your inquiry details to reply, quote, and manage your project communication.</p>
            </div>
            <div id="terms" className="rounded-xl border border-neutral-800 p-4">
              <p className="text-white text-sm mb-2">Terms of Service</p>
              <p>Final scope, timeline, and deliverables are confirmed before starting. Extra requests are quoted separately.</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
