import React from 'react';
import { Play, TrendingUp, Zap, BarChart3, Activity, Tag } from 'lucide-react';

const FloatingHeroGraphics = ({ isDark }: { isDark: boolean }) => {
    return (
        <div className="relative w-full h-[400px] md:h-[600px] perspective-1000">
            {/* Central Circle Gradient */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[80px] opacity-40 animate-pulse-slow ${isDark ? 'bg-blue-600/30' : 'bg-blue-500/20'}`}></div>
            
            {/* Card 1: The Play Button (Center Front) */}
            <div className="absolute top-1/2 left-1/2 w-28 h-28 md:w-48 md:h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[2rem] shadow-2xl flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-30 border border-white/20">
                <Play size={48} className="text-black fill-black md:w-16 md:h-16" />
            </div>

            {/* Card 2: Playing Video / Waveform (Top Right) */}
            <div className={`absolute top-[5%] right-[0%] md:top-[10%] md:right-[5%] w-40 h-24 md:w-60 md:h-32 rounded-2xl backdrop-blur-md border shadow-xl flex flex-col items-center justify-center transform rotate-6 animate-float-medium z-20 ${isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-white border-neutral-200'}`}>
                <div className="flex items-center gap-2 mb-2 w-full px-4">
                     <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                     <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Recording</span>
                </div>
                <div className="flex items-end gap-1 h-8 md:h-10">
                     {[...Array(12)].map((_,i) => (
                         <div key={i} className="w-1 md:w-1.5 bg-blue-500 rounded-full animate-music-bar" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                     ))}
                </div>
                <div className="absolute top-3 right-3">
                    <Activity size={14} className="text-blue-500" />
                </div>
            </div>

            {/* Card 3: Retention (Bottom Left) */}
            <div className={`absolute bottom-[10%] left-[0%] md:bottom-[15%] md:left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-2xl backdrop-blur-md border shadow-xl p-3 md:p-4 transform -rotate-6 animate-float-fast z-20 ${isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white border-neutral-300'}`}>
                <div className="flex justify-between items-center mb-2 md:mb-4">
                    <span className={`text-[10px] md:text-xs font-bold ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Retention</span>
                    <TrendingUp size={14} className="text-green-500" />
                </div>
                <div className="text-xl md:text-2xl font-bold mb-2">84%</div>
                <div className={`h-1.5 md:h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`}>
                    <div className="h-full bg-green-500 w-[84%]"></div>
                </div>
                <div className="mt-3 md:mt-4 flex gap-1">
                     <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500"><Zap size={12}/></div>
                     <div className="text-[9px] md:text-[10px] leading-tight flex items-center text-neutral-500">Avg. View Duration up by 2m</div>
                </div>
            </div>

             {/* Card 4: Client Revenue (Top Left) */}
             <div className={`absolute top-[5%] left-[0%] md:top-[10%] md:left-[5%] w-auto p-3 md:p-4 rounded-2xl backdrop-blur-md border shadow-xl flex flex-col items-start justify-center transform -rotate-6 animate-float-slow z-20 ${isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-300'}`}>
                 <div className="flex items-center gap-3 mb-3">
                    <div className={`p-1.5 md:p-2 rounded-lg ${isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                        <BarChart3 size={16} className="md:w-5 md:h-5" />
                    </div>
                    <div>
                        <div className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>Client Revenue</div>
                        <div className={`text-lg md:text-xl font-black leading-none ${isDark ? 'text-white' : 'text-neutral-900'}`}>$5.5M<span className="text-[10px] font-bold text-neutral-500">/yr</span></div>
                    </div>
                </div>
                <div className="flex gap-1 items-end h-6 md:h-8 ml-1">
                     {[30, 50, 40, 70, 50, 80, 60, 90].map((h, i) => (
                         <div key={i} className={`w-1 md:w-1.5 rounded-t-sm ${i > 4 ? (isDark ? 'bg-yellow-400' : 'bg-yellow-500') : (isDark ? 'bg-neutral-700' : 'bg-neutral-400')}`} style={{ height: `${h}%` }}></div>
                     ))}
                </div>
            </div>

            {/* Card 5: Attribution / Coded Sale (Bottom Right) */}
            <div className={`absolute bottom-[10%] right-[0%] md:bottom-[15%] md:right-[5%] w-auto min-w-[140px] md:min-w-[200px] p-3 md:p-4 rounded-2xl backdrop-blur-md border shadow-xl flex items-center justify-center gap-3 md:gap-4 transform rotate-6 animate-float-medium z-20 ${isDark ? 'bg-neutral-800/90 border-neutral-700' : 'bg-white border-neutral-300'}`} style={{ animationDelay: '1s' }}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 shrink-0">
                    <Tag size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                    <div className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Tracked Sale</div>
                    <div className={`text-lg md:text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>+$184.00</div>
                    <div className={`inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-black uppercase tracking-wider ${isDark ? 'bg-green-500/15 text-green-400' : 'bg-green-100 text-green-700'}`}>
                        <TrendingUp size={8} /> Promo YT20 · via YouTube
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FloatingHeroGraphics;