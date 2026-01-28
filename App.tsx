
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import WhyChoose from './components/WhyChoose';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import GeminiAssistant from './components/GeminiAssistant';
import ReviewSystem from './components/ReviewSystem';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [isAdminView, setIsAdminView] = useState(false);

  // Router logic to show Admin Panel only if URL ends with /#admin
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-black">B</div>
            <span className="font-black uppercase tracking-tighter text-slate-900">Admin Control Panel</span>
          </div>
          <button 
            onClick={() => window.location.hash = ''}
            className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-black transition-all"
          >
            ← Exit Admin
          </button>
        </div>
        <AdminDashboard lang={lang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-white">
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Features lang={lang} />
        <WhyChoose lang={lang} />
        <BookingForm />
        <ReviewSystem lang={lang} />
      </main>
      <Footer lang={lang} />
      <GeminiAssistant />
    </div>
  );
};

export default App;
