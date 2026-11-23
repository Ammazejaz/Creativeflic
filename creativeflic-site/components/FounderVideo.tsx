import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface FounderVideoProps {
  videoId: string;
  caption: string;
  isDark: boolean;
}

/**
 * Click-to-load YouTube player. Shows the custom thumbnail first and only
 * loads YouTube's player when the visitor presses play, so the hero stays fast.
 */
const FounderVideo: React.FC<FounderVideoProps> = ({ videoId, caption, isDark }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="max-w-3xl mx-auto">
      <div className={`relative aspect-video rounded-3xl overflow-hidden border ${isDark ? 'border-white/10 shadow-[0_30px_90px_-30px_rgba(37,99,235,0.55)]' : 'border-black/10 shadow-2xl'}`}>
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={caption}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full"
            aria-label={`Play video: ${caption}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="eager"
            />
            <span className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.7)] transition-transform duration-300 group-hover:scale-110">
                <Play size={34} className="ml-1" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className={`mt-3 text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
        {caption} · Sound on
      </figcaption>
    </figure>
  );
};

export default FounderVideo;
