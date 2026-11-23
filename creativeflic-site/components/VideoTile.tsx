import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoTileProps {
  videoId: string;
  title: string;
  label: string;
  isDark: boolean;
  vertical?: boolean;
}

/** Click-to-load YouTube tile: thumbnail first, player only after play is pressed. */
const VideoTile: React.FC<VideoTileProps> = ({ videoId, title, label, isDark, vertical }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="group h-full">
      <div className={`relative ${vertical ? 'aspect-[9/16]' : 'aspect-video'} rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-neutral-900' : 'border-black/10 bg-neutral-200'}`}>
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full" aria-label={`Play video: ${title}`}>
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${vertical ? 'scale-[1.35] group-hover:scale-[1.4]' : ''}`}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-transform duration-300 group-hover:scale-110">
                <Play size={22} className="ml-0.5" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3">
        <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>{label}</div>
        <div className={`text-sm font-semibold leading-snug ${isDark ? 'text-white' : 'text-neutral-900'}`}>{title}</div>
      </figcaption>
    </figure>
  );
};

export default VideoTile;
