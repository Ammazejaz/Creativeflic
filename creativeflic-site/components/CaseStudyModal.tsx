import React, { useEffect } from 'react';
import { X, Target, Wrench, TrendingUp, ExternalLink, BarChart3 } from 'lucide-react';
import VideoTile from './VideoTile';
import type { ProjectCardProps } from './ProjectCard';

type CaseStudy = Omit<ProjectCardProps, 'isDark' | 'onOpen'>;

interface CaseStudyModalProps {
  study: CaseStudy | null;
  isDark: boolean;
  onClose: () => void;
  onCta: () => void;
}

/** Full case study: challenge, what we built, outcome, proof screenshot and a real video. */
const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, isDark, onClose, onCta }) => {
  useEffect(() => {
    if (!study) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [study, onClose]);

  if (!study) return null;
  const d = study.detail;
  const panel = isDark ? 'bg-neutral-950 border-white/10 text-white' : 'bg-white border-neutral-200 text-neutral-900';
  const muted = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const label = `text-[10px] font-bold uppercase tracking-[0.25em] mb-3 flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`;

  return (
    <div className="fixed inset-0 z-[90] flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto" role="dialog" aria-modal="true" aria-label={study.title}>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl my-auto ${panel}`}>
        <button type="button" onClick={onClose} aria-label="Close case study" className={`absolute top-4 right-4 z-10 p-2 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}>
          <X size={20} />
        </button>

        <div className="p-6 md:p-10">
          <div className={`text-[10px] font-semibold uppercase tracking-[0.28em] mb-3 ${muted}`}>{study.category}</div>
          <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-2 pr-10">{study.title}</h3>
          <p className={`text-xs font-mono mb-8 ${muted}`}>{study.role}</p>

          {study.metric && (
            <div className={`inline-flex items-baseline gap-3 mb-8 px-5 py-3 rounded-2xl ${isDark ? 'bg-blue-950/40 border border-blue-900/50' : 'bg-blue-50 border border-blue-200'}`}>
              <span className="text-3xl font-black">{study.metric.value}</span>
              <span className={`text-[10px] uppercase tracking-[0.2em] ${muted}`}>{study.metric.label}</span>
            </div>
          )}

          {d && (
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div>
                <div className={label}><Target size={13} /> The challenge</div>
                <p className={`text-sm leading-relaxed ${muted}`}>{d.challenge}</p>
              </div>
              <div>
                <div className={label}><Wrench size={13} /> What we built</div>
                <ul className={`space-y-2 text-sm leading-relaxed ${muted}`}>
                  {d.built.map((b, i) => <li key={i}>• {b}</li>)}
                </ul>
              </div>
              <div>
                <div className={label}><TrendingUp size={13} /> The outcome</div>
                <ul className="space-y-2 text-sm leading-relaxed font-semibold">
                  {d.outcome.map((o, i) => <li key={i}>• {o}</li>)}
                </ul>
              </div>
            </div>
          )}

          {study.shot && (
            <figure className="mb-10">
              <div className={label}><BarChart3 size={13} /> {study.shotLabel || 'Real YouTube Studio data'}</div>
              <img src={study.shot} alt={`${study.title}: YouTube Studio analytics`} className={`w-full rounded-2xl border ${isDark ? 'border-white/10' : 'border-neutral-200'}`} />
            </figure>
          )}

          {(study.video || (study.thumbs && study.thumbs.length > 0)) && (
            <div className="mb-10">
              <div className={label}>Watch the work</div>
              <div className="grid sm:grid-cols-2 gap-5">
                {[study.video, ...(study.thumbs || [])].filter((v, i, a) => v && a.indexOf(v) === i).slice(0, 2).map((id) => (
                  <VideoTile key={id} videoId={id as string} title="" label="" isDark={isDark} />
                ))}
              </div>
            </div>
          )}

          {study.quote && (
            <blockquote className={`mb-10 pl-4 border-l-2 ${isDark ? 'border-yellow-400/80' : 'border-yellow-500'}`}>
              <p className="text-lg italic leading-relaxed">“{study.quote.text}”</p>
              <cite className={`not-italic text-[10px] uppercase tracking-[0.2em] mt-2 block ${muted}`}>{study.quote.by}</cite>
            </blockquote>
          )}

          <div className={`pt-6 border-t flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
            <button type="button" onClick={onCta} className="btn-sheen inline-flex items-center justify-center gap-2 px-7 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-colors text-sm">
              Get a plan like this for your brand
            </button>
            {study.link && (
              <a href={study.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${muted} hover:underline`}>
                Visit the client <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
