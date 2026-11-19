import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, ArrowRight, MapPin } from 'lucide-react';
import { KineticMaskReveal, AnimatedDatumRule, ARCHITECTURAL_EASE } from './EditorialMotion';

interface Props {
  isDrawerOpen?: boolean;
  onToggleDrawer?: (open: boolean) => void;
}

export const ContactSection: React.FC<Props> = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Interior Architecture & Spatial Design',
    message: '',
  });

  const email = 'dharmimojidra2006@gmail.com';

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-[#E9DFC9] dark:bg-[#101626] relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.18em] mb-6">
          <span>08 / Dialogue</span>
          <span aria-hidden="true">·</span>
          <span>Inquiries & Collaborations</span>
        </div>

        {/* High-Impact Asymmetric Dialogue Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            <KineticMaskReveal>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] leading-[1.03] tracking-tight">
                Let's create something meaningful.
              </h2>
            </KineticMaskReveal>

            <AnimatedDatumRule delay={0.1} />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.08, ease: ARCHITECTURAL_EASE }}
              className="text-base sm:text-xl text-[#1C2D58] dark:text-[#DDD1BC] font-serif-architectural max-w-xl font-light leading-relaxed"
            >
              Available for residential interior commissions, adaptive reuse research, bespoke furniture collaborations, and architectural studio opportunities.
            </motion.p>

            {/* Unboxed Portfolio Coordinates */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.14, ease: ARCHITECTURAL_EASE }}
              className="pt-4 space-y-2.5 text-xs font-mono text-[#3D5288] dark:text-[#BFB299] border-t border-[#D9CBB1] dark:border-[#2A3759]"
            >
              <p className="text-[#263D78] dark:text-[#EFE6D5] font-semibold text-sm pt-2">
                Dharmi Mojidra
              </p>
              <p>
                Interior Design Portfolio · Indus University
              </p>
              <p className="flex items-center gap-1.5 text-[#3D5288] dark:text-[#BFB299]">
                <MapPin className="w-3.5 h-3.5 text-[#802C43] dark:text-[#C45D77]" />
                <span>Ahmedabad, Gujarat, India</span>
              </p>
            </motion.div>
          </div>

          {/* Direct Channels & Action Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: ARCHITECTURAL_EASE }}
            className="lg:col-span-5 border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] p-8 md:p-10 space-y-8 transition-colors duration-300"
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block mb-4">
                Direct Channels
              </span>

              {/* Email with 1-click copy */}
              <div className="space-y-4">
                <div className="border-b border-[#D9CBB1] dark:border-[#2A3759] pb-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299] block">Email</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-mono text-[#263D78] dark:text-[#EFE6D5] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors truncate block"
                    >
                      {email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-2 border border-[#C7B697] dark:border-[#3A4B75] hover:border-[#263D78] dark:hover:border-[#C45D77] text-[#263D78] dark:text-[#EFE6D5] transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-[#802C43] dark:text-[#C45D77]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>


                {/* LinkedIn */}
                <div className="border-b border-[#D9CBB1] dark:border-[#2A3759] pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299] block">LinkedIn</span>
                    <span className="text-sm font-mono text-[#263D78] dark:text-[#EFE6D5]">Dharmi Mojidra</span>
                  </div>
                  <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77]">Professional Profile</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Form */}
            {formSubmitted ? (
              <div className="border border-[#802C43]/50 dark:border-[#C45D77]/50 bg-[#E9DFC9]/70 dark:bg-[#141C30] p-5 text-center space-y-2">
                <Check className="w-6 h-6 text-[#802C43] dark:text-[#C45D77] mx-auto" />
                <h4 className="text-sm font-mono font-semibold text-[#263D78] dark:text-[#EFE6D5]">
                  Message Dispatched
                </h4>
                <p className="text-xs text-[#1C2D58] dark:text-[#DDD1BC]">
                  Thank you for reaching out to Dharmi Mojidra. She will review your inquiry and respond within 24–48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-mono underline text-[#802C43] dark:text-[#C45D77] hover:text-[#263D78] dark:hover:text-[#EFE6D5] pt-2 block mx-auto cursor-pointer"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block">
                  Send a Direct Note
                </span>

                <div>
                  <label className="text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ar. Rajesh Mehta"
                    className="w-full bg-[#E9DFC9]/55 dark:bg-[#101626] border border-[#C7B697] dark:border-[#3A4B75] px-3 py-2 text-xs font-mono text-[#1C2D58] dark:text-[#EFE6D5] placeholder:text-[#5C6D9B]/75 dark:placeholder:text-[#988C75] focus:outline-none focus:border-[#263D78] dark:focus:border-[#C45D77]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299] block mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-[#E9DFC9]/55 dark:bg-[#101626] border border-[#C7B697] dark:border-[#3A4B75] px-3 py-2 text-xs font-mono text-[#1C2D58] dark:text-[#EFE6D5] placeholder:text-[#5C6D9B]/75 dark:placeholder:text-[#988C75] focus:outline-none focus:border-[#263D78] dark:focus:border-[#C45D77]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299] block mb-1">Inquiry Focus</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#E9DFC9]/55 dark:bg-[#101626] border border-[#C7B697] dark:border-[#3A4B75] px-3 py-2 text-xs font-mono text-[#1C2D58] dark:text-[#EFE6D5] focus:outline-none focus:border-[#263D78] dark:focus:border-[#C45D77]"
                  >
                    <option>Interior Architecture & Spatial Design</option>
                    <option>Adaptive Reuse & Heritage Intervention</option>
                    <option>Bespoke Furniture Commission</option>
                    <option>Studio Internship / Associate Role</option>
                    <option>Academic or Research Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299] block mb-1">
                    Project Details / Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your site, programmatic needs, or collaboration idea..."
                    className="w-full bg-[#E9DFC9]/55 dark:bg-[#101626] border border-[#C7B697] dark:border-[#3A4B75] px-3 py-2 text-xs font-mono text-[#1C2D58] dark:text-[#EFE6D5] placeholder:text-[#5C6D9B]/75 dark:placeholder:text-[#988C75] focus:outline-none focus:border-[#263D78] dark:focus:border-[#C45D77]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#263D78] dark:bg-[#EFE6D5] hover:bg-[#802C43] dark:hover:bg-[#C45D77] text-[#F3EBDD] dark:text-[#1C2D58] dark:hover:text-[#F8F3E8] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
