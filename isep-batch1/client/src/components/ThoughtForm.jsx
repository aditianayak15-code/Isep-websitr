import React, { useState } from 'react';
import { thoughtsApi } from '../api/axios';

export default function ThoughtForm({ onSubmitted }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      await thoughtsApi.submit({
        name: name.trim(),
        message: message.trim(),
        rating
      });

      setFeedback({
        type: 'success',
        text: 'Thank you! Your reflection has been recorded and submitted for moderator review.'
      });
      setName('');
      setMessage('');
      setRating(5);
      if (onSubmitted) onSubmitted();
    } catch (err) {
      setFeedback({
        type: 'error',
        text: 'Submission failed. Please try again later.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1b1b1e] border border-[#f3be65]/20 rounded-2xl p-6 sm:p-8 shadow-xl">
      <h3 className="font-serif text-xl font-bold text-[#e4e1e5] mb-2">Leave Your Reflection</h3>
      <p className="text-xs text-[#a3a1a8] mb-6">
        Share your experience, memories, or words of encouragement for the inaugural ISEP Batch 1 cohort.
      </p>

      {feedback && (
        <div className={`p-4 rounded-xl text-xs mb-6 ${
          feedback.type === 'success' 
            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' 
            : 'bg-red-500/10 text-red-300 border border-red-500/30'
        }`}>
          {feedback.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#a3a1a8] font-medium mb-1">
            Your Full Name or Handle *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aditi Sharma or Alumni Visitor"
            className="w-full bg-[#131316] border border-[#f3be65]/20 rounded-lg px-4 py-2.5 text-sm text-[#e4e1e5] placeholder:text-[#a3a1a8]/40 focus:outline-none focus:border-[#f3be65] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#a3a1a8] font-medium mb-1">
            Program Experience Rating
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition-transform hover:scale-110 ${
                  star <= rating ? 'text-[#f3be65]' : 'text-zinc-600'
                }`}
              >
                ★
              </button>
            ))}
            <span className="text-xs font-mono text-[#a3a1a8] ml-2">
              {rating} of 5 Stars
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#a3a1a8] font-medium mb-1">
            Your Thought or Message *
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your impressions, project feedback, or well-wishes..."
            className="w-full bg-[#131316] border border-[#f3be65]/20 rounded-lg px-4 py-2.5 text-sm text-[#e4e1e5] placeholder:text-[#a3a1a8]/40 focus:outline-none focus:border-[#f3be65] transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-6 rounded-lg bg-[#f3be65] hover:bg-[#d4a24c] text-[#131316] font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-md"
        >
          {submitting ? 'Submitting...' : 'Post Thought to Archive'}
        </button>

        <p className="text-[11px] text-center text-[#a3a1a8]/60 mt-2">
          Submissions are automatically held in moderation until verified by coordinators.
        </p>
      </div>
    </form>
  );
}
