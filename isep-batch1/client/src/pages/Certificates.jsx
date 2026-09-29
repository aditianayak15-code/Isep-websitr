import React, { useEffect, useState } from 'react';
import { certsApi } from '../api/axios';
import CertCard from '../components/CertCard';

export default function Certificates({ onInspectCert }) {
  const [certs, setCerts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    certsApi.getAll(search)
      .then((res) => {
        setCerts(res.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#f3be65]">Archive Pavilion II</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#e4e1e5]">
          Certifications & Accreditations
        </h1>
        <p className="text-xs sm:text-sm text-[#a3a1a8] leading-relaxed">
          Official digital registry of completion certificates, special commendations, and technical excellence awards conferred upon ISEP Batch 1 interns.
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] text-[#f3be65] bg-[#f3be65]/10 px-3 py-1 rounded-full border border-[#f3be65]/20">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          Permanent View-Only Previews (No Download Buttons)
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by recipient name or certificate title..."
          className="w-full bg-[#1b1b1e] border border-[#f3be65]/30 rounded-xl px-5 py-3 text-xs text-[#e4e1e5] placeholder:text-[#a3a1a8]/50 focus:outline-none focus:border-[#f3be65] shadow-lg transition-colors"
        />
      </div>

      {/* Certificates Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-[#a3a1a8]">Searching certification records...</div>
      ) : certs.length === 0 ? (
        <div className="py-20 text-center text-xs text-[#a3a1a8] bg-[#1b1b1e]/50 rounded-2xl border border-white/5">
          No certification records found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <CertCard key={cert._id} cert={cert} onInspect={onInspectCert} />
          ))}
        </div>
      )}
    </div>
  );
}
