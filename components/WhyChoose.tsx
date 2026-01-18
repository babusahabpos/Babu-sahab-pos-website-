
import React from 'react';
import { translations } from '../translations';

interface WhyChooseProps {
  lang: 'en' | 'bn';
}

const WhyChoose: React.FC<WhyChooseProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="why-choose" className="py-24 bg-[#FFF700] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-4">
            {t.whyTitle}
          </h2>
          <p className="text-slate-700 max-w-xl mx-auto font-bold opacity-80">
            {t.whySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {t.whyPoints.map((point, idx) => (
            <div 
              key={idx} 
              className="bg-black p-8 rounded-3xl border border-white/10 shadow-2xl hover:scale-[1.02] transition-all flex flex-col h-full group"
            >
              <div className="flex items-start gap-5 mb-4">
                <div className="w-14 h-14 bg-transparent text-[#FFF700] border-2 border-[#FFF700] rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 transition-transform">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-[#EF4444] uppercase tracking-tight leading-tight">
                    {point}
                  </h3>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <div className="w-12 h-1.5 bg-[#FFF700] rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -z-0"></div>
    </section>
  );
};

export default WhyChoose;
