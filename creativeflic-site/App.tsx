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
  Rocket,
  Scale,
  Star,
  ChevronDown,
  Phone,
  Mic
} from 'lucide-react';
import Preloader from './components/Preloader';
import SectionParticles from './components/Particles';
import CFLogo from './components/CFLogo';
import InfiniteTicker from './components/InfiniteTicker';
import SuccessOverlay from './components/SuccessOverlay';
import Reveal from './components/Reveal';
import ProjectCard from './components/ProjectCard';
import CaseStudyModal from './components/CaseStudyModal';
import WordReveal from './components/WordReveal';
import WorkDemo from './components/WorkDemo';
import CountUp from './components/CountUp';
import Parallax from './components/Parallax';
import ContactForm from './components/ContactForm';
import FounderVideo from './components/FounderVideo';
import VideoTile from './components/VideoTile';

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
    const ids = ['home', 'work', 'samples', 'testimonials', 'engine', 'how', 'pricing', 'fit', 'faq', 'contact'];
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
    { label: 'FAQ', id: 'faq' },
  ];

  const caseStudies = [
    {
      featured: true,
      mark: "HDC",
      shot: "/proof/hdc-analytics.jpg",
      thumbs: ["rZEyxn1wi-0", "NZhFjot4f60", "sk6ca6IlQ6I", "-_tKbNk7QWs"],
      video: "rZEyxn1wi-0",
      detail: {
        challenge: "Hearing aids are a considered, often emotional purchase. Buyers research for weeks, and HearDirectClub needed to be the trusted voice while they did, not just another ad.",
        built: ["Education-first channel answering the exact questions buyers search", "Long-form explainers plus a Shorts system for reach", "One pipeline feeding organic videos and ad creative", "Weekly reporting on leading indicators"],
        outcome: ["77.9K organic views", "1.9K hours of watch time", "+168 subscribers", "Client feedback: results better than expected"]
      },
      category: "Hearing Tech · Ecommerce",
      title: "HDC: A Full YouTube Engine for a Hearing Tech Brand",
      role: "Strategy · Scripts · Production · Publishing · Attribution",
      quote: { text: "Results better than expected.", by: "Client feedback · first engagement" },
      results: ["Education-first channel for a considered health purchase", "One pipeline feeding organic content and ad creative", "Weekly reporting on leading indicators and coded sales"],
      link: "https://heardirectclub.com/products/nova",
      tags: ["Ecommerce", "Health Tech", "Attribution"],
      metric: { value: "77.9K", label: "Organic views · 1.9K watch hours" }
    },
    {
      mark: "SCIATIEASE",
      thumbs: ["NfyIRolMxOY", "5txKw9_Qv78", "0pRp5mYONGc", "YzShuWB0Ipk"],
      video: "NfyIRolMxOY",
      detail: {
        challenge: "A health product sold on Amazon and DTC needed video that turns cold traffic into buyers, at a cost per sale that keeps paid ads profitable.",
        built: ["Long-form VSLs on a direct-response structure: hook, problem, proof, offer", "Short vertical VSLs and ad cuts from the same pipeline", "Motion graphics, captions, b-roll and sound design for every version"],
        outcome: ["Brand scaled to $5.5M in annual revenue", "5x improvement in ad ROI", "Conversion video feeding both paid and organic"]
      },
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
      shot: "/proof/zenti-analytics.jpg",
      thumbs: ["nWvDvRGxbyk", "iHUEVRLSbUE", "8WPZv7iKMqk", "G_hX2oFnQS4"],
      video: "nWvDvRGxbyk",
      detail: {
        challenge: "Payments software is hard to explain and easy to ignore. Zenti needed content that made a dry, complex product worth watching for business owners and partners.",
        built: ["Profit from Payments, a payments-education channel", "Long-form explainers plus a short-form distribution system across platforms", "A fully remote production pipeline, 11 months running"],
        outcome: ["22K+ organic views on education content", "Top Shorts reaching 1,000 to 1,500 views each", "An 11-month engagement with a 5.0 client rating"]
      },
      category: "Fintech",
      title: "Zenti: Making Payments Content Worth Watching",
      role: "Content Engine + Short-Form System",
      results: ["Complex payments product translated for camera", "Short-form distribution system across platforms", "Fully remote production pipeline"],
      link: "https://zenti.com/",
      tags: ["Fintech", "B2B", "Shorts"],
      metric: { value: "22.4K", label: "Organic views · fintech made watchable" }
    },
    {
      featured: true,
      mark: "SALESFORGE",
      thumbs: ["68tKi1QjSBQ", "OC3OZpGIxew"],
      video: "68tKi1QjSBQ",
      detail: {
        challenge: "Salesforge, a YC-backed AI sales platform, sells a complex product into a crowded market. Features alone don't win attention on YouTube.",
        built: ["Story-led videos for the official channel that teach outbound sales, not just the product", "A scalable faceless production pipeline", "Complex AI features turned into simple, watchable explanations"],
        outcome: ["An always-on content pipeline for the official channel", "Stronger inbound authority in the AI sales category"]
      },
      category: "B2B SaaS",
      title: "Salesforge: Complex AI Turned Into Inbound Pipeline",
      role: "Faceless Content Engine",
      results: ["Strengthened inbound authority for an AI product", "Scalable faceless production pipeline", "Complex features made simple and watchable"],
      link: "https://www.salesforge.ai/",
      tags: ["SaaS", "Faceless", "Education"],
      metric: { value: "24/7", label: "Always-on content pipeline" }
    },
    {
      featured: true,
      mark: "TUNA",
      thumbs: ["ukcyNGGO8uY", "UALcJDQyqOQ", "gVTPybaN1ro"],
      video: "ukcyNGGO8uY",
      detail: {
        challenge: "Build a faceless channel for an automotive brand that earns attention in one of YouTube's most crowded niches, without anyone on camera.",
        built: ["Story-led scripts built for retention", "Cinematic faceless production: archival footage, motion graphics, voiceover pacing", "Titles and thumbnails tested for click-through"],
        outcome: ["56M organic views", "136K+ subscribers", "$333K+ in channel revenue"]
      },
      category: "Automotive · Faceless Channel",
      title: "Tuna No Crust: A Faceless Channel Worth $333K+",
      role: "Faceless Storytelling Engine",
      results: ["56M organic views and 136K+ subscribers", "$333K+ in channel revenue", "Story-led scripts built for retention, packaging tested for CTR"],
      link: null,
      tags: ["Faceless", "Storytelling", "Revenue"],
      metric: { value: "56M", label: "Organic views" }
    },
    {
      mark: "LAW",
      thumbs: ["cOgay6dZ0NM", "QE_fv6B0n8I", "P9FE53dt3ow", "kGFSvckEFH8"],
      video: "cOgay6dZ0NM",
      detail: {
        challenge: "Attorneys and tax advisors know their subject but have no time to make content. Their clients search YouTube with real questions before they call anyone.",
        built: ["Search-led topics on estate planning, probate, guardianship and R&D tax credits", "The attorney records or sends talking points. We handle editing, motion graphics, captions, thumbnails, SEO and publishing", "A consistent house style and a dependable weekly pipeline"],
        outcome: ["500+ explainer videos produced", "A searchable library that answers client questions around the clock"]
      },
      category: "Law & Tax Firms · Professional Services",
      title: "Expert Explainer Channels That Bring In Consultations",
      role: "Brenton C. McWilliams Law · R&D Tax Advisors",
      results: ["Search-led legal and tax topics", "The attorney records, we handle everything else", "A dependable weekly publishing pipeline"],
      link: "https://www.youtube.com/@thelawofficesofbrentonc.mc787",
      tags: ["Legal", "Tax", "Education"],
      metric: { value: "500+", label: "Explainer videos produced" }
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
    'Product brand doing $1M–$20M in annual revenue, or an expert-led firm with high-value clients',
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


  const sampleTabs: { label: string; videos: { id: string; title: string; label: string }[] }[] = [
    { label: 'Featured', videos: [
      { id: 'ukcyNGGO8uY', title: 'Why Car Brands Are Quietly Threatening YouTubers', label: 'Faceless channel · Tuna No Crust · 56M views' },
      { id: '87XQIwoZ6pg', title: 'Money Ball: Levi vs Eric', label: 'Creator · Lively Lewis Show · 6M+ subs' },
      { id: '68tKi1QjSBQ', title: 'This AI Will Replace All Sales Agencies', label: 'B2B SaaS · Salesforge' },
      { id: 'cOgay6dZ0NM', title: 'Alabama’s Hidden 90-Day Trust Rule', label: 'Law firm · Brenton C. McWilliams' },
      { id: 'rZEyxn1wi-0', title: 'How Much Do Hearing Aids Cost in 2026?', label: 'DTC health · HearDirectClub' },
      { id: 'tbswXCkh6ug', title: 'The Dating Expert: “I’ve Helped 4,000 Men Find Love”', label: 'Podcast · The Passionate Few · 326K subs' },
    ]},
    { label: 'B2B & SaaS', videos: [
      { id: '68tKi1QjSBQ', title: 'This AI Will Replace All Sales Agencies', label: 'B2B SaaS · Salesforge' },
      { id: 'OC3OZpGIxew', title: 'What I Learned From Sending 10,000 Terrible Cold Emails', label: 'B2B SaaS · Salesforge' },
      { id: 'nWvDvRGxbyk', title: 'The Easiest Way to Start Earning in Payments', label: 'Fintech · Zenti / Profit from Payments' },
      { id: 'Sa_NBfWW510', title: 'If You Run Facebook Ads… Everything Just Changed', label: 'Founder content · Perform Digital Media' },
    ]},
    { label: 'Law & Finance', videos: [
      { id: 'cOgay6dZ0NM', title: 'Alabama’s Hidden 90-Day Trust Rule', label: 'Law firm · Brenton C. McWilliams' },
      { id: 'QE_fv6B0n8I', title: 'Can Someone You Disinherited Fight Back?', label: 'Law firm · Brenton C. McWilliams' },
      { id: 'P9FE53dt3ow', title: 'The Tax Deadline Myth That Could Cost Founders Thousands', label: 'Tax advisory · R&D Tax Advisors' },
    ]},
    { label: 'Creators & Personal Brands', videos: [
      { id: '87XQIwoZ6pg', title: 'Money Ball: Levi vs Eric', label: 'Creator · Lively Lewis Show · 6M+ subs' },
      { id: '1-4xo4G2PQw', title: 'What Really Happens When I Take My Family to Costco', label: 'Creator · Heather McDonald' },
      { id: 'tbswXCkh6ug', title: 'The Dating Expert: “I’ve Helped 4,000 Men Find Love”', label: 'Podcast · The Passionate Few · 326K subs' },
      { id: 'HtexMiTvGaA', title: 'Ticket Mastery: Expert VSL', label: 'Expert VSL · Personal brand' },
      { id: 'IBdWTuDaYio', title: 'The Hidden Gem of Italy: Procida', label: 'Travel documentary · Brown Boy Travels' },
      { id: 'IKGGi1_E_Po', title: 'Talking-Head VSL with Motion Graphics', label: 'On-camera VSL · Personal brand' },
    ]},
    { label: 'Agencies & VSLs', videos: [
      { id: 'Sa_NBfWW510', title: 'If You Run Facebook Ads… Everything Just Changed', label: 'Founder content · Perform Digital Media' },
      { id: 'E7ZSXLfMous', title: 'Motion Graphics VSL', label: 'Agency VSL · Shoreline Social Media Group' },
      { id: '0suPsGTZxNU', title: 'Creative Agency Promo', label: 'Agency promo · Revonish' },
      { id: 'nMg9qYcJISg', title: 'Premium Offer Magnet VSL', label: 'Lead-magnet VSL' },
      { id: 'gXgLKrPLS8Y', title: 'Video Sales Letter with Motion Graphics', label: 'Motion graphics VSL' },
      { id: 'NfyIRolMxOY', title: 'SciatiEase Conversion VSL', label: 'VSL · SciatiEase · $5.5M brand' },
    ]},
    { label: 'DTC & Health', videos: [
      { id: 'rZEyxn1wi-0', title: 'How Much Do Hearing Aids Cost in 2026?', label: 'DTC health · HearDirectClub' },
      { id: 'NZhFjot4f60', title: 'Does Medicare Cover Hearing Aids? The Honest Answer', label: 'DTC health · HearDirectClub' },
      { id: 'NfyIRolMxOY', title: 'SciatiEase Conversion VSL', label: 'VSL · SciatiEase · $5.5M brand' },
    ]},
    { label: 'Faceless & Documentary', videos: [
      { id: 'ukcyNGGO8uY', title: 'Why Car Brands Are Quietly Threatening YouTubers', label: 'Faceless channel · Tuna No Crust' },
      { id: '2UuGgPNM1KM', title: 'The Dark Story of Australia’s Legendary Rock Band', label: 'Music documentary · Battle For Melody' },
      { id: '9aI0OzNuIKY', title: 'The 6 Worst Wingsuit Pilot Accidents In History', label: 'Documentary · Extreme Edge Stories' },
    ]},
  ];

  const videoTestimonials = [
    { src: '/testimonials/pj-cranley-weiland.mp4', poster: '/testimonials/pj-cranley-weiland.jpg', title: 'Pj Cranley Weiland', label: 'Business coach · TEDx speaker' },
    { src: '/testimonials/daniel-toth.mp4', poster: '/testimonials/daniel-toth.jpg', title: 'Daniel Toth', label: 'CEO · Rimark' },
    { videoId: 'wbKrc78hidU', title: 'Crystal Mae', label: 'Influencer' },
    { src: '/testimonials/brown-boy-travels.mp4', poster: '/testimonials/brown-boy-travels.jpg', title: 'Brown Boy Travels', label: 'Travel creator' },
  ];

  const reviews = [
    { text: 'Ammaz was really great to work with. He responded quickly, was extremely thorough, and delivered high-quality work. I was really impressed by the amount of time he put into understanding our branding and messaging to make sure the edits he made were aligned. I’m extremely pleased with the results and will definitely hire him in the future.', context: 'VSL editing' },
    { text: 'Ammaz understood our business, working with us to build a highly engaging motion graphics explainer video regarding our cryptocurrency. He went above and beyond to deliver a video that we are extremely happy with. Don’t go anywhere else or you will regret it.', context: 'Crypto explainer video' },
    { text: 'Working with Ammaz was an absolute pleasure! From start to finish, they demonstrated exceptional creativity, professionalism, and attention to detail. Ammaz took the time to understand our vision and turned it into a visually stunning masterpiece.', context: 'B2B tech marketing agency' },
    { text: 'Ammaz did a great job creating a VSL for us. We provided the content, he created a prototype, we came back with edits and notes, and he took care of them all, making a nice video about our interactive displays. Will use Ammaz again when our next video project comes up!', context: 'Product VSL' },
    { text: 'I had a great experience working with Ammaz. His clear and prompt communication made the entire process smooth and efficient, and what he produced was high quality and fit our brand’s aesthetics.', context: 'TV promo' },
    { text: 'Absolutely amazing experience! Ammaz came through for me on a last-minute business presentation and nailed it perfectly. He was punctual, communicated clearly, and quickly incorporated all my feedback.', context: 'Business presentation' },
    { text: 'Ammaz did a great job on editing and providing motion graphics for our company videos. Very communicative and responsive to adjustments with delivery in a timely manner. Highly recommend.', context: 'Company videos' },
    { text: 'Ammaz is fantastic to work with. Very communicative, detail oriented, and quick to update edits. Highly recommend.', context: 'YouTube documentary editing' },
    { text: 'Ammaz was a pleasure to work with. He was always prompt, listened to our feedback and was patient as this was a learning curve for us. I would happily recommend Ammaz for YouTube ads and video training editing.', context: 'YouTube video ad' },
    { text: 'Work with Ammaz. You will not be disappointed. This will be the first of many projects with him.', context: 'Marketing agency video ads' },
    { text: 'Great skills. Was very responsive and open to applying feedback until we got it right. Once we had the first video where we needed it he was quickly able to produce the others.', context: 'Meta ads for a chiropractic clinic' },
    { text: 'Muhammad is very helpful. He helped us to make this product advert video with some 3D animation effects. I highly recommend him to create videos for people.', context: 'Product promo with 3D animation' },
    { text: 'Great output and efficient process of feedback and edits. End result was right on point and very strong match to original vision.', context: 'Veterinary business video' },
    { text: 'Ammaz was absolutely fantastic and extremely talented. He was professional every step of the way and I really enjoyed working with him.', context: 'Engagement video' },
    { text: 'Ammaz did a great job at editing our short VSL. I would highly recommend anyone who is looking to get their VSL edited to reach out to Ammaz.', context: 'Video sales letter' },
    { text: 'Ammaz did a great job on editing and providing motion graphics for our VSL landing page and onboarding video. Great work and communicated on a timely manner.', context: 'VSL and onboarding video' },
    { text: 'Great work and very efficient! Video was completed to a high standard and all feedback applied.', context: 'Aviation company reel' },
    { text: 'Ammaz is an excellent contractor and I will definitely work with him again.', context: 'Psychologist and author' },
  ];

  const howItWorks = [
    { icon: <Phone size={24} />, who: 'CreativeFlic', title: 'Strategy call', desc: 'We map the first videos your buyers need to see before they buy, and the keywords they search to find them.' },
    { icon: <Mic size={24} />, who: 'You, with our guidance', title: 'You record, or you don\'t', desc: 'Send talking points or record in one batch session with our scripts and on-camera guidance. Faceless formats need no filming at all.' },
    { icon: <Rocket size={24} />, who: 'CreativeFlic', title: 'We do the rest', desc: 'Editing, motion graphics, thumbnails, titles, publishing and tracking which videos bring in leads and sales.' },
  ];

  const faqs = [
    { q: 'Why YouTube?', a: 'Your buyers research before they buy, and YouTube is where they do it. Unlike paid ads, a video keeps ranking and selling for years, so your cost per customer falls over time instead of rising.' },
    { q: 'Do I need a big audience for this to work?', a: 'No. We build for search and buyer intent, not virality. A small channel that answers the questions your buyers type into YouTube can bring in qualified leads long before it has a big subscriber count.' },
    { q: 'How much of my time does this take?', a: 'Very little. You approve the plan, then either send talking points or record in one batch session with our scripts. Faceless formats need no filming at all. We handle everything else.' },
    { q: 'Do I need to come up with the content ideas?', a: 'No. We research what your buyers search, plan the topics, and write the scripts. You review and approve.' },
    { q: 'How is this different from hiring a video editor?', a: 'An editor waits for footage and direction. We own the whole loop: strategy, scripts, production, publishing and attribution, so you get a channel that is built to sell, not just edited videos.' },
    { q: 'What results can I expect, and when?', a: 'YouTube compounds, it does not spike. Expect foundation work and your first 8 videos in months 1 to 2, winning formats by month 3, and first tracked revenue in months 4 to 6. We never promise view counts. We report the leading indicators weekly so you see progress from day one.' },
    { q: 'Who owns the channel and content?', a: 'You do. The channel, the videos and the data are 100% yours from day one.' },
    { q: 'How quickly can we start?', a: 'Usually within a week of the strategy call. Start with the free audit and we will show you the first 5 videos we would make.' },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sampleTab, setSampleTab] = useState(0);
  const [openCase, setOpenCase] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

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

            <Reveal delay={230} variant="fade-up">
              <div className="mb-12">
                <FounderVideo videoId="lFLgvsUs8Eo" caption="Meet Ammaz · How CreativeFlic works · 2:47" isDark={isDark} />
              </div>
            </Reveal>

            <Reveal delay={250} variant="fade-up">
              <div className="mb-11">
                <div className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>For Product Brands $1M–$20M & Expert-Led Firms</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { icon: <ShoppingCart size={13} />, label: 'Ecommerce' },
                    { icon: <HeartPulse size={13} />, label: 'Healthcare' },
                    { icon: <Coins size={13} />, label: 'Finance' },
                    { icon: <Cloud size={13} />, label: 'B2B SaaS' },
                    { icon: <Building2 size={13} />, label: 'Real Estate' },
                    { icon: <Scale size={13} />, label: 'Law & Professional Services' },
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
                  { end: 100, decimals: 0, prefix: '', suffix: 'M+', label: 'Organic views generated' },
                  { end: 136, decimals: 0, prefix: '', suffix: 'K+', label: 'Subscribers on one channel' },
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
                <ProjectCard {...project} isDark={isDark} onOpen={() => setOpenCase(index)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyModal
        study={openCase === null ? null : caseStudies[openCase]}
        isDark={isDark}
        onClose={() => setOpenCase(null)}
        onCta={() => { setOpenCase(null); setTimeout(() => scrollToSection('contact'), 50); }}
      />

      {/* SEE THE WORK */}
      <section id="samples" className={`py-24 relative overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>02 · See The Work</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="Real Videos. Judge the Work Yourself." className="text-4xl md:text-5xl font-bold mb-6" stagger={50} />
              <p className={theme.textMuted}>Complex products, legal questions and big stories, made worth watching. Press play on any of them.</p>
            </div>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Work samples by industry">
            {sampleTabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={sampleTab === i}
                onClick={() => setSampleTab(i)}
                className={`px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all duration-300 ${sampleTab === i ? 'bg-blue-600 border-blue-600 text-white' : isDark ? 'border-white/15 text-neutral-300 hover:border-white/40' : 'border-black/15 text-neutral-700 hover:border-black/40'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div key={sampleTab} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-6xl mx-auto">
            {sampleTabs[sampleTab].videos.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 100} variant="fade-up">
                <VideoTile videoId={v.id} title={v.title} label={v.label} isDark={isDark} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT VOICES */}
      <section id="testimonials" className={`py-24 relative overflow-hidden ${theme.sectionBg}`}>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>03 · Client Voices</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="Don’t Take Our Word for It" className="text-4xl md:text-5xl font-bold mb-6" stagger={50} />
              <p className={theme.textMuted}>Straight from the people we have built videos for.</p>
            </div>
          </Reveal>
          <Reveal variant="fade-up">
            <div className={`flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mb-14 text-sm ${theme.textMuted}`}>
              <span className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={15} className="text-yellow-400" fill="currentColor" />)}
                <span className={`ml-1 font-bold ${theme.text}`}>4.9</span> from 82 client reviews
              </span>
              <span><span className={`font-bold ${theme.text}`}>97%</span> job success</span>
              <span><span className={`font-bold ${theme.text}`}>146</span> projects delivered</span>
              <span><span className={`font-bold ${theme.text}`}>Top Rated Plus</span> on Upwork</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-14">
            {videoTestimonials.map((v, i) => (
              <Reveal key={i} delay={i * 100} variant="fade-up">
                <VideoTile videoId={v.videoId} src={v.src} poster={v.poster} title={v.title} label={v.label} isDark={isDark} vertical />
              </Reveal>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.slice(0, showAllReviews ? reviews.length : 6).map((r, i) => (
                <Reveal key={i} delay={(i % 3) * 80} variant="fade-up" className="h-full">
                  <div className={`p-6 rounded-2xl border h-full flex flex-col ${isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                    <div className="flex gap-0.5 mb-3">
                      {[0, 1, 2, 3, 4].map((k) => <Star key={k} size={13} className="text-yellow-400" fill="currentColor" />)}
                    </div>
                    <p className={`text-sm leading-relaxed flex-grow ${theme.text}`}>“{r.text}”</p>
                    <div className={`mt-4 text-[11px] uppercase tracking-[0.15em] ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>Verified client · {r.context}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            {!showAllReviews && (
              <div className="text-center mt-8">
                <button type="button" onClick={() => setShowAllReviews(true)} className={`px-7 py-3 rounded-full border font-semibold text-sm transition-all duration-300 ${isDark ? 'border-white/15 hover:border-white/40 text-neutral-300 hover:text-white' : 'border-black/15 hover:border-black/40 text-neutral-700 hover:text-black'}`}>
                  Show all {reviews.length} reviews
                </button>
              </div>
            )}
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
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>04 · The Revenue System</h2>
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
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>05 · Inside The Engine Room</h2>
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

      {/* HOW IT WORKS */}
      <section id="how" className={`py-24 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>06 · How It Works</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="Three Steps. Almost None of Them Yours." className="text-4xl md:text-5xl font-bold mb-6" stagger={50} />
              <p className={theme.textMuted}>You bring the expertise. We turn it into a channel that sells.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {howItWorks.map((step, i) => (
              <Reveal key={i} delay={i * 120} variant="fade-up" className="h-full">
                <div className={`p-7 rounded-3xl border h-full ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme.iconBg}`}>{step.icon}</div>
                    <span className={`text-4xl font-black ${isDark ? 'text-neutral-800' : 'text-neutral-200'}`}>0{i + 1}</span>
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${kicker}`}>{step.who}</div>
                  <h4 className={`text-xl font-bold mb-3 ${theme.text}`}>{step.title}</h4>
                  <p className={`text-sm leading-relaxed ${theme.textMuted}`}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONE CURVE */}
      <section id="curve" className={`py-24 ${theme.sectionBg}`}>
        <div className="container mx-auto px-6">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>07 · No Surprises</h2>
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
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>08 · Transparent Pricing</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="The Price of a Freelancer. The Standard of a Growth Agency." className="text-4xl md:text-5xl font-bold mb-6" stagger={45} />
              <p className={theme.textMuted}>
                Full-stack agencies charge $10–30k/month for this scope. Freelancers can’t deliver it. We built our engine to close that gap. And be careful with anyone promising this full scope for under $1,500/month. That’s the industry’s own red flag.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {/* Strategy Sprint */}
            <Reveal delay={0} variant="scale-up" className="h-full">
              <div className={`p-8 rounded-3xl border h-full flex flex-col transition-all duration-300 hover:-translate-y-2 spotlight-card ${theme.spotlightCard}`} onMouseMove={handleSpotlightMove}>
                <div className={`text-xs font-black uppercase tracking-widest mb-2 ${accentText}`}>Step 1 · One-Time</div>
                <h4 className={`text-2xl font-black mb-1 ${theme.text}`}>Strategy Sprint</h4>
                <div className={`text-3xl font-black mb-6 ${theme.text}`}>$1,950<span className={`text-base font-bold ${theme.textMuted}`}> one-time</span></div>
                <p className={`text-sm mb-6 ${theme.textMuted}`}>30 days. Everything needed before a single video ships. <span className={`font-bold ${theme.text}`}>Credited in full against month 1 when you start a 6-month Engine plan.</span></p>
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
                <div className={`text-3xl font-black mb-6 ${theme.text}`}><span className={`text-base font-bold ${theme.textMuted}`}>From </span>$3,500<span className={`text-base font-bold ${theme.textMuted}`}>/mo</span></div>
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
                <div className={`text-3xl font-black mb-6 ${theme.text}`}><span className={`text-base font-bold ${theme.textMuted}`}>From </span>$5,500<span className={`text-base font-bold ${theme.textMuted}`}>/mo</span></div>
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
                <span className={`font-bold ${theme.text}`}>Skin in the game:</span> from month 4, an optional performance fee on <span className={`font-bold ${theme.text}`}>tracked, coded YouTube revenue</span>. Capped, and only when it works. Details on the call.
              </p>
            </div>
          </Reveal>

          <Reveal delay={350} variant="fade-in">
            <p className={`mt-8 text-center text-xs ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
              Not ready for the full engine? <span className="font-bold">Editing + Strategy Lite from $1,200/mo</span>: editing plus a monthly content plan, without the full system.
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
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>09 · Zero Fine Print</h2>
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
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>10 · We Are Selective</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="This Only Works for the Right Brand" className="text-4xl md:text-5xl font-bold mb-6" stagger={50} />
              <p className={theme.textMuted}>
                We take on a limited number of engine clients so every channel gets senior attention. Here’s the honest filter.
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

          {/* Services businesses */}
          <Reveal delay={150} variant="fade-up">
            <div id="services" className={`mt-10 max-w-5xl mx-auto p-8 md:p-10 rounded-3xl border ${isDark ? 'border-blue-900/50 bg-blue-950/20' : 'border-blue-200 bg-blue-50'}`}>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${theme.iconBg}`}>
                  <Scale size={28} />
                </div>
                <div className="flex-grow">
                  <h4 className={`text-2xl font-black mb-3 ${theme.text}`}>Also built for law firms and expert-led businesses</h4>
                  <p className={`text-sm leading-relaxed mb-4 ${theme.textMuted}`}>
                    Your clients search YouTube before they call anyone. We turn your expertise into a library of explainer videos that answers their questions, builds trust and sends consultations your way. You record once a month or send talking points, and we handle topics, editing, motion graphics, thumbnails, SEO and publishing.
                  </p>
                  <p className={`text-sm font-bold mb-6 ${theme.text}`}>
                    500+ legal and tax videos produced for firms like Brenton C. McWilliams Law and R&D Tax Advisors.
                  </p>
                  <button onClick={() => scrollToSection('contact')} className={`btn-sheen inline-flex items-center gap-2 px-7 py-3 ${brandBlue} text-white font-bold rounded-full hover:bg-blue-500 transition-all duration-300 text-sm tracking-wide`}>
                    Get Your Free Channel Audit <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-24 ${theme.sectionBg}`}>
        <div className="container mx-auto px-6">
          <Reveal variant="creative-up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className={`flex items-center justify-center gap-4 mb-5`}>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
                <h2 className={`${kicker} font-semibold uppercase tracking-[0.3em] text-xs`}>11 · Before We Talk</h2>
                <span className={`h-px w-8 ${isDark ? 'bg-yellow-400/50' : 'bg-yellow-500/60'}`}></span>
              </div>
              <WordReveal as="h3" text="Good Questions. Straight Answers." className="text-4xl md:text-5xl font-bold mb-6" stagger={50} />
              <p className={theme.textMuted}>The things founders and partners ask us most.</p>
            </div>
          </Reveal>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className={`rounded-2xl border transition-colors ${open ? (isDark ? 'border-blue-500/50 bg-neutral-900' : 'border-blue-500 bg-white') : (isDark ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-white')}`}>
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                    <span className={`font-bold ${theme.text}`}>{f.q}</span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-blue-500' : theme.textMuted}`} />
                  </button>
                  {open && <p className={`px-5 pb-5 -mt-1 text-sm leading-relaxed ${theme.textMuted}`}>{f.a}</p>}
                </div>
              );
            })}
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
                  'The 20 keywords your buyers actually search on YouTube',
                  'Which competitor channels are winning your buyers’ attention, and why',
                  'The search demand your brand is missing today',
                  'The first 5 videos your brand should make'
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
