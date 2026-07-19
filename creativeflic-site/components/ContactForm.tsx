import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

const RevenueOptions = [
  '$1M–$5M annual revenue',
  '$5M–$20M annual revenue',
  '$20M+ annual revenue',
  'Under $1M annual revenue',
  'Prefer not to say'
];

interface ContactFormProps {
    brandBlue: string;
    onSuccess: () => void;
    isDark: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ brandBlue, onSuccess, isDark }) => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyfpxNdT5sPtoIK_E0q6CUtIHQ3be2pp7XUBWIo61omRUVCm1PkQHt3w5sYkpeEl3V-g/exec';

  const [formData, setFormData] = useState({
    NAME: '',
    EMAIL: '',
    URL: '',
    Revenue: RevenueOptions[0],
    Message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorStatus(false);
  };

  const validateForm = () => {
    if (!formData.NAME.trim()) return false;
    if (!formData.EMAIL.trim() || !/^\S+@\S+\.\S+$/.test(formData.EMAIL)) return false;
    if (!formData.URL.trim()) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        alert("Please fill in your name, email, and store URL.");
        return;
    }

    setLoading(true);
    setErrorStatus(false);

    const dataToSend = new FormData();
    dataToSend.append('DATE', new Date().toLocaleString());
    dataToSend.append('NAME', formData.NAME);
    dataToSend.append('EMAIL', formData.EMAIL);
    dataToSend.append('Service_Type', `Free Audit / ${formData.Revenue}`);
    dataToSend.append('Message', `Store/Website: ${formData.URL}\n\n${formData.Message}`);

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: dataToSend,
        mode: 'no-cors'
      });

      onSuccess();
      setFormData({ NAME: '', EMAIL: '', URL: '', Revenue: RevenueOptions[0], Message: '' });

    } catch (error) {
      setErrorStatus(true);
    } finally {
      setLoading(false);
    }
  };

  const containerBg = isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white/90 border-neutral-300 shadow-xl';
  const inputBg = isDark ? 'bg-black/50 border-neutral-800 text-white focus:bg-black/80' : 'bg-white border-neutral-400 text-black focus:bg-neutral-50';
  const labelColor = isDark ? 'text-neutral-500' : 'text-neutral-800';
  const textColor = isDark ? 'text-white' : 'text-neutral-900';

  return (
    <div className={`w-full max-w-3xl mx-auto p-8 md:p-12 rounded-[2rem] border relative overflow-hidden backdrop-blur-md glow-blue ${containerBg}`}>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/15 rounded-full blur-[70px]"></div>

      <div className="text-center mb-8 relative z-10">
        <h3 className={`text-3xl font-bold mb-3 ${textColor}`}>Get Your Free YouTube Revenue Audit</h3>
        <p className="text-neutral-400">Drop your store URL below. Within 48 hours you'll get a 10-minute video teardown of your niche: keywords, competitors, and the first 5 videos to make. No call, no pitch, no obligation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${labelColor}`}>Name</label>
            <input
              type="text"
              name="NAME"
              value={formData.NAME}
              onChange={handleChange}
              placeholder="Ex: Sarah Chen"
              required
              className={`w-full p-4 border rounded-lg placeholder-neutral-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all ${inputBg}`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${labelColor}`}>Work Email</label>
            <input
              type="email"
              name="EMAIL"
              value={formData.EMAIL}
              onChange={handleChange}
              placeholder="Ex: sarah@yourbrand.com"
              required
              className={`w-full p-4 border rounded-lg placeholder-neutral-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all ${inputBg}`}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${labelColor}`}>Store / Website URL</label>
            <input
              type="text"
              name="URL"
              value={formData.URL}
              onChange={handleChange}
              placeholder="Ex: yourbrand.com"
              required
              className={`w-full p-4 border rounded-lg placeholder-neutral-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all ${inputBg}`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${labelColor}`}>Annual Revenue</label>
            <div className="relative">
              <select
                name="Revenue"
                value={formData.Revenue}
                onChange={handleChange}
                required
                className={`w-full p-4 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer ${inputBg}`}
              >
                {RevenueOptions.map(option => (
                  <option key={option} value={option} className={isDark ? "bg-neutral-900 text-white" : "bg-white text-black"}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
           <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${labelColor}`}>What do you sell, and what's working (or not) in your marketing right now? <span className="normal-case font-normal">(optional)</span></label>
           <textarea
            name="Message"
            value={formData.Message}
            onChange={handleChange}
            placeholder="Ex: We sell recovery devices at $180 AOV. Meta ads CAC has doubled this year. Never tried YouTube seriously..."
            rows={4}
            className={`w-full p-4 border rounded-lg placeholder-neutral-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none transition-all ${inputBg}`}
           />
        </div>

        {errorStatus && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <X className="text-red-500 shrink-0" size={20} />
            <p className="text-red-800 dark:text-red-200 text-sm">Something went wrong. Please try again or email us directly.</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 ${brandBlue} text-white font-bold text-lg rounded-full hover:bg-blue-500 transition-all duration-300 tracking-widest flex items-center justify-center gap-2 transform active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : 'shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-1 glow-blue'}`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              <span>Sending...</span>
            </div>
          ) : (
            <>
              Claim My Free Audit <ArrowRight size={20} />
            </>
          )}
        </button>
        <p className={`text-center text-xs ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
          We reply within 24 hours. Audits are limited to 6 per week, first come first served.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
