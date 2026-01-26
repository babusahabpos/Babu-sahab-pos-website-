
import React, { useState, useEffect } from 'react';
import { DemoRequest } from '../types';

interface AdminDashboardProps {
  lang: 'en' | 'bn';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [downloadCount, setDownloadCount] = useState(0);
  const ADMIN_PIN = "1992";

  useEffect(() => {
    if (isAdmin) {
      loadData();
      const interval = setInterval(loadData, 5000);
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  const loadData = () => {
    const savedRequests = JSON.parse(localStorage.getItem('babu_demo_requests') || '[]');
    const savedDownloads = parseInt(localStorage.getItem('babu_apk_downloads') || '0');
    setRequests(savedRequests);
    setDownloadCount(savedDownloads);
  };

  const handleLogin = () => {
    const pin = prompt(lang === 'bn' ? "অ্যাডমিন পিন দিন:" : "Enter Admin PIN:");
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
    } else if (pin !== null) {
      alert("Wrong PIN!");
    }
  };

  const deleteRequest = (id: string) => {
    const updated = requests.filter(r => r.id !== id);
    setRequests(updated);
    localStorage.setItem('babu_demo_requests', JSON.stringify(updated));
  };

  const completeRequest = (id: string) => {
    const updated = requests.map(r => r.id === id ? { ...r, status: 'completed' as const } : r);
    setRequests(updated);
    localStorage.setItem('babu_demo_requests', JSON.stringify(updated));
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">
            Admin Authentication
          </h2>
          <p className="text-slate-500 mb-8 text-sm font-medium">
            This area is restricted. Please enter your PIN to view download history and requests.
          </p>
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-black transition-all shadow-xl"
          >
            Unlock Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Online</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">BaBu SAHAB <span className="text-red-600">Admin</span></h2>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setIsAdmin(false)} className="px-6 py-3 bg-white border border-slate-200 text-slate-400 text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-slate-50 transition-colors">Lock Panel</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform">
             <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">APK DOWNLOAD HISTORY</p>
          <div className="flex items-baseline gap-2">
            <p className="text-6xl font-black text-[#FACC15]">{downloadCount}</p>
            <span className="text-slate-500 font-bold text-xs">Total Hits</span>
          </div>
          <p className="text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-tighter italic">Last tracked: {new Date().toLocaleTimeString()}</p>
        </div>

        <div className="bg-white border-2 border-slate-100 p-8 rounded-3xl shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Demo Requests</p>
          <p className="text-6xl font-black text-slate-900">{requests.filter(r => r.status === 'pending').length}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            <span className="text-[10px] font-bold text-red-600 uppercase">Action Required</span>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-100 p-8 rounded-3xl shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completed Deals</p>
          <p className="text-6xl font-black text-slate-900">{requests.filter(r => r.status === 'completed').length}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span className="text-[10px] font-bold text-green-600 uppercase">Conversion Rate: {requests.length > 0 ? Math.round((requests.filter(r => r.status === 'completed').length / requests.length) * 100) : 0}%</span>
          </div>
        </div>
      </div>

      {/* Request List */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mb-12">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
           <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Customer Requests Management</h3>
           <button onClick={loadData} className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest hover:bg-blue-100 transition-colors">Refresh Live</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4">Customer Details</th>
                <th className="px-8 py-4">WhatsApp / Device</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold uppercase text-xs">No demo requests yet</td>
                </tr>
              ) : (
                requests.map(request => (
                  <tr key={request.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-900 uppercase text-sm">{request.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{request.email}</p>
                      <p className="text-[9px] text-slate-400 mt-1">{request.date}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-700 text-sm">{request.phone}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{request.device}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${request.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                         {request.status === 'pending' && (
                           <button onClick={() => completeRequest(request.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                           </button>
                         )}
                         <button onClick={() => deleteRequest(request.id)} className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                         </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
