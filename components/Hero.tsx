
import React from 'react';
import { translations } from '../translations';

interface HeroProps {
  lang: 'en' | 'bn';
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];
  const dropboxApkUrl = 'https://www.dropbox.com/scl/fi/35jn1ivle2nzhzezyjrdr/babusahabapp3887088-hv1elj-2.apk?rlkey=u3kkk1pymbdqz9q1kvspx5rdv&st=znas4l6s&dl=1';
  const whatsappNumber = '917003548323';
  const whatsappMsg = encodeURIComponent(t.whatsappDemoMsg);

  const downloadApk = () => {
    window.open(dropboxApkUrl, '_blank');
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 mb-8">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            <span className="text-xs font-black text-red-500 uppercase tracking-[0.3em]">{t.heroBadge}</span>
          </div>
          
          <h1 className="text-5xl tracking-tight font-black text-white sm:text-7xl md:text-8xl leading-none uppercase mb-8">
            {t.heroTitle.split('<br/>')[0]} <br/>
            <span className="text-[#FACC15]">{t.heroTitle.split('<br/>')[1] || ''}</span>
          </h1>
          
          <p className="text-lg text-slate-400 sm:text-xl font-medium mb-12 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          <div className="space-y-4">
            {/* Special Offer Section */}
            <div>
              <div className="text-[#EF4444] text-4xl md:text-6xl font-[1000] uppercase tracking-tighter leading-tight">
                {t.heroOffer.split('|')[0].trim()}
              </div>
              <div className="text-[#FFF700] text-3xl md:text-5xl font-[1000] uppercase tracking-tighter leading-tight drop-shadow-[0_0_20px_rgba(255,247,0,0.4)] animate-pulse mt-2">
                {t.heroOffer.split('|')[1].trim()}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center px-10 py-5 text-lg font-black rounded-2xl text-slate-900 bg-[#FACC15] hover:bg-yellow-500 shadow-[0_20px_50px_rgba(250,204,21,0.2)] transition-all uppercase tracking-widest hover:-translate-y-1 active:scale-95"
              >
                {t.demoBtn}
              </a>
              <button 
                onClick={downloadApk}
                className="w-full sm:w-auto flex items-center justify-center px-10 py-5 text-lg font-black rounded-2xl text-white bg-[#EF4444] hover:bg-red-700 shadow-[0_20px_50px_rgba(239,68,68,0.3)] transition-all flex gap-3 uppercase tracking-widest hover:-translate-y-1 active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t.downloadBtn}
              </button>
            </div>
            <p className="mt-8 text-sm text-slate-500 font-bold uppercase tracking-[0.2em]">
              {t.licenseInfo}
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-[#FACC15]/10 rounded-full blur-[100px]"></div>
    </div>
  );
};

export default Hero;
