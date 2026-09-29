import React from 'react';

export default function ThoughtCard({ thought }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < (thought.rating || 5));

  return (
    <div className="bg-[#1b1b1e] border border-[#f3be65]/20 hover:border-[#f3be65]/40 rounded-xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f3be65]/10 border border-[#f3be65]/30 flex items-center justify-center text-xs font-bold text-[#f3be65]">
              {thought.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#e4e1e5]">{thought.name}</h4>
              <span className="text-[10px] text-[#a3a1a8]">
                {new Date(thought.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
          
          {/* Star rating */}
          <div className="flex text-[#f3be65] text-xs">
            {stars.map((filled, idx) => (
              <span key={idx} className={filled ? 'text-[#f3be65]' : 'text-zinc-600'}>★</span>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#a3a1a8] leading-relaxed italic border-l-2 border-[#f3be65]/40 pl-3 my-3">
          “{thought.message}”
        </p>
      </div>

      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#a3a1a8]/60">
        <span className="uppercase tracking-widest font-mono">Archive Entry</span>
        <span className="text-emerald-400 font-mono">Approved</span>
      </div>
    </div>
  );
}
