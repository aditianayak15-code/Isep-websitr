import React, { useEffect, useState } from 'react';
import { photosApi, achievementsApi } from '../api/axios';
import PhotoCard from '../components/PhotoCard';

export default function Home({ setActiveTab, onOpenPhotoModal }) {
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    photosApi.getAll().then((res) => {
      setRecentPhotos(res.data.data.slice(0, 3));
    }).catch(() => {});

    achievementsApi.getAll().then((res) => {
      setAchievements(res.data.data.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f3be65]/30 bg-[#f3be65]/5 text-xs text-[#f3be65] font-mono uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-[#f3be65]"></span>
          Inaugural Cohort • Batch 1 (2024)
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#e4e1e5] tracking-tight leading-tight">
          Preserving the Milestones of <br />
          <span className="text-[#f3be65] italic">ISEP Batch 1</span>
        </h1>

        <p className="mt-6 text-sm sm:text-base text-[#a3a1a8] max-w-2xl mx-auto leading-relaxed">
          The permanent web archive documenting the accomplishments, technical sprints, official certifications, and memories of the first batch of the ISEP internship residency.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('gallery')}
            className="px-6 py-3 rounded-xl bg-[#f3be65] text-[#131316] font-semibold text-xs uppercase tracking-wider hover:bg-[#d4a24c] transition-all shadow-[0_0_20px_rgba(243,190,101,0.25)]"
          >
            Explore Photo Gallery
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className="px-6 py-3 rounded-xl bg-[#1b1b1e] border border-[#f3be65]/30 text-[#e4e1e5] font-semibold text-xs uppercase tracking-wider hover:border-[#f3be65] transition-all"
          >
            View Certifications
          </button>
          <button
            onClick={() => setActiveTab('thoughts')}
            className="px-6 py-3 rounded-xl bg-[#1b1b1e] border border-white/10 text-[#a3a1a8] hover:text-[#e4e1e5] font-medium text-xs uppercase tracking-wider transition-all"
          >
            Leave a Reflection
          </button>
        </div>

        {/* Cohort Key Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-[#1b1b1e]/70 border border-[#f3be65]/15 backdrop-blur-sm">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f3be65]">100%</div>
            <div className="text-[11px] text-[#a3a1a8] uppercase tracking-wider mt-1">Graduation Rate</div>
          </div>
          <div className="p-6 rounded-2xl bg-[#1b1b1e]/70 border border-[#f3be65]/15 backdrop-blur-sm">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f3be65]">6</div>
            <div className="text-[11px] text-[#a3a1a8] uppercase tracking-wider mt-1">Capstone Projects</div>
          </div>
          <div className="p-6 rounded-2xl bg-[#1b1b1e]/70 border border-[#f3be65]/15 backdrop-blur-sm">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f3be65]">48h</div>
            <div className="text-[11px] text-[#a3a1a8] uppercase tracking-wider mt-1">Hackathon Sprint</div>
          </div>
          <div className="p-6 rounded-2xl bg-[#1b1b1e]/70 border border-[#f3be65]/15 backdrop-blur-sm">
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f3be65]">Permanent</div>
            <div className="text-[11px] text-[#a3a1a8] uppercase tracking-wider mt-1">Archival Record</div>
          </div>
        </div>
      </section>

      {/* Recent Gallery Highlights */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#f3be65] font-mono">Curated Visuals</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#e4e1e5]">Residency Gallery Highlights</h2>
          </div>
          <button
            onClick={() => setActiveTab('gallery')}
            className="text-xs text-[#f3be65] hover:text-[#d4a24c] font-semibold flex items-center gap-1 group"
          >
            All Photos <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPhotos.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} onOpenModal={onOpenPhotoModal} />
          ))}
        </div>
      </section>

      {/* Program Timeline Snapshot */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#f3be65] font-mono">Program Arc</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#e4e1e5]">Key Achievements & Milestones</h2>
          </div>
          <button
            onClick={() => setActiveTab('achievements')}
            className="text-xs text-[#f3be65] hover:text-[#d4a24c] font-semibold flex items-center gap-1 group"
          >
            Full Timeline <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach) => (
            <div key={ach._id} className="rounded-xl bg-[#1b1b1e] border border-[#f3be65]/20 p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#f3be65]">
                  {new Date(ach.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </span>
                <h3 className="font-serif text-base font-semibold text-[#e4e1e5] mt-1 mb-2">{ach.title}</h3>
                <p className="text-xs text-[#a3a1a8] leading-relaxed">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
