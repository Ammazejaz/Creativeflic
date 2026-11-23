import React, { useState } from 'react';
import { ArrowRight, Scale, Search, Mic, Rocket, CheckCircle2, ChevronDown, Star, Calendar, Linkedin, Instagram, Youtube } from 'lucide-react';
import CFLogo from './CFLogo';
import Reveal from './Reveal';
import VideoTile from './VideoTile';
import FounderVideo from './FounderVideo';
import ContactForm from './ContactForm';
import SuccessOverlay from './SuccessOverlay';
import { BOOKING_URL } from '../config';
import { track } from '../analytics';

/**
 * Landing page for law firms and tax advisors: /law-firms/
 * Shares the main site's components and dark styling.
 */
const LawFirmsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [success, setSuccess] = useState(false);
  const isDark = true;
  const muted = 'text-neutral-400';
  const kicker = 'text-yellow-400';

  const toForm = () => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });

  const videos = [
    { id: 'cOgay6dZ0NM', title: 'Alabama’s Hidden 90-Day Trust Rule', label: 'Estate planning · Brenton C. McWilliams' },
    { id: 'QE_fv6B0n8I', title: 'Can Someone You Disinherited Fight Back?', label: 'Wills & probate · Brenton C. McWilliams' },
    { id: 'P9FE53dt3ow', title: 'The Tax Deadline Myth That Could Cost Founders Thousands', label: 'Tax advisory · R&D Tax Advisors' },
  ];

  const steps = [
    { icon: <Search size={24} />, title: 'We map the questions', desc: 'We research what your future clients type into YouTube and Google before they hire a lawyer, and turn it into a 90-day topic plan.' },
    { icon: <Mic size={24} />, title: 'You record, about 2–3 hours a week', desc: 'Use our scripts or just send talking points. Record on your phone or webcam. We guide you on camera from the first session.' },
    { icon: <Rocket size={24} />, title: 'We handle everything else', desc: 'Editing, motion graphics, captions, thumbnails, titles, YouTube SEO and publishing, every week, in a consistent professional style.' },
  ];

  const faqs = [
    { q: 'Is YouTube right for a law firm?', a: 'Yes, if your clients research before they call. People search YouTube for questions about wills, trusts, probate, guardianship and tax every day. A video that answers that question well builds trust before the first consultation.' },
    { q: 'Do I need to be good on camera?', a: 'No. Plenty of attorneys feel awkward on camera at first. We write the scripts, coach delivery, and edit so you look clear and confident.' },
    { q: 'How much of my time does it take?', a: 'About 2–3 hours a week of recording, or less if you batch it. We handle topics, scripts, editing, thumbnails, SEO and publishing.' },
    { q: 'Is this compliant with attorney advertising rules?', a: 'The content is educational, not legal advice, and we add a clear “not legal advice” disclaimer. You approve every script and every video before it goes live.' },
    { q: 'How soon will we see results?', a: 'Videos start ranking within the first few months, and enquiries usually follow in months 4 to 6 as the library grows. YouTube compounds: each video keeps working long after it is published.' },
    { q: 'What does it cost?', a: 'Plans start from $1,200 a month for editing and strategy, and from $3,500 a month for the full done-for-you channel. We will recommend the right fit after the free audit.' },
  ];

  return (
    <div className="min-h-screen font-sans bg-black text-white overflow-x-hidden">
      <SuccessOverlay isVisible={success} onClose={() => setSuccess(false)} />

      {/* NAV */}
      <nav className="fixed w-full z-40 bg-black/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <CFLogo className="h-8 w-auto text-white" />
            <span className="text-lg font-bold tracking-tight">CREATIVE<span className="text-blue-500">FLIC</span></span>
          </a>
          <button onClick={toForm} className="btn-sheen px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all">
            Get Free Audit
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[140px] bg-blue-600/15 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <div className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] mb-6 ${kicker}`}>
            <Scale size={14} /> For law firms & tax advisors
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
            Your clients search YouTube<br className="hidden md:block" /> before they call a lawyer.
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${muted}`}>
            We turn your expertise into a library of explainer videos that answers their questions, builds trust and brings in consultations. You record. <span className="text-white font-semibold">We do everything else.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button onClick={toForm} className="btn-sheen px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25">
              Get a Free Channel Audit <ArrowRight size={17} />
            </button>
            {BOOKING_URL && (
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('book_call_click', { page: 'law_firms' })} className="px-8 py-4 rounded-full border border-white/15 hover:border-white/40 text-neutral-200 font-semibold inline-flex items-center justify-center gap-2">
                <Calendar size={17} /> Book a 20-minute call
              </a>
            )}
          </div>
          <div className="grid grid-cols-3 max-w-xl mx-auto mt-12 pt-8 border-t border-white/10">
            {[['500+', 'Legal & tax videos produced'], ['2–3 hrs', 'Your time per week'], ['4.9★', 'From 82 client reviews']].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl md:text-3xl font-bold">{v}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] mt-1.5 text-neutral-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="py-20 bg-neutral-950 border-y border-neutral-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal variant="fade-up">
            <div className="text-center mb-12">
              <div className={`text-xs font-semibold uppercase tracking-[0.3em] mb-4 ${kicker}`}>The work</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explainers clients actually watch</h2>
              <p className={`max-w-2xl mx-auto ${muted}`}>
                Over 500 videos for firms like <span className="text-white font-semibold">Brenton C. McWilliams Law</span> (estate planning, wills, trusts and probate in Alabama) and <span className="text-white font-semibold">R&D Tax Advisors</span>.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 100} variant="fade-up">
                <VideoTile videoId={v.id} title={v.title} label={v.label} isDark={isDark} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal variant="fade-up">
            <div className="text-center mb-12">
              <div className={`text-xs font-semibold uppercase tracking-[0.3em] mb-4 ${kicker}`}>How it works</div>
              <h2 className="text-3xl md:text-4xl font-bold">Three steps. Most of them ours.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 120} variant="fade-up" className="h-full">
                <div className="p-7 rounded-3xl border border-neutral-800 bg-neutral-900 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-900/20 text-blue-400">{s.icon}</div>
                    <span className="text-4xl font-black text-neutral-800">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className={`text-sm leading-relaxed ${muted}`}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} variant="fade-up">
            <ul className="mt-10 grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {['Topics built around real client searches', 'You approve every script and video', 'Captions, chapters and a legal disclaimer on every video', 'A weekly update so you always know what shipped'].map((t) => (
                <li key={t} className={`flex items-start gap-2 text-sm ${muted}`}><CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" /> {t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* MEET */}
      <section className="py-20 bg-neutral-950 border-y border-neutral-900">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className={`text-xs font-semibold uppercase tracking-[0.3em] mb-4 ${kicker}`}>Who you’ll work with</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Meet Ammaz</h2>
          <FounderVideo videoId="lFLgvsUs8Eo" caption="Meet Ammaz · How CreativeFlic works · 2:47" isDark={isDark} />
          <div className="mt-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
            <span className="flex items-center gap-1">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />)} <b className="text-white ml-1">4.9</b> from 82 reviews</span>
            <span><b className="text-white">97%</b> job success</span>
            <span><b className="text-white">Top Rated Plus</b> on Upwork</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-10">
            <div className={`text-xs font-semibold uppercase tracking-[0.3em] mb-4 ${kicker}`}>Questions attorneys ask</div>
            <h2 className="text-3xl md:text-4xl font-bold">Straight answers</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className={`rounded-2xl border ${open ? 'border-blue-500/50 bg-neutral-900' : 'border-neutral-800 bg-neutral-900/40'}`}>
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                    <span className="font-bold">{f.q}</span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform ${open ? 'rotate-180 text-blue-500' : muted}`} />
                  </button>
                  {open && <p className={`px-5 pb-5 -mt-1 text-sm leading-relaxed ${muted}`}>{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AUDIT FORM */}
      <section id="audit" className="py-24 bg-gradient-to-b from-neutral-900 to-black">
        <div className="container mx-auto px-6">
          <ContactForm brandBlue="bg-blue-600" onSuccess={() => { track('generate_lead', { form: 'free_audit', page: 'law_firms' }); setSuccess(true); }} isDark={isDark} />
          {BOOKING_URL && (
            <p className="text-center mt-8 text-sm text-neutral-400">
              Prefer to talk? <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('book_call_click', { page: 'law_firms' })} className="text-blue-400 font-semibold hover:underline">Book a 20-minute call</a>
            </p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-neutral-900 text-sm text-neutral-500">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <a href="/" className="flex items-center gap-2.5 text-white font-bold"><CFLogo className="h-6 w-auto text-white" /> CREATIVEFLIC</a>
          <div className="flex gap-4 items-center">
            <span>© 2026 CreativeFlic</span>
            <span>•</span>
            <a href="/privacy.html" className="hover:text-white hover:underline underline-offset-4">Privacy Policy</a>
          </div>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/company/creativeflic/" target="_blank" rel="noopener noreferrer" aria-label="CreativeFlic on LinkedIn" className="hover:text-blue-500"><Linkedin size={20} /></a>
            <a href="https://www.instagram.com/creativeflic/" target="_blank" rel="noopener noreferrer" aria-label="CreativeFlic on Instagram" className="hover:text-blue-500"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/@Creativeflic-q3s" target="_blank" rel="noopener noreferrer" aria-label="CreativeFlic on YouTube" className="hover:text-blue-500"><Youtube size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LawFirmsPage;
