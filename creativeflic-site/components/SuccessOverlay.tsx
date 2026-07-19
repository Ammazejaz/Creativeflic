import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import Reveal from './Reveal';

interface SuccessOverlayProps {
    isVisible: boolean;
    onClose: () => void;
}

const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-700 animate-in fade-in">
             <div className="text-center max-w-4xl px-6">
                <Reveal delay={0}><CheckCircle size={80} className="text-blue-400 mx-auto mb-8 animate-pulse-slow glow-blue" /></Reveal>
                <Reveal delay={100}><h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">BRIEF RECEIVED!</h2></Reveal>
                <Reveal delay={300}>
                    <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-xl glow-blue">
                        <Clock size={24} /> <span className="uppercase tracking-wide">Next steps in 24 hours</span>
                    </div>
                </Reveal>
                <Reveal delay={500}><p className="mt-8 text-neutral-400 text-xl max-w-xl mx-auto">Thank you for reaching out. We are reviewing your project details now and will contact you directly within one business day.</p></Reveal>
                <Reveal delay={700}><button onClick={onClose} className="mt-12 px-8 py-3 border border-white/20 text-white hover:border-blue-400 hover:text-blue-400 transition-colors duration-300 uppercase tracking-widest font-bold text-sm rounded-sm">Return to Site</button></Reveal>
            </div>
        </div>
    );
}

export default SuccessOverlay;