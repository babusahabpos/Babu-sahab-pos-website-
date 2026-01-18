
import React from 'react';
import { translations } from '../translations';

interface FooterProps {
  lang: 'en' | 'bn';
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#121212] py-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                 <img 
                  src="https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/100x100/000000/FACC15?text=SB";
                  }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-red-600 uppercase">BaBu SAHAB</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FACC15] uppercase">Restaurant POS</span>
              </div>
            </div>
            <p className="text-slate-500 max-w-sm mb-6 font-medium">
              {t.footerDesc}
            </p>
          </div>
          <div>
            <h4 className="font-black text-white mb-6 uppercase text-[10px] tracking-[0.2em] border-b-2 border-red-600 w-fit pb-1">{t.footerSolutions}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#FACC15] transition-colors">{lang === 'bn' ? 'মুদি দোকান' : 'Grocery Store'}</a></li>
              <li><a href="#" className="hover:text-[#FACC15] transition-colors">{lang === 'bn' ? 'ফার্মা POS' : 'Pharma POS'}</a></li>
              <li><a href="#" className="hover:text-[#FACC15] transition-colors">{lang === 'bn' ? 'রেস্টুরেন্ট বিলিং' : 'Restaurant Billing'}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-white mb-6 uppercase text-[10px] tracking-[0.2em] border-b-2 border-red-600 w-fit pb-1">{t.footerCompany}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#FACC15] transition-colors">{t.navAbout}</a></li>
              <li><a href="#" className="hover:text-[#FACC15] transition-colors">{lang === 'bn' ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <p>{t.footerCredit}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-red-600 italic">{lang === 'bn' ? 'আধুনিক ব্যবসায়ীদের জন্য তৈরি' : 'Made for Modern Merchants'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
