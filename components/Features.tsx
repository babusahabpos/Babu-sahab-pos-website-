
import React from 'react';
import { translations } from '../translations';

interface FeaturesProps {
  lang: 'en' | 'bn';
}

const getFeatures = (lang: 'en' | 'bn') => [
  {
    title: lang === 'bn' ? 'তাত্ক্ষণিক বিলিং' : 'Instant Billing',
    description: lang === 'bn' ? 'সেকেন্ডের মধ্যে ইনভয়েস তৈরি করুন। থার্মাল প্রিন্টিং এবং হোয়াটসঅ্যাপ/ইমেলের মাধ্যমে ডিজিটাল রসিদ সমর্থন করে।' : 'Generate invoices in seconds. Supports thermal printing and digital receipts via WhatsApp/Email.',
    icon: (
      <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: lang === 'bn' ? 'QR মেনু' : 'QR Menu',
    description: lang === 'bn' ? 'আপনার গ্রাহকদের একটি ডিজিটাল মেনু প্রদান করুন। শুধু স্ক্যান করুন এবং অর্ডার করুন।' : 'Provide a digital menu to your customers. Just scan and order, reducing wait times significantly.',
    icon: (
      <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    title: lang === 'bn' ? 'পার্সোনাল অনলাইন স্টোর' : 'Personal Online Store',
    description: lang === 'bn' ? 'আপনার দোকানটি তাৎক্ষণিকভাবে অনলাইনে চালু করুন। কাস্টম স্টোর লিঙ্কের মাধ্যমে সরাসরি অর্ডার নিন।' : 'Launch your shop online instantly. Take orders directly through your own custom store link.',
    icon: (
      <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: lang === 'bn' ? 'মার্কেটিং হাব' : 'Marketing Hub',
    description: lang === 'bn' ? 'ইন্টিগ্রেটেড SMS এবং ইমেল মার্কেটিং টুলের মাধ্যমে আপনার ব্যবসার প্রচার করুন।' : 'Promote your business with integrated SMS and Email marketing tools. Reach your customers where they are.',
    icon: (
      <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.297A1.435 1.435 0 019.209 20.52L3.216 18.127A1.435 1.435 0 012.25 16.793V6.207A1.435 1.435 0 013.216 4.873L9.209 7.266A1.435 1.435 0 0111 5.882zM15 5.882V19.297A1.435 1.435 0 0016.791 20.52L22.784 18.127A1.435 1.435 0 0023.75 16.793V6.207A1.435 1.435 0 0022.784 4.873L16.791 7.266A1.435 1.435 0 0015 5.882zM15 7h.01M15 11h.01M15 15h.01M11 7h.01M11 11h.01M11 15h.01" />
      </svg>
    ),
  },
  {
    title: lang === 'bn' ? 'স্টাফ রিকোয়ারমেন্ট' : 'Staff Requirements',
    description: lang === 'bn' ? 'আপনার ড্যাশবোর্ড থেকে সরাসরি নিয়োগ এবং চাকরির তালিকা পরিচালনা করুন।' : 'Manage hiring and job listings directly from your dashboard. Find the best talent for your shop easily.',
    icon: (
      <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: lang === 'bn' ? 'স্টাফ অ্যাটেনডেন্স' : 'Staff Attendance',
    description: lang === 'bn' ? 'একটি সাধারণ ক্লক-ইন সিস্টেমের মাধ্যমে কর্মচারী কাজের সময় এবং উপস্থিতি ট্র্যাক করুন।' : 'Track employee work hours and attendance accurately with a simple clock-in system.',
    icon: (
      <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const Features: React.FC<FeaturesProps> = ({ lang }) => {
  const t = translations[lang];
  const features = getFeatures(lang);

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-bold text-yellow-600 tracking-wide uppercase">{t.featuresBadge}</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t.featuresTitle}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature, idx) => (
              <div key={idx} className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-yellow-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
