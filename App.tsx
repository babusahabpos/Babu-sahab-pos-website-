
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

  // Simple routing logic using URL hash
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };

    // Check on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-black">B</div>
            <span className="font-black uppercase tracking-tighter text-slate-900">Admin Control</span>
          </div>
          <button 
            onClick={() => window.location.hash = ''}
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors"
          >
            ← Back to Website
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
