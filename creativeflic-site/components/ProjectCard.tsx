import React from 'react';
import { ExternalLink, Award, TrendingUp } from 'lucide-react';

interface ProjectCardProps {
    category: string;
    title: string;
    tags: string[];
    results: string[];
    role: string;
    link: string | null;
    isDark: boolean;
    mark: string;                                   // watermark brand word
    metric?: { value: string; label: string };
    quote?: { text: string; by: string };
    featured?: boolean;
}

/**
 * Editorial case card. Media panel is pure design: deep navy field,
 * oversized watermark typography, one slow rotating hairline dial,
 * metric in the foreground. No photography, no fake charts.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ category, title, tags, results, role, link, isDark, mark, metric, quote, featured }) => {
  const cardBg = isDark ? 'bg-neutral-950 border-white/8' : 'bg-white border-neutral-200 shadow-sm';
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const descColor = isDark ? 'text-neutral-500' : 'text-neutral-600';

  return (
    <div className="group relative h-full">
      <div className={`relative ${cardBg} rounded-3xl border overflow-hidden h-full transition-all duration-500 ease-out group-hover:-translate-y-1.5 ${isDark ? 'group-hover:border-white/20 group-hover:shadow-[0_24px_70px_-24px_rgba(37,99,235,0.35)]' : 'group-hover:border-neutral-300 group-hover:shadow-xl'} ${featured ? 'lg:flex' : ''}`}>

        {/* MEDIA PANEL */}
        <div className={`relative overflow-hidden ${featured ? 'h-60 lg:h-auto lg:w-[50%] lg:min-h-[380px]' : 'h-52'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1834] via-[#080f22] to-black"></div>

          {/* Oversized watermark */}
          <span className={`absolute -bottom-5 -right-1 font-black tracking-tighter text-white/[0.05] select-none leading-none whitespace-nowrap transition-all duration-700 group-hover:text-white/[0.08] ${featured ? 'text-[5.5rem] lg:text-[7rem]' : 'text-[4.5rem]'}`}>
            {mark}
          </span>

          {/* Rotating hairline dial */}
          <div className="absolute top-6 right-6 w-14 h-14">
            <div className="absolute inset-0 rounded-full border border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-t border-yellow-400/70 animate-spin-slower"></div>
            <div className="absolute inset-[38%] rounded-full bg-blue-500/80 breathe"></div>
          </div>

          <span className="absolute top-6 left-7 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/60">{category}</span>

          {metric && (
            <div className="absolute bottom-6 left-7">
              <div className={`font-bold tracking-tight text-white leading-none ${featured ? 'text-5xl' : 'text-4xl'}`}>{metric.value}</div>
              <div className="text-[9px] uppercase tracking-[0.28em] text-white/50 mt-2.5">{metric.label}</div>
            </div>
          )}
        </div>

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

          <div className={`mt-auto pt-5 border-t flex justify-between items-center ${isDark ? 'border-white/5' : 'border-black/5'}`}>
            <span className={`text-[10px] uppercase tracking-[0.15em] ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
              {tags.join(' · ')}
            </span>
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
