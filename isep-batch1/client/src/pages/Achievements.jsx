import React, { useEffect, useState } from 'react';
import { achievementsApi } from '../api/axios';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    achievementsApi.getAll()
      .then((res) => {
        setAchievements(res.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#f3be65]">Archive Pavilion III</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#e4e1e5]">
          Achievements & Milestones
        </h1>
        <p className="text-xs sm:text-sm text-[#a3a1a8] leading-relaxed">
          Chronological record of breakthroughs, intensive bootcamps, community hackathons, and program milestones achieved by ISEP Batch 1.
        </p>
      </div>

      {/* Timeline */}
      {loading ? (
        <div className="py-20 text-center text-xs text-[#a3a1a8]">Loading program milestones...</div>
      ) : (
        <div className="relative border-l-2 border-[#f3be65]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {achievements.map((item, idx) => (
            <div key={item._id || idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#131316] border-2 border-[#f3be65] group-hover:bg-[#f3be65] transition-colors flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f3be65] group-hover:bg-[#131316]"></div>
              </div>

              {/* Card */}
              <div className="bg-[#1b1b1e] border border-[#f3be65]/20 hover:border-[#f3be65]/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-semibold text-[#f3be65] bg-[#f3be65]/10 px-3 py-1 rounded-md border border-[#f3be65]/20 w-fit">
                    {new Date(item.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-[#a3a1a8] tracking-widest">
                    Milestone #{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#e4e1e5] mb-3 group-hover:text-[#f3be65] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#a3a1a8] leading-relaxed">
                  {item.description}
                </p>

                {item.imageUrl && (
                  <div className="mt-6 rounded-xl overflow-hidden aspect-[16/9] max-h-64 border border-white/10 bg-black/40">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
