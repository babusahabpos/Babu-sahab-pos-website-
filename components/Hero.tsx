
import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Review } from '../types';

interface HeroProps {
  lang: 'en' | 'bn';
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];
  const dropboxApkUrl = 'https://www.dropbox.com/scl/fi/35jn1ivle2nzhzezyjrdr/babusahabapp3887088-hv1elj-2.apk?rlkey=u3kkk1pymbdqz9q1kvspx5rdv&st=znas4l6s&dl=1';
  const whatsappNumber = '917003548323';
  const whatsappMsg = encodeURIComponent(t.whatsappDemoMsg);
  
  const [stats, setStats] = useState({ avg: 4.8, total: 120 });

  useEffect(() => {
    const updateStats = () => {
      const saved = localStorage.getItem('babu_pos_reviews');
      if (saved) {
        const reviews: Review[] = JSON.parse(saved);
        if (reviews.length > 0) {
          const totalStars = reviews.reduce((acc, curr) => acc + curr.rating, 0);
          setStats({
            avg: parseFloat((totalStars / reviews.length).toFixed(1)),
            total: reviews.length
          });
        }
      }
    };
    
    updateStats();
    // Listen for storage changes in same window (custom event or simple poll)
    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const downloadApk = () => {
    window.open(dropboxApkUrl, '_blank');
  };

  const scrollToReviews = () => {
    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-[#121212]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-[#FACC15]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 mb-8">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">{t.heroBadge}</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl tracking-tight font-black text-white sm:text-7xl md:text-8xl leading-none uppercase mb-10">
            {lang === 'bn' ? 'আপনার রেস্টুরেন্টকে' : 'Speed Up Your'} <br/>
            <span className="text-[#FACC15]">{lang === 'bn' ? 'করুন দ্রুত' : 'Restaurant'}</span>
          </h1>
          
          {/* Special Offer Text */}
          <div className="mb-12 flex flex-col items-center">
            <div className="text-[#EF4444] text-4xl md:text-7xl font-[1000] uppercase tracking-tighter leading-none">
              {t.heroOffer.split('|')[0].trim()}
            </div>
            <div className="text-[#FFF700] text-3xl md:text-5xl font-[1000] uppercase tracking-tighter leading-none mt-2 lemon-yellow-glow animate-pulse">
              {t.heroOffer.split('|')[1].trim()}
            </div>
          </div>
          
          <p className="text-lg text-slate-400 sm:text-xl font-medium mb-12 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full">
              {/* WhatsApp Demo Button */}
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center px-12 py-6 text-xl font-black rounded-3xl text-slate-900 bg-[#FACC15] hover:bg-yellow-500 shadow-[0_20px_50px_rgba(250,204,21,0.2)] transition-all uppercase tracking-widest hover:-translate-y-1 active:scale-95"
              >
                {t.demoBtn}
              </a>

              {/* Red Download APK Button */}
              <button 
                onClick={downloadApk}
                className="w-full sm:w-auto flex items-center justify-center px-12 py-6 text-xl font-black rounded-3xl text-white bg-[#EF4444] hover:bg-red-700 shadow-[0_20px_50px_rgba(239,68,68,0.3)] transition-all flex gap-3 uppercase tracking-widest hover:-translate-y-1 active:scale-95"
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t.downloadBtn}
              </button>
            </div>

            {/* NEW: Review Button with Stats */}
            <button 
              onClick={scrollToReviews}
              className="flex items-center gap-4 bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 rounded-2xl transition-all group"
            >
              <div className="flex text-[#FFF700] text-xl">
                {'★'.repeat(Math.floor(stats.avg))}
                {stats.avg % 1 !== 0 && '½'}
              </div>
              <div className="text-left">
                <p className="text-white font-black text-sm uppercase tracking-widest">{stats.avg}/5 {t.reviewBtnLabel}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">From {stats.total} total customers</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="mt-10 text-xs text-slate-500 font-bold uppercase tracking-[0.3em]">
            {t.licenseInfo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
