import React from 'react';
import { PenTool, Clapperboard, Image, Send, BarChart3 } from 'lucide-react';

/**
 * "Engine room" marquee: hairline, monochrome mockups of each production
 * stage. One accent per card, slow drift, pauses on hover.
 */
const WorkDemo = ({ isDark }: { isDark: boolean }) => {
  const cardBase = isDark
    ? 'bg-white/[0.02] border-white/8'
    : 'bg-white border-neutral-200';
  const label = isDark ? 'text-neutral-500' : 'text-neutral-500';
  const soft = isDark ? 'bg-white/8' : 'bg-neutral-200';
  const softer = isDark ? 'bg-white/[0.04]' : 'bg-neutral-100';
  const mono = isDark ? 'text-neutral-400' : 'text-neutral-600';

  const Header = ({ n, name, icon }: { n: string; name: string; icon: React.ReactNode }) => (
    <div className="flex items-center justify-between mb-5">
      <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${label}`}>
        <span className={isDark ? 'text-yellow-400/90' : 'text-yellow-600'}>{n}</span>&nbsp;&nbsp;{name}
      </span>
      <span className={isDark ? 'text-neutral-600' : 'text-neutral-400'}>{icon}</span>
    </div>
  );

  const cards = [
    <div key="script" className={`shrink-0 w-72 h-44 rounded-2xl border p-6 ${cardBase}`}>
      <Header n="01" name="Script" icon={<PenTool size={13} />} />
      <div className="space-y-3">
        <div className={`h-1.5 rounded-full w-[85%] ${soft}`}></div>
        <div className={`h-1.5 rounded-full w-[62%] ${soft}`}></div>
        <div className="h-1.5 rounded-full w-[74%] bg-blue-500/50"></div>
        <div className={`h-1.5 rounded-full w-[40%] ${soft}`}></div>
      </div>
      <div className={`text-[10px] font-mono mt-5 ${mono}`}>hook · story · proof · cta</div>
    </div>,

    <div key="edit" className={`shrink-0 w-72 h-44 rounded-2xl border p-6 relative overflow-hidden ${cardBase}`}>
      <Header n="02" name="Edit" icon={<Clapperboard size={13} />} />
      <div className="relative space-y-2">
        <div className="flex gap-1.5">
          <div className={`h-5 rounded w-[38%] ${soft}`}></div>
          <div className="h-5 rounded w-[26%] bg-blue-500/35"></div>
          <div className={`h-5 rounded w-[30%] ${soft}`}></div>
        </div>
        <div className="flex gap-1.5">
          <div className={`h-5 rounded w-[22%] ${softer}`}></div>
          <div className={`h-5 rounded w-[46%] ${soft}`}></div>
          <div className={`h-5 rounded w-[26%] ${softer}`}></div>
        </div>
        <div className="playhead absolute -top-1 -bottom-1 w-px bg-yellow-400/90"></div>
      </div>
      <div className={`text-[10px] font-mono mt-5 ${mono}`}>retention pass</div>
    </div>,

    <div key="thumb" className={`shrink-0 w-72 h-44 rounded-2xl border p-6 ${cardBase}`}>
      <Header n="03" name="Thumbnail" icon={<Image size={13} />} />
      <div className="flex gap-3">
        <div className={`flex-1 aspect-video rounded-lg border flex items-center justify-center ${isDark ? 'border-blue-500/60 bg-blue-500/10' : 'border-blue-500 bg-blue-50'}`}>
          <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>A</span>
        </div>
        <div className={`flex-1 aspect-video rounded-lg border border-transparent flex items-center justify-center ${softer}`}>
          <span className={isDark ? 'text-neutral-600 text-sm font-bold' : 'text-neutral-400 text-sm font-bold'}>B</span>
        </div>
      </div>
      <div className={`text-[10px] font-mono mt-5 ${mono}`}>three concepts · one winner</div>
    </div>,

    <div key="publish" className={`shrink-0 w-72 h-44 rounded-2xl border p-6 ${cardBase}`}>
      <Header n="04" name="Publish" icon={<Send size={13} />} />
      <div className="grid grid-cols-7 gap-1.5 mb-5">
        {[...Array(14)].map((_, i) => (
          <div key={i} className={`h-3 rounded-sm ${i === 2 || i === 9 ? 'bg-blue-500/60' : softer}`}></div>
        ))}
      </div>
      <div className={`text-[10px] font-mono ${mono}`}>fixed cadence · seo · chapters</div>
    </div>,

    <div key="report" className={`shrink-0 w-72 h-44 rounded-2xl border p-6 ${cardBase}`}>
      <Header n="05" name="Report" icon={<BarChart3 size={13} />} />
      <div className="flex items-end gap-2 h-14 mb-5">
        {[28, 40, 36, 52, 48, 66, 78, 92].map((h, i) => (
          <div key={i} className={`w-3.5 rounded-t-[2px] ${i === 7 ? 'bg-yellow-400/90' : i > 4 ? 'bg-blue-500/50' : soft}`}
               style={{ height: `${h}%` }}></div>
        ))}
      </div>
      <div className={`text-[10px] font-mono ${mono}`}>weekly loom · live dashboard</div>
    </div>,
  ];

  return (
    <div className="marquee-container relative overflow-hidden py-2">
      <div className={`absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r ${isDark ? 'from-black' : 'from-neutral-50'} to-transparent`}></div>
      <div className={`absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l ${isDark ? 'from-black' : 'from-neutral-50'} to-transparent`}></div>
      <div className="animate-marquee-slow flex gap-6 w-max">
        {cards}
        {cards.map((c, i) => React.cloneElement(c as React.ReactElement, { key: `dup-${i}` }))}
      </div>
    </div>
  );
};

export default WorkDemo;
