
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import WhyChoose from './components/WhyChoose';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  return (
    <div className="min-h-screen relative bg-white">
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Features lang={lang} />
        <WhyChoose lang={lang} />
        <BookingForm />
      </main>
      <Footer lang={lang} />
      {/* Added GeminiAssistant to make the AI feature available on the page */}
      <GeminiAssistant />
    </div>
  );
};

export default App;
