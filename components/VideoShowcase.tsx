
import React, { useRef, useState, useEffect } from 'react';
import { translations } from '../translations';

interface VideoShowcaseProps {
  lang: 'en' | 'bn';
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ lang }) => {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Using a highly reliable direct link for a restaurant technology demo
  const videoUrl = "https://static.videezy.com/system/resources/previews/000/033/830/original/P1033659.mp4"; 

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => {
            console.error("Play failed", e);
            setIsPlaying(false);
          });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure muted for autoplay to work in modern browsers
      video.muted = true;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay was prevented
            setIsPlaying(false);
          });
      }
    }
  }, []);

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{lang === 'bn' ? 'লাইভ ডেমো ভিডিও' : 'Live Demo Video'}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            {t.cinematicTitle.split(' ').slice(0, -2).join(' ')} <br/>
            <span className="text-[#FACC15]">{t.cinematicTitle.split(' ').slice(-2).join(' ')}</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto font-medium text-sm">
            {lang === 'bn' ? 'আমাদের হাই-স্পিড বিলিং সিস্টেম সরাসরি দেখুন' : 'Experience the speed of our professional billing system'}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto px-4">
          <div 
            onClick={togglePlay}
            className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(239,68,68,0.2)] bg-black group cursor-pointer aspect-video"
          >
            {videoError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="font-bold uppercase tracking-widest text-xs">Video failed to load</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white text-[10px] font-black uppercase rounded-full">Retry</button>
              </div>
            ) : (
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                loop 
                playsInline
                onError={() => setVideoError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Play icon overlay if paused or not playing */}
            {!isPlaying && !videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-500">
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(220,38,38,0.6)] border-4 border-white/20 transform group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="absolute bottom-12 text-center w-full">
                  <p className="text-white font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Click to Watch Demo</p>
                </div>
              </div>
            )}

            {/* Version Badge */}
            <div className="absolute top-8 left-8 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Live System v3.8</span>
            </div>
          </div>
          
          <div className="mt-10 flex flex-col items-center">
            <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-4 hover:bg-white/10 transition-all cursor-default">
              <span className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></span>
              {isPlaying ? (lang === 'bn' ? 'ডেমো চলছে - ক্লিক করলে থামবে' : 'Demo Active - Tap to Pause') : (lang === 'bn' ? 'ডেমো বন্ধ - ক্লিক করলে চলবে' : 'Demo Paused - Tap to Play')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
