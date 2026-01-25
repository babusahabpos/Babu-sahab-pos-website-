
import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Review, ReviewReply } from '../types';

interface ReviewSystemProps {
  lang: 'en' | 'bn';
  onReviewsChange?: (reviews: Review[]) => void;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ lang, onReviewsChange }) => {
  const t = translations[lang];
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ userName: '', rating: 5, comment: '' });
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const savedReviews = localStorage.getItem('babu_pos_reviews');
    if (savedReviews) {
      const parsed = JSON.parse(savedReviews);
      setReviews(parsed);
      onReviewsChange?.(parsed);
    } else {
      // Default initial review
      const initial = [{
        id: '1',
        userName: 'Sabbir Ahmed',
        rating: 5,
        comment: lang === 'bn' ? 'অসাধারণ অ্যাপ! বিলিং অনেক ফাস্ট।' : 'Amazing app! Billing is very fast.',
        date: new Date().toLocaleDateString(),
        replies: []
      }];
      setReviews(initial);
      onReviewsChange?.(initial);
    }
  }, []);

  const saveReviews = (updated: Review[]) => {
    setReviews(updated);
    localStorage.setItem('babu_pos_reviews', JSON.stringify(updated));
    onReviewsChange?.(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userName || !formData.comment) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userName: formData.userName,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toLocaleDateString(),
      replies: []
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);
    setFormData({ userName: '', rating: 5, comment: '' });
    setShowForm(false);
  };

  const handleReply = (reviewId: string) => {
    const text = replyText[reviewId];
    if (!text?.trim()) return;

    const newReply: ReviewReply = {
      id: Date.now().toString(),
      author: 'Admin',
      text: text,
      date: new Date().toLocaleDateString()
    };

    const updated = reviews.map(r => {
      if (r.id === reviewId) {
        return { ...r, replies: [...r.replies, newReply] };
      }
      return r;
    });

    saveReviews(updated);
    setReplyText({ ...replyText, [reviewId]: '' });
  };

  return (
    <section id="reviews" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">{t.reviewBtnLabel}</h2>
            <p className="text-slate-500 font-bold mt-2 uppercase text-xs tracking-widest">See what our customers say</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-4 bg-[#EF4444] text-white font-black rounded-2xl hover:bg-red-700 transition-all uppercase tracking-widest shadow-xl shadow-red-200"
          >
            {showForm ? 'Cancel' : t.writeReview}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-red-100 mb-12 animate-in slide-in-from-top-4 duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{t.namePlaceholder}</label>
                  <input 
                    required
                    type="text"
                    value={formData.userName}
                    onChange={e => setFormData({...formData, userName: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-red-500 outline-none text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{t.ratingLabel}</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className={`text-2xl transition-transform hover:scale-125 ${formData.rating >= star ? 'text-[#FFF700]' : 'text-slate-200'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{t.commentPlaceholder}</label>
                <textarea 
                  required
                  value={formData.comment}
                  onChange={e => setFormData({...formData, comment: e.target.value})}
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-red-500 outline-none text-slate-900 font-bold resize-none"
                />
              </div>
              <button type="submit" className="w-full py-5 bg-black text-white font-black rounded-xl uppercase tracking-widest hover:bg-slate-800 transition-all">
                {t.submitReview}
              </button>
            </form>
          </div>
        )}

        <div className="space-y-8">
          {reviews.map(review => (
            <div key={review.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">{review.userName}</h4>
                  <div className="flex text-[#FFF700] text-sm mt-1">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.date}</span>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">{review.comment}</p>
              
              {/* Replies */}
              {review.replies.length > 0 && (
                <div className="mt-6 space-y-4 pl-6 border-l-4 border-red-500">
                  {review.replies.map(reply => (
                    <div key={reply.id} className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-red-600 text-xs uppercase tracking-widest">{reply.author}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{reply.date}</span>
                      </div>
                      <p className="text-sm text-slate-700 font-medium">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              <div className="mt-6 flex gap-2">
                <input 
                  type="text"
                  placeholder={t.replyBtn + "..."}
                  value={replyText[review.id] || ''}
                  onChange={e => setReplyText({...replyText, [review.id]: e.target.value})}
                  className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-sm text-slate-900 outline-none focus:ring-1 focus:ring-red-400"
                />
                <button 
                  onClick={() => handleReply(review.id)}
                  className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-xl hover:bg-black transition-colors"
                >
                  {t.replyBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSystem;
