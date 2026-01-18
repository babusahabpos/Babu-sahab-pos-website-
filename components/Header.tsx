
import React from 'react';
import { translations } from '../translations';

interface HeaderProps {
  lang: 'en' | 'bn';
  setLang: (l: 'en' | 'bn') => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = translations[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
              <img 
                src="https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/100x100/000000/FACC15?text=SB";
                }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter text-[#EF4444] uppercase">BaBu SAHAB</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#FACC15] uppercase">Restaurant POS</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-10">
            <a href="#features" className="text-slate-600 hover:text-red-600 font-black text-[10px] uppercase tracking-widest transition-colors">{t.navFeatures}</a>
            <a href="#why-choose" className="text-slate-600 hover:text-red-600 font-black text-[10px] uppercase tracking-widest transition-colors">{t.navAbout}</a>
          </nav>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLang('bn')}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${lang === 'bn' ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              বাংলা
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
