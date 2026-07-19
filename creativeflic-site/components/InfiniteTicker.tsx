import React from 'react';

const stats = [
    { value: '$5.5M', label: 'Client Revenue Scaled' },
    { value: '50M+', label: 'Views Generated' },
    { value: '100K+', label: 'Subscribers Built' },
    { value: '1M+', label: 'View Videos Produced' },
];

const InfiniteTicker = ({ isDark }: { isDark: boolean }) => {
    return (
        <div className={`overflow-hidden relative border-y ${isDark ? 'border-white/8 bg-white/[0.015]' : 'border-black/8 bg-black/[0.015]'}`}>
            <div className={`animate-marquee whitespace-nowrap py-5 flex w-max items-center text-[11px] font-semibold uppercase tracking-[0.3em] ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="flex items-center">
                        {stats.map((stat, j) => (
                            <React.Fragment key={j}>
                                <span className="flex items-baseline gap-2.5 px-8">
                                    <span className={`text-sm font-bold tracking-normal ${isDark ? 'text-white' : 'text-neutral-900'}`}>{stat.value}</span>
                                    {stat.label}
                                </span>
                                <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-yellow-400/70' : 'bg-yellow-500'}`}></span>
                            </React.Fragment>
                        ))}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default InfiniteTicker;
