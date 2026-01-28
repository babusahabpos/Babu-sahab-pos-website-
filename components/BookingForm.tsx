
import React, { useState } from 'react';
import { BookingData, DemoRequest } from '../types';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    device: 'Android (Recommended)'
  });
  const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form');
  
  // Updated Google Drive direct download link
  const apkDownloadUrl = 'https://drive.google.com/uc?export=download&id=1GHJ8WLe6MCzeBegvr_6p0qTkfe8rX4dJ';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');

    // Simulate saving demo request to "admin panel" (localStorage for now)
    try {
      const newRequest: DemoRequest = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        device: formData.device,
        date: new Date().toLocaleString(),
        status: 'pending'
      };

      const existingRequests = JSON.parse(localStorage.getItem('babu_demo_requests') || '[]');
      localStorage.setItem('babu_demo_requests', JSON.stringify([newRequest, ...existingRequests]));

      // Simulating secure processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStep('success');
    } catch (error) {
      console.error("Submission failed", error);
      setStep('form');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerDownload = () => {
    // Track download history from form success page
    const currentDownloads = parseInt(localStorage.getItem('babu_apk_downloads') || '0');
    localStorage.setItem('babu_apk_downloads', (currentDownloads + 1).toString());
    
    window.open(apkDownloadUrl, '_blank');
  };

  if (step === 'submitting') {
    return (
      <div className="bg-[#121212] py-32 flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-xl font-bold text-white uppercase tracking-widest">Processing Secure Request...</h3>
          <p className="text-slate-500 mt-2">আপনার তথ্য সুরক্ষিতভাবে অ্যাডমিন প্যানেলে পাঠানো হচ্ছে।</p>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl text-center border border-yellow-100 max-w-xl mx-auto my-20 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-green-100">
          <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Request Sent!</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          ধন্যবাদ! আপনার শপ রেজিস্ট্রেশন তথ্য অ্যাডমিনের কাছে পাঠানো হয়েছে। <br/>
          অ্যাডমিন খুব শীঘ্রই আপনার হোয়াটসঅ্যাপে যোগাযোগ করবেন। এখন আপনি নিচে থেকে <b>Official APK</b> ডাউনলোড করতে পারেন।
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={triggerDownload}
            className="w-full bg-red-600 text-white font-black py-5 rounded-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-red-200 uppercase tracking-widest"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2.5"/></svg>
            Download Official APK
          </button>
          
          <button 
            onClick={() => setStep('form')}
            className="text-slate-400 text-xs font-bold hover:text-red-600 uppercase tracking-widest transition-colors"
          >
            Register Another Business
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="booking" className="py-24 bg-[#121212] text-white overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-red-600/10 border border-red-600/20 mb-6">
              <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Direct Admin Connection</span>
            </div>
            <h2 className="text-4xl font-[1000] sm:text-6xl mb-8 uppercase tracking-tighter leading-none">
              Get Your <br/> <span className="text-yellow-400">POS Demo</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
              আপনার তথ্য সরাসরি আমাদের সেন্ট্রাল অ্যাডমিন প্যানেলে পাঠানো হবে। সাবমিট করার সাথে সাথেই অ্যাডমিন আপনার রিকোয়েস্ট দেখতে পাবেন।
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-2xl font-black text-yellow-400">Online</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time Connection</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-2xl font-black text-red-500">Sync</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin App Notification</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-yellow-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl">
              <h3 className="text-2xl font-black text-slate-900 mb-8 text-center uppercase tracking-tighter">Request Demo Access</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">Owner Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-slate-900 focus:border-yellow-400 transition-all outline-none font-bold"
                      placeholder="Enter Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">Business Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-slate-900 focus:border-yellow-400 transition-all outline-none font-bold"
                      placeholder="shop@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">WhatsApp No.</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-slate-900 focus:border-yellow-400 transition-all outline-none font-bold"
                        placeholder="+91..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">Device Type</label>
                      <select
                        name="device"
                        value={formData.device}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-slate-900 focus:border-yellow-400 transition-all outline-none font-bold appearance-none cursor-pointer"
                      >
                        <option>Android (Recommended)</option>
                        <option>Windows POS</option>
                        <option>Tablet</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-2xl transition-all flex items-center justify-center space-x-3 uppercase tracking-widest group/btn"
                  >
                    <span>Submit Request to Admin</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  <p className="text-center text-[9px] text-slate-400 mt-4 uppercase font-bold tracking-widest">
                    🚀 Instantly synced with admin dashboard
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
