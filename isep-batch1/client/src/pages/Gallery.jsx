import React, { useEffect, useState } from 'react';
import { photosApi } from '../api/axios';
import PhotoCard from '../components/PhotoCard';

export default function Gallery({ onOpenPhotoModal }) {
  const [photos, setPhotos] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const albums = ['All', 'Events', 'Sessions', 'Team Activities'];

  useEffect(() => {
    setLoading(true);
    photosApi.getAll(selectedAlbum)
      .then((res) => {
        setPhotos(res.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedAlbum]);

  const filteredPhotos = photos.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.caption.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#f3be65]">Archive Pavilion I</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#e4e1e5]">
          ISEP Batch 1 Photo Gallery
        </h1>
        <p className="text-xs sm:text-sm text-[#a3a1a8] leading-relaxed">
          Curated visual records of orientation assemblies, technical deep-dive workshops, 48-hour hackathons, and team milestones.
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] text-[#f3be65] bg-[#f3be65]/10 px-3 py-1 rounded-full border border-[#f3be65]/20">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          View-Only Protected Archive (Direct downloads disabled)
        </div>
      </div>

      {/* Controls: Album Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1b1b1e] p-3 rounded-2xl border border-[#f3be65]/20">
        {/* Album Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedAlbum === album
                  ? 'bg-[#f3be65] text-[#131316] font-semibold shadow-sm'
                  : 'text-[#e4e1e5]/80 hover:text-[#f3be65] hover:bg-[#25252a]'
              }`}
            >
              {album}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search photo captions or titles..."
            className="w-full bg-[#131316] border border-[#f3be65]/20 rounded-xl px-4 py-2 text-xs text-[#e4e1e5] placeholder:text-[#a3a1a8]/50 focus:outline-none focus:border-[#f3be65] transition-colors"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-[#a3a1a8]">Loading archive records...</div>
      ) : filteredPhotos.length === 0 ? (
        <div className="py-20 text-center text-xs text-[#a3a1a8] bg-[#1b1b1e]/50 rounded-2xl border border-white/5">
          No photos found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} onOpenModal={onOpenPhotoModal} />
          ))}
        </div>
      )}
    </div>
  );
}
