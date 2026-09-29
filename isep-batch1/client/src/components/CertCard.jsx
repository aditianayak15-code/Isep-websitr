import React from 'react';

export default function CertCard({ cert, onInspect }) {
  return (
    <div 
      className="group relative rounded-xl bg-[#1b1b1e] border border-[#f3be65]/20 hover:border-[#f3be65]/60 p-6 transition-all duration-300 shadow-md flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#f3be65]/10 border border-[#f3be65]/30 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-[#f3be65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Verified Record
          </span>
        </div>

        <h3 className="font-serif text-lg font-bold text-[#e4e1e5] group-hover:text-[#f3be65] transition-colors">
          {cert.recipientName}
        </h3>
        <p className="text-xs text-[#f3be65] font-medium tracking-wide mt-1">
          {cert.title}
        </p>

        <div className="mt-4 pt-3 border-t border-white/5 space-y-1 text-xs text-[#a3a1a8]">
          <div className="flex justify-between">
            <span className="text-[#a3a1a8]/60">Cohort:</span>
            <span className="font-mono text-[#e4e1e5]">Batch 1 (2024)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a3a1a8]/60">Conferred:</span>
            <span>{new Date(cert.issueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#f3be65]/15 flex items-center justify-between">
        <span className="text-[10px] text-[#a3a1a8] uppercase tracking-wider flex items-center gap-1">
          <svg className="w-3 h-3 text-[#f3be65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          View-Only Protected
        </span>
        <button
          onClick={() => onInspect(cert)}
          className="text-xs font-semibold text-[#f3be65] hover:text-[#d4a24c] px-3 py-1.5 rounded-lg bg-[#f3be65]/10 hover:bg-[#f3be65]/20 border border-[#f3be65]/30 transition-all"
        >
          Preview Certificate
        </button>
      </div>
    </div>
  );
}
