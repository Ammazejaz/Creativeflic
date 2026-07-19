import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Instagram,
  Linkedin,
  Twitter,
  TrendingUp,
  ArrowUp,
  ArrowRight,
  Sun,
  Moon,
  Search,
  PenTool,
  Clapperboard,
  Send,
  BarChart3,
  HeartPulse,
  ShoppingCart,
  Building2,
  Coins,
  Cloud,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Key,
  LineChart,
  PlayCircle,
  Rocket
} from 'lucide-react';
import Preloader from './components/Preloader';
import SectionParticles from './components/Particles';
import CFLogo from './components/CFLogo';
import InfiniteTicker from './components/InfiniteTicker';
import SuccessOverlay from './components/SuccessOverlay';
import Reveal from './components/Reveal';
import ProjectCard from './components/ProjectCard';
import WordReveal from './components/WordReveal';
import WorkDemo from './components/WorkDemo';
import CountUp from './components/CountUp';
import Parallax from './components/Parallax';
import ContactForm from './components/ContactForm';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  // Theme State
  const [isDark, setIsDark] = useState(true);

  const brandBlue = "bg-blue-600";
  const accentText = isDark ? "text-blue-400" : "text-blue-600";
  const accentHover = isDark ? "hover:text-blue-400" : "hover:text-blue-600";
  const kicker = isDark ? "text-yellow-400" : "text-yellow-600";

  const theme = {
    bg: isDark ? 'bg-black' : 'bg-neutral-100',
    text: isDark ? 'text-white' : 'text-neutral-900',
    textMuted: isDark ? 'text-neutral-400' : 'text-neutral-700',
    navBg: isDark ? 'bg-black/90' : 'bg-white/90',
    navBorder: isDark ? 'border-white/5' : 'border-black/10',
    sectionBg: isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200',
    spotlightCard: isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-300 shadow-xl',
    iconBg: isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700',
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  useEffect(() => {
    const failSafeTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(failSafeTimer);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const handleScrollToCloseMenu = () => setMobileMenuOpen(false);
      const timeoutId = setTimeout(() => {
        window.addEventListener('scroll', handleScrollToCloseMenu);
      }, 100);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scroll', handleScrollToCloseMenu);
      };
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll progress + active section
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const el = progressRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const ids = ['home', 'work', 'engine', 'pricing', 'fit', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection((e.target as HTMLElement).id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [loading]);

  const handleSuccess = () => {
    setShowSuccessOverlay(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / e.currentTarget.clientWidth) * 100;
    const y = ((e.clientY - rect.top) / e.currentTarget.clientHeight) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  const navItems: { label: string; id: string }[] = [
    { label: 'Results', id: 'work' },
    { label: 'The System', id: 'engine' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Who It’s For', id: 'fit' },
  ];

  const caseStudies = [
    {
      featured: true,
      mark: "HDC",
      category: "Hearing Tech · Ecommerce",
      title: "HDC: A Full YouTube Engine for a Hearing Tech Brand",
      role: "Strategy · Scripts · Production · Publishing · Attribution",
      quote: { text: "Results better than expected.", by: "Client feedback · first engagement" },
      results: ["Education-first channel for a considered health purchase", "One pipeline feeding organic content and ad creative", "Weekly reporting on leading indicators and coded sales"],
      link: "https://heardirectclub.com/products/nova",
      tags: ["Ecommerce", "Health Tech", "Attribution"],
      metric: { value: "360°", label: "Revenue engine" }
    },
    {
      mark: "SCIATIEASE",
      category: "Health & Recovery · Ecommerce",
      title: "A $5.5M Health Brand Built on Conversion Video",
      role: "VSL + Ad Creative Engine",
      results: ["Scaled to $5.5M in annual revenue", "5x improvement in ad ROI", "Conversion-focused VSLs feeding paid and organic"],
      link: "https://www.amazon.com/SciatiEase-Sciatic-Nerve-Health-Support/dp/B0B5723XX5",
      tags: ["Ecommerce", "VSL", "Ads"],
      metric: { value: "5x", label: "Ad ROI · $5.5M per year" }
    },
    {
      mark: "ZENTI",
      category: "Fintech",
      title: "Zenti: Making Payments Content Worth Watching",
      role: "Content Engine + Short-Form System",
      results: ["Complex payments product translated for camera", "Short-form distribution system across platforms", "Fully remote production pipeline"],
      link: "https://zenti.com/",
      tags: ["Fintech", "B2B", "Shorts"],
      metric: { value: "B2B", label: "Fintech made watchable" }
    },
    {
      featured: true,
      mark: "SALESFORGE",
      category: "B2B SaaS",
      title: "Salesforge: Complex AI Turned Into Inbound Pipeline",
      role: "Faceless Content Engine",
      results: ["Strengthened inbound authority for an AI product", "Scalable faceless production pipeline", "Complex features made simple and watchable"],
      link: "https://www.salesforge.ai/",
      tags: ["SaaS", "Faceless", "Education"],
      metric: { value: "24/7", label: "Always-on content pipeline" }
    }
  ];

  const engineSteps = [
    {
      icon: <Search size={26} />,
      title: 'Strategy',
      desc: 'Audience research, a keyword demand map of what your buyers actually search, and channel architecture built around it.'
    },
    {
      icon: <PenTool size={26} />,
      title: 'Scripts',
      desc: 'Education-first scripts engineered for retention and purchase intent, written for your product, not generic content.'
    },
    {
      icon: <Clapperboard size={26} />,
      title: 'Production',
      desc: 'Editing, motion graphics, voiceover and high-CTR thumbnails. Remote-first: product b-roll, UGC and narration. No film crew needed.'
    },
    {
      icon: <Send size={26} />,
      title: 'Publishing',
      desc: 'Titles, YouTube SEO, upload cadence and full channel management. Your channel ships every week without you touching it.'
    },
    {
      icon: <BarChart3 size={26} />,
      title: 'Attribution',
      desc: 'UTM links, promo codes, GA4 assisted conversions and post-purchase surveys, so you see coded revenue, not vanity views.'
    }
  ];

  const milestones = [
    {
      phase: 'Months 1–2',
      title: 'Foundation + Immediate Assets',
      points: ['Channel architecture & 90-day calendar', 'First 8 videos live', 'Repurposed clips for your ads & socials from week one']
    },
    {
      phase: 'Month 3',
      title: 'Format Winners Identified',
      points: ['CTR & retention benchmarks beaten', 'Winning formats doubled down', 'Leading indicators trending on your dashboard']
    },
    {
      phase: 'Months 4–6',
      title: 'First Coded Revenue',
      points: ['Promo-code & UTM-tracked sales landing', 'Winning videos become ad creative', 'Performance-aligned pricing kicks in']
    },
    {
      phase: 'Months 6–12',
      title: 'Compounding',
      points: ['Library ranks & sells while you sleep', 'Organic CAC falls as paid CAC rises', 'Your channel becomes a durable moat']
    }
  ];

  const fitYes = [
    'Product brand doing $1M–$20M in annual revenue',
    'AOV over $60 or customer LTV over $150',
    'Education-heavy purchase where customers research before buying',
    'Founder or CMO who already believes in content. We screen, we never evangelize',
    'Able to commit 6 months of fees without pain'
  ];

  const fitNo = [
    'Expecting sales in the first 30 days',
    'Low-AOV impulse products with nothing to explain',
    'A faceless-channel side project with no real business behind it',
    'No one internally who can approve content within 48 hours',
    'Looking for the cheapest editor, not a customer-acquisition engine'
  ];

  if (loading) {
    return (
      <div className={`min-h-screen font-sans ${theme.bg}`}>
        <Preloader onComplete={() => setLoading(false)} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden transition-colors duration-500 ${theme.bg} ${theme.text}`}>

      <SuccessOverlay
        isVisible={showSuccessOverlay}
        onClose={() => setShowSuccessOverlay(false)}
      />

      {/* Scroll progress */}
      <div ref={progressRef} className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-blue-400 to-yellow-400"></div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 w-screen h-screen ${theme.bg} z-[99] flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Close menu"
        >
          <X size={32} className={theme.text} />
        </button>

        {navItems.map((item) => (
          <button key={item.id} onClick={() => scrollToSection(item.id)} className={`text-4xl font-black uppercase transition-colors ${accentHover} ${theme.text}`}>
            {item.label}
          </button>
        ))}
        <button onClick={() => scrollToSection('contact')} className={`mt-4 px-8 py-4 ${brandBlue} text-white font-bold tracking-widest rounded-full`}>
          Get Free Audit
        </button>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? `${theme.navBg} backdrop-blur-xl border-b ${theme.navBorder} py-4` : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <CFLogo className={`h-9 w-auto transition-all duration-500 group-hover:scale-110 ${isDark ? 'text-white' : 'text-blue-600'}`} />
            <span className={`text-xl font-bold tracking-tight group-hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-black'}`}>CREATIVE<span className="text-blue-500">FLIC</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className={`${accentHover} transition-colors relative group ${activeSection === item.id ? accentText : theme.text}`}>
                <span className="relative z-10">{item.label}</span>
                <span className={`absolute -bottom-1 left-0 h-px bg-blue-500 transition-all duration-500 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-black/5 text-neutral-600 hover:bg-black/10'}`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`btn-sheen px-6 py-3 ${brandBlue} text-white hover:bg-blue-500 transition-all duration-300 font-bold tracking-wide hover:-translate-y-0.5 hover:shadow-lg shadow-blue-600/25 rounded-full glow-blue`}
            >
              Get Free Audit
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden z-50">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${isDark ? 'text-yellow-400' : 'text-neutral-600'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className={theme.text} /> : <Menu className={theme.text} />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-36 pb-24 overflow-hidden">
        {/* Ambient glow, drifts on scroll */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Parallax speed={0.22} className="absolute top-[-25%] left-1/2 -translate-x-1/2">
            <div className={`w-[900px] h-[900px] rounded-full blur-[140px] ${isDark ? 'bg-blue-600/15' : 'bg-blue-500/10'}`}></div>
          </Parallax>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <Reveal variant="fade-up">
              <div className={`text-[11px] font-bold uppercase tracking-[0.35em] mb-8 ${kicker}`}>
                Lose The Paid-Ad Addiction
              </div>
            </Reveal>

            <WordReveal
              as="h1"
              text="We Build Content Engines That Print Revenue."
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.05]"
              delay={150}
              stagger={90}
              accentWords={2}
              accentClass="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 text-shimmer"
            />

            <Reveal delay={200} variant="fade-up">
              <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${theme.textMuted}`}>
                The entire YouTube engine, done for you. <span className={`font-semibold ${theme.text}`}>Freelancer price. Growth-agency standard.</span>
              </p>
            </Reveal>

            <Reveal delay={250} variant="fade-up">
              <div className="mb-11">
                <div className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>For Product Brands $1M–$20M</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { icon: <ShoppingCart size={13} />, label: 'Ecommerce' },
                    { icon: <HeartPulse size={13} />, label: 'Healthcare' },
                    { icon: <Coins size={13} />, label: 'Finance' },
                    { icon: <Cloud size={13} />, label: 'B2B SaaS' },
                    { icon: <Building2 size={13} />, label: 'Real Estate' },
                  ].map((n, i) => (
                    <span key={i} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-default ${isDark ? 'border-white/10 bg-white/[0.03] text-neutral-300 hover:border-blue-500/60 hover:text-blue-300' : 'border-black/10 bg-black/[0.02] text-neutral-700 hover:border-blue-500 hover:text-blue-700'}`}>
                      <span className={accentText}>{n.icon}</span> {n.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={300} variant="fade-up">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button onClick={() => scrollToSection('contact')} className={`btn-sheen px-9 py-4 ${brandBlue} text-white font-bold rounded-full hover:bg-blue-500 transition-all duration-300 flex items-center gap-2.5 tracking-wide group shadow-lg shadow-blue-600/25 active:scale-95 glow-blue`}>
                  Get Your Free Revenue Audit
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => scrollToSection('work')} className={`px-9 py-4 rounded-full border transition-all duration-300 font-semibold tracking-wide active:scale-95 ${isDark ? 'border-white/15 hover:border-white/40 text-neutral-300 hover:text-white' : 'border-black/15 hover:border-black/40 text-neutral-700 hover:text-black'}`}>
                  See The Results
                </button>
              </div>
              <p className={`mt-5 text-xs ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
                Free 10-min teardown · No call · No obligation
              </p>
            </Reveal>

            <Reveal delay={400} variant="fade-in">
              <div className={`mt-16 pt-10 border-t grid grid-cols-3 max-w-2xl mx-auto ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                {[
                  { end: 5.5, decimals: 1, prefix: '$', suffix: 'M', label: 'Client revenue scaled' },
                  { end: 50, decimals: 0, prefix: '', suffix: 'M+', label: 'Organic views generated' },
                  { end: 100, decimals: 0, prefix: '', suffix: 'K+', label: 'Subscribers built' },
                ].map((s, i) => (
                  <div key={i} className={`px-4 ${i > 0 ? (isDark ? 'border-l border-white/10' : 'border-l border-black/10') : ''}`}>
                    <div className={`w-5 h-0.5 mx-auto mb-3 ${isDark ? 'bg-yellow-400/80' : 'bg-yellow-500'}`}></div>
                    <div className={`text-2xl md:text-3xl font-bold tracking-tight ${theme.text}`}>
                      <CountUp end={s.end} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <div className={`text-[10px] md:text-[11px] uppercase tracking-[0.15em] mt-1.5 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* TICKER */}
      <InfiniteTicker isDark={isDark} />

      {/* WORK / PROOF SECTION */}
      <section id="work" className={`py-28 relative overflow-hidden ${theme.sectionBg}`}>
        <Parallax speed={0.15} className="absolute -top-32 -right-40 pointer-events-none">
          <div className="w-[520px] h-[520px] rounded-full blur-[140px] bg-blue-600/10"></div>
        </Parallax>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal variant="creative-up">
            <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
              <div>
                <div className={`flex items-center justify-start gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>01 · Proof, Not Promises</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
                <WordReveal as="h3" text="Real Systems. Real ROI." className="text-4xl md:text-5xl font-bold mb-3" stagger={50} />
                <p className={`${theme.textMuted} max-w-xl`}>
                  Every client runs the same machine, strategy to attribution, and every engagement is judged on ROI.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((project, index) => (
              <Reveal key={index} delay={index * 120} variant="fade-up" className={project.featured ? 'md:col-span-2' : ''}>
                <ProjectCard {...project} isDark={isDark} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINE SECTION */}
      <section id="engine" className={`py-24 relative overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>02 · The Revenue System</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="Not an Editing Agency. A Revenue System." className="text-4xl md:text-5xl font-bold mb-6" stagger={50} />
              <p className={theme.textMuted}>
                Editing is a commodity. Production without strategy is a churn machine. We sell neither. We install the full acquisition loop and own every step, so nothing falls between vendors.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {engineSteps.map((step, i) => (
              <Reveal key={i} delay={i * 100} className="h-full" variant="scale-up">
                <div
                  className={`p-6 rounded-3xl h-full transition-all duration-300 hover:-translate-y-2 group spotlight-card ${theme.spotlightCard}`}
                  onMouseMove={handleSpotlightMove}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white ${theme.iconBg}`}>
                    {step.icon}
                  </div>
                  <div className={`text-xs font-black mb-2 ${kicker}`}>0{i + 1}</div>
                  <h4 className={`text-lg font-bold mb-3 relative z-10 ${theme.text}`}>{step.title}</h4>
                  <p className={`text-sm relative z-10 leading-relaxed ${theme.textMuted}`}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} variant="fade-up">
            <div className={`mt-12 max-w-3xl mx-auto text-center p-6 rounded-3xl border ${isDark ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-neutral-50'}`}>
              <p className={`text-sm ${theme.textMuted}`}>
                <span className={`font-bold ${theme.text}`}>We run our own channels too.</span> Our internal media operation is our R&D lab. Every format we sell has been tested on our own dashboard first.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WORK DEMO: the system in motion */}
      <section className={`py-24 overflow-hidden ${isDark ? 'bg-black' : 'bg-neutral-50'}`}>
        <div className="container mx-auto px-6 mb-12">
          <Reveal variant="fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>03 · Inside The Engine Room</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="Watch The System Work" className="text-4xl md:text-5xl font-bold mb-6" stagger={60} />
              <p className={theme.textMuted}>
                Every week, for every client: research becomes scripts, scripts become videos, videos become dashboards. This is the machine mid-flight.
              </p>
            </div>
          </Reveal>
        </div>
        <WorkDemo isDark={isDark} />
      </section>

      {/* MILESTONE CURVE */}
      <section id="curve" className={`py-24 ${theme.sectionBg}`}>
        <div className="container mx-auto px-6">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>04 · No Surprises</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="Exactly What Happens, Month by Month" className="text-4xl md:text-5xl font-bold mb-6" stagger={50} />
              <p className={theme.textMuted}>
                Your paid CAC rises every quarter. YouTube does the opposite: it compounds, it does not spike. Anyone promising sales in week two is lying to you. Here’s the real curve, the same one we put in every proposal.
              </p>
            </div>
          </Reveal>

          <div className="relative max-w-6xl mx-auto">
            {/* Connecting line (desktop) */}
            <div className={`hidden lg:block absolute top-8 left-[12%] right-[12%] h-0.5 ${isDark ? 'bg-gradient-to-r from-neutral-800 via-blue-700 to-yellow-400/80' : 'bg-gradient-to-r from-neutral-300 via-blue-500 to-yellow-500'}`}>
              <div className="curve-dot absolute -top-[3px] w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.9)]"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m, i) => (
                <Reveal key={i} delay={i * 120} variant="fade-up" className="h-full">
                  <div className={`relative p-6 rounded-3xl border h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isDark ? 'bg-neutral-900 border-neutral-800 hover:border-blue-500' : 'bg-white border-neutral-300 hover:border-blue-500'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 font-black text-lg relative z-10 ${i === 3 ? 'bg-yellow-400 text-black shadow-[0_0_25px_rgba(250,204,21,0.45)]' : isDark ? 'bg-blue-950 text-blue-400 border border-blue-900' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                      {i === 3 ? <Rocket size={24} /> : i + 1}
                    </div>
                    <div className={`text-xs font-black uppercase tracking-widest mb-2 ${kicker}`}>{m.phase}</div>
                    <h4 className={`text-lg font-bold mb-4 ${theme.text}`}>{m.title}</h4>
                    <ul className="space-y-2">
                      {m.points.map((p, j) => (
                        <li key={j} className={`flex items-start gap-2 text-xs leading-relaxed ${theme.textMuted}`}>
                          <TrendingUp size={12} className="text-green-500 mt-0.5 shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={300} variant="fade-up">
            <div className="mt-12 text-center">
              <p className={`text-sm max-w-2xl mx-auto ${theme.textMuted}`}>
                You get a <span className={`font-bold ${theme.text}`}>weekly Loom update and a live dashboard</span> of leading indicators from day one: impressions velocity, CTR, retention, branded-search lift. From month 3: assisted conversions and coded revenue.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className={`py-28 relative overflow-hidden ${isDark ? 'bg-black' : 'bg-neutral-50'}`}>
        <Parallax speed={0.15} className="absolute top-1/4 -left-48 pointer-events-none">
          <div className="w-[520px] h-[520px] rounded-full blur-[140px] bg-blue-600/10"></div>
        </Parallax>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>05 · Transparent Pricing</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="The Price of a Freelancer. The Standard of a Growth Agency." className="text-4xl md:text-5xl font-bold mb-6" stagger={45} />
              <p className={theme.textMuted}>
                Full-stack agencies charge $10–30k/month for this scope. Freelancers can’t deliver it. We built our engine to close that gap. And beware anyone offering full service for under $1,500: that is the industry’s own red flag.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {/* Strategy Sprint */}
            <Reveal delay={0} variant="scale-up" className="h-full">
              <div className={`p-8 rounded-3xl border h-full flex flex-col transition-all duration-300 hover:-translate-y-2 spotlight-card ${theme.spotlightCard}`} onMouseMove={handleSpotlightMove}>
                <div className={`text-xs font-black uppercase tracking-widest mb-2 ${accentText}`}>Step 1 · One-Time</div>
                <h4 className={`text-2xl font-black mb-1 ${theme.text}`}>Strategy Sprint</h4>
                <div className={`text-3xl font-black mb-6 ${theme.text}`}>$1,500<span className={`text-base font-bold ${theme.textMuted}`}>–$2,500</span></div>
                <p className={`text-sm mb-6 ${theme.textMuted}`}>30 days. Everything needed before a single video ships.</p>
                <ul className={`space-y-3 text-sm flex-grow ${theme.textMuted}`}>
                  {['Audience research & keyword demand map', 'Channel architecture', '90-day content calendar', 'Attribution stack install (UTM + promo codes + GA4 + surveys)'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Core Retainer - featured */}
            <Reveal delay={100} variant="scale-up" className="h-full">
              <div className={`p-8 rounded-3xl h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 spotlight-card border-2 ${isDark ? 'border-blue-500/60 bg-neutral-900/60 shadow-[0_0_40px_rgba(37,99,235,0.12)]' : 'border-blue-600 bg-white shadow-2xl'}`} onMouseMove={handleSpotlightMove}>
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">Most Popular</div>
                <div className={`text-xs font-black uppercase tracking-widest mb-2 ${accentText}`}>Step 2 · Monthly</div>
                <h4 className={`text-2xl font-black mb-1 ${theme.text}`}>Revenue Engine</h4>
                <div className={`text-3xl font-black mb-6 ${theme.text}`}>$3,500<span className={`text-base font-bold ${theme.textMuted}`}>–$4,500/mo</span></div>
                <p className={`text-sm mb-6 ${theme.textMuted}`}>The full engine, running every month.</p>
                <ul className={`space-y-3 text-sm flex-grow ${theme.textMuted}`}>
                  {['4 long-form videos + 8 shorts monthly', 'Thumbnails, titles & YouTube SEO', 'Publishing & full channel management', 'Live leading-indicator dashboard', 'Monthly strategy call'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Growth Tier */}
            <Reveal delay={200} variant="scale-up" className="h-full">
              <div className={`p-8 rounded-3xl border h-full flex flex-col transition-all duration-300 hover:-translate-y-2 spotlight-card ${theme.spotlightCard}`} onMouseMove={handleSpotlightMove}>
                <div className={`text-xs font-black uppercase tracking-widest mb-2 ${accentText}`}>Scale · Monthly</div>
                <h4 className={`text-2xl font-black mb-1 ${theme.text}`}>Growth Engine</h4>
                <div className={`text-3xl font-black mb-6 ${theme.text}`}>$5,500<span className={`text-base font-bold ${theme.textMuted}`}>–$6,500/mo</span></div>
                <p className={`text-sm mb-6 ${theme.textMuted}`}>Everything in Revenue Engine, plus:</p>
                <ul className={`space-y-3 text-sm flex-grow ${theme.textMuted}`}>
                  {['Repurposing pack: LinkedIn, IG and TikTok cuts', 'Ad-creative versions of winning videos', 'Light YouTube Ads amplification', 'Priority production queue'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} variant="fade-up">
            <div className={`mt-10 max-w-4xl mx-auto p-6 rounded-3xl border text-center ${isDark ? 'border-blue-900/50 bg-blue-950/20' : 'border-blue-200 bg-blue-50'}`}>
              <p className={`text-sm ${theme.textMuted}`}>
                <span className={`font-bold ${theme.text}`}>Skin in the game:</span> from month 4, a small performance fee applies only to <span className={`font-bold ${theme.text}`}>tracked, coded YouTube revenue</span>: capped, audited, and only when it works. We win when you win.
              </p>
            </div>
          </Reveal>

          <Reveal delay={350} variant="fade-in">
            <p className={`mt-8 text-center text-xs ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
              Not ready for the full engine? Ask about <span className="font-bold">Editing + Strategy Lite</span> from $1,200/mo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TRUST / GUARANTEES */}
      <section className={`py-24 ${theme.sectionBg}`}>
        <div className="container mx-auto px-6">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>06 · Zero Fine Print</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="Built to Be the Safest Bet You Make" className="text-4xl md:text-5xl font-bold mb-6" stagger={50} />
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Key size={26} />,
                title: 'You Own Everything',
                desc: 'The channel, the content, the data: 100% yours, outright, from day one. Many agencies bury ownership in fine print. We make it the headline.'
              },
              {
                icon: <ShieldCheck size={26} />,
                title: 'Milestone Guarantee',
                desc: 'If agreed leading indicators aren’t hit by day 90, month 4 is 50% off. We never guarantee vanity subs. We guarantee the process that produces revenue.'
              },
              {
                icon: <LineChart size={26} />,
                title: 'Radical Reporting',
                desc: 'Weekly async Loom + a live dashboard. You will never wonder what you are paying for. You watch the leading indicators move.'
              },
              {
                icon: <PlayCircle size={26} />,
                title: 'Delivery SLA',
                desc: 'Volume and deadlines are contractual. Miss them and you can walk at day 90. That is our risk, not yours.'
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} variant="fade-up" className="h-full">
                <div className={`p-7 rounded-3xl border h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isDark ? 'bg-neutral-900 border-neutral-800 hover:border-blue-500/50' : 'bg-white border-neutral-300 hover:border-blue-600'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${isDark ? 'bg-blue-600/10 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    {item.icon}
                  </div>
                  <h4 className={`text-lg font-bold mb-3 ${theme.text}`}>{item.title}</h4>
                  <p className={`text-sm leading-relaxed ${theme.textMuted}`}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FIT / QUALIFICATION */}
      <section id="fit" className={`py-24 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>07 · We Are Selective</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="This Only Works for the Right Brand" className="text-4xl md:text-5xl font-bold mb-6" stagger={50} />
              <p className={theme.textMuted}>
                We take on a limited number of engine clients so every channel gets a senior team. Here’s the honest filter.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Reveal delay={0} variant="slide-right" className="h-full">
              <div className={`p-8 rounded-3xl border-2 h-full ${isDark ? 'border-green-800/50 bg-green-950/10' : 'border-green-300 bg-green-50'}`}>
                <h4 className={`text-xl font-black mb-6 flex items-center gap-3 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                  <CheckCircle2 size={24} /> A Great Fit If
                </h4>
                <ul className="space-y-4">
                  {fitYes.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${theme.textMuted}`}>
                      <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${isDark ? 'text-green-500' : 'text-green-600'}`} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100} variant="slide-right" className="h-full">
              <div className={`p-8 rounded-3xl border-2 h-full ${isDark ? 'border-red-900/40 bg-red-950/10' : 'border-red-200 bg-red-50'}`}>
                <h4 className={`text-xl font-black mb-6 flex items-center gap-3 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  <XCircle size={24} /> Not for You If
                </h4>
                <ul className="space-y-4">
                  {fitNo.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${theme.textMuted}`}>
                      <XCircle size={16} className={`mt-0.5 shrink-0 ${isDark ? 'text-red-500' : 'text-red-500'}`} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BIG AUDIT CTA */}
      <section id="big-idea" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-blue-600 py-32 glow-blue">
        <SectionParticles isDark={isDark} forceColor="rgba(255,255,255,0.6)" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal delay={0} variant="creative-up">
            <h2 className="text-lg md:text-2xl font-bold uppercase tracking-wider text-white/90 mb-6">
              Free · 10 Minutes · No Call Required
            </h2>
          </Reveal>
          <WordReveal
            as="h3"
            text="Your Free YouTube Revenue Audit"
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-8 max-w-4xl mx-auto"
            delay={100}
            stagger={80}
          />
          <Reveal delay={250} variant="fade-up">
            <div className="max-w-2xl mx-auto mb-10">
              <ul className="text-white/90 text-sm md:text-base space-y-3 text-left inline-block">
                {[
                  'What your competitors’ channels are earning them right now',
                  'The 20 keywords your buyers actually search on YouTube',
                  'The first 5 videos your brand should make',
                  'Your projected 12-month revenue curve'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-white mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={350} variant="scale-up">
            <button onClick={() => scrollToSection('contact')} className="btn-sheen inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-700 bg-white px-10 py-5 rounded-full shadow-xl hover:scale-105 active:scale-95 hover:bg-blue-50 transition-all glow-white">
              Claim My Free Audit <ArrowRight size={18} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={`py-32 relative overflow-hidden bg-gradient-to-b ${isDark ? 'from-neutral-900 to-black' : 'from-neutral-100 to-white'}`}>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal variant="fade-up">
            <ContactForm brandBlue={brandBlue} onSuccess={handleSuccess} isDark={isDark} />
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 border-t text-sm pb-32 md:pb-12 ${isDark ? 'bg-black border-neutral-900 text-neutral-500' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <CFLogo className={`h-6 w-auto ${isDark ? 'text-white' : 'text-blue-600'}`} />
              <span className={`font-bold tracking-tight ${theme.text}`}>CREATIVEFLIC</span>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center text-center">
              <span>© 2026 CreativeFlic</span>
              <span className="hidden md:inline">•</span>
              <span>YouTube Channels That Sell Your Product</span>
            </div>

            <div className="flex gap-6">
              <a href="#" className={`transition-colors hover:scale-110 duration-200 ${isDark ? 'text-neutral-400 hover:text-blue-500' : 'text-neutral-500 hover:text-blue-600'}`} aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className={`transition-colors hover:scale-110 duration-200 ${isDark ? 'text-neutral-400 hover:text-blue-500' : 'text-neutral-500 hover:text-blue-600'}`} aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" className={`transition-colors hover:scale-110 duration-200 ${isDark ? 'text-neutral-400 hover:text-blue-500' : 'text-neutral-500 hover:text-blue-600'}`} aria-label="Twitter"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white z-40 hover:scale-110 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.5)] group"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
};

export default App;
