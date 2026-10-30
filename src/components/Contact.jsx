import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import HlsVideoBackground from './HlsVideoBackground';
import { personalData } from '../data/personal';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sentNotice, setSentNotice] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    // Open mailto with prefilled values
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Vivek,\n\n${formState.message}\n\nBest regards,\n${formState.name}\n${formState.email}`
    );
    window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`;

    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col justify-center py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden bg-bg"
    >
      {/* Cinematic HLS Video Background with darker overlay as specified */}
      <HlsVideoBackground
        src={personalData.hero.hlsVideoUrl}
        overlayOpacity="bg-black/85"
      />

      {/* Top and bottom subtle gradient masks */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto w-full my-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Big Typography & Direct Contacts */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#89AACC]">
                [ 06 // CONTACT ]
              </span>
            </div>

            <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05]">
              Have an idea? <br />
              <span className="bg-gradient-to-r from-white via-[#e8e8e8] to-[#89AACC] bg-clip-text text-transparent">
                Let&apos;s build something.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-text/80 leading-relaxed font-light max-w-xl font-sans">
              Always interested in exploring new technologies, learning from interesting projects and connecting with people who love building things.
            </p>

            {/* Email Contact Pill & Direct Action */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${personalData.email}`}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium text-black bg-white hover:bg-white/90 shadow-xl shadow-white/10 transition-all duration-300"
                >
                  <Mail className="w-4 h-4 text-black" />
                  <span>Let&apos;s Talk ↗</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-full text-sm font-mono text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#89AACC]" />
                      <span>{personalData.email}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                Connect Online:
              </span>
              {personalData.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-1.5 text-sm text-muted hover:text-white transition-colors"
                >
                  <span>{s.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-[#89AACC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Interactive Message Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-[#121212]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              {/* Glow border gradient on card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#89AACC]/15 to-[#4E85BF]/15 opacity-50 pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#89AACC]" />
                    <h3 className="text-sm font-semibold text-white">Send a Message</h3>
                  </div>
                  <span className="text-[11px] font-mono text-muted">Quick Dispatch</span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Alex Taylor"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hello Vivek, let's discuss a project or collaboration..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted/40 focus:outline-none focus:border-[#89AACC] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-black bg-gradient-to-r from-[#89AACC] to-[#4E85BF] hover:opacity-95 shadow-md shadow-[#4E85BF]/20 transition-all font-sans text-xs tracking-wide"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message via Email Client</span>
                  </button>

                  {sentNotice && (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-xs">
                      Opening your email client... Thank you!
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
