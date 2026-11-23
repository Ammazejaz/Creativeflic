import React from 'react';
import { ExternalLink, Award, TrendingUp, ArrowRight, BarChart3 } from 'lucide-react';

export interface CaseDetail {
  challenge: string;
  built: string[];
  outcome: string[];
}

export interface ProjectCardProps {
    category: string;
    title: string;
    tags: string[];
    results: string[];
    role: string;
    link: string | null;
    isDark: boolean;
    mark: string;                                   // watermark brand word (fallback media)
    metric?: { value: string; label: string };
    quote?: { text: string; by: string };
    featured?: boolean;
    thumbs?: string[];                              // YouTube IDs of real videos for the media panel
    shot?: string;                                  // analytics screenshot (proof)
    shotLabel?: string;
    video?: string;                                 // YouTube ID shown in the case study view
    detail?: CaseDetail;
    onOpen?: () => void;
}

/**
 * Case card. The media panel shows real proof: an analytics screenshot when we
 * have one, otherwise a grid of real thumbnails from the channel. The metric
 * sits on top. "Read the case study" opens the full story.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ category, title, tags, results, role, link, isDark, mark, metric, quote, featured, thumbs, shot, shotLabel, onOpen }) => {
  const cardBg = isDark ? 'bg-neutral-950 border-white/8' : 'bg-white border-neutral-200 shadow-sm';
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const descColor = isDark ? 'text-neutral-500' : 'text-neutral-600';
  const grid = (thumbs || []).slice(0, 4);

  return (
    <div className="group relative h-full">
      <div className={`relative ${cardBg} rounded-3xl border overflow-hidden h-full transition-all duration-500 ease-out group-hover:-translate-y-1.5 ${isDark ? 'group-hover:border-white/20 group-hover:shadow-[0_24px_70px_-24px_rgba(37,99,235,0.35)]' : 'group-hover:border-neutral-300 group-hover:shadow-xl'} ${featured ? 'lg:flex' : ''}`}>

        {/* MEDIA PANEL */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open case study: ${title}`}
          className={`relative block w-full overflow-hidden text-left ${featured ? 'h-64 lg:h-auto lg:w-[50%] lg:min-h-[400px]' : 'h-56'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1834] via-[#080f22] to-black"></div>

          {shot ? (
            <img src={shot} alt={`${title}: real YouTube Studio analytics`} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top opacity-80 transition-transform duration-700 group-hover:scale-[1.04]" />
          ) : grid.length > 0 ? (
            <div className={`absolute inset-0 grid ${grid.length >= 4 ? 'grid-cols-2 grid-rows-2' : grid.length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-px`}>
              {grid.map((id) => (
                <img key={id} src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
              ))}
            </div>
          ) : (
            <span className={`absolute -bottom-5 -right-1 font-black tracking-tighter text-white/[0.05] select-none leading-none whitespace-nowrap ${featured ? 'text-[5.5rem] lg:text-[7rem]' : 'text-[4.5rem]'}`}>
              {mark}
            </span>
          )}

          {/* Legibility gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40"></div>

          <span className="absolute top-5 left-6 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/80">{category}</span>
          {shot && (
            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/70 border border-white/15 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-300">
              <BarChart3 size={11} /> {shotLabel || 'Real YouTube Studio data'}
            </span>
          )}

          {metric && (
            <div className="absolute bottom-6 left-6">
              <div className={`font-bold tracking-tight text-white leading-none ${featured ? 'text-5xl' : 'text-4xl'}`}>{metric.value}</div>
              <div className="text-[9px] uppercase tracking-[0.28em] text-white/70 mt-2.5">{metric.label}</div>
            </div>
          )}
        </button>

        {/* BODY */}
        <div className={`p-8 flex flex-col ${featured ? 'lg:w-[50%] lg:p-10 lg:justify-center' : ''}`}>
          <h3 className={`${featured ? 'text-xl lg:text-2xl' : 'text-lg'} font-bold mb-2 leading-snug transition-colors duration-300 ${isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'} ${textColor}`}>
            {title}
          </h3>
          <p className={`text-[11px] mb-6 font-mono ${descColor}`}>{role}</p>

          {quote && (
            <blockquote className={`mb-6 pl-4 border-l-2 ${isDark ? 'border-yellow-400/80' : 'border-yellow-500'}`}>
              <p className={`text-base italic leading-relaxed ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>“{quote.text}”</p>
              <cite className={`not-italic text-[10px] uppercase tracking-[0.2em] mt-2 block ${descColor}`}>{quote.by}</cite>
            </blockquote>
          )}

          <div className="space-y-2.5 mb-7 flex-grow">
            {results.map((result, i) => (
              <div key={i} className={`flex items-start gap-2.5 text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <TrendingUp size={12} className={`mt-0.5 shrink-0 ${isDark ? 'text-blue-500' : 'text-blue-600'}`} />
                {result}
              </div>
            ))}
          </div>

          <div className={`mt-auto pt-5 border-t flex justify-between items-center gap-4 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
            {onOpen ? (
              <button type="button" onClick={onOpen} className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-blue-400 hover:text-white' : 'text-blue-600 hover:text-black'}`}>
                Read the case study <ArrowRight size={12} />
              </button>
            ) : (
              <span className={`text-[10px] uppercase tracking-[0.15em] ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>{tags.join(' · ')}</span>
            )}
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'}`}>
                Visit <ExternalLink size={11} />
              </a>
            ) : (
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`} title="Confidential Client">
                Private <Award size={11} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
