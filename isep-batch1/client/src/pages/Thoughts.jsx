import React, { useEffect, useState } from 'react';
import { thoughtsApi } from '../api/axios';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtCard from '../components/ThoughtCard';

export default function Thoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchThoughts = () => {
    setLoading(true);
    thoughtsApi.getApproved()
      .then((res) => {
        setThoughts(res.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#f3be65]">Archive Pavilion IV</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#e4e1e5]">
          Community Thoughts Wall
        </h1>
        <p className="text-xs sm:text-sm text-[#a3a1a8] leading-relaxed">
          Reflections, testimonials, and words of encouragement left by interns, mentors, academic advisors, and visitors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Form */}
        <div className="lg:col-span-5 sticky top-24">
          <ThoughtForm onSubmitted={fetchThoughts} />
        </div>

        {/* Right: Wall of Approved Thoughts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#f3be65]/20">
            <h2 className="font-serif text-xl font-bold text-[#e4e1e5] flex items-center gap-2">
              Public Testimonials
              <span className="text-xs font-mono font-normal text-[#f3be65] bg-[#f3be65]/10 px-2.5 py-0.5 rounded-full border border-[#f3be65]/30">
                {thoughts.length} Approved
              </span>
            </h2>
            <span className="text-[11px] text-[#a3a1a8]">Verified visitor feedback</span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs text-[#a3a1a8]">Loading community thoughts...</div>
          ) : thoughts.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#a3a1a8] bg-[#1b1b1e]/50 rounded-2xl border border-white/5 p-6">
              Be the first to share your thoughts on ISEP Batch 1!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {thoughts.map((thought) => (
                <ThoughtCard key={thought._id} thought={thought} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
