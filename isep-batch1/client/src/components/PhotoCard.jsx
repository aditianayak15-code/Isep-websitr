import React from 'react';

export default function PhotoCard({ photo, onOpenModal }) {
  return (
    <div 
      className="group relative rounded-xl overflow-hidden bg-[#1b1b1e] border border-[#f3be65]/20 hover:border-[#f3be65]/60 transition-all duration-300 shadow-lg cursor-pointer"
      onClick={() => onOpenModal(photo)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          loading="lazy"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
        
        {/* Album Badge */}
        <div className="absolute top-3 left-3 bg-[#131316]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] uppercase font-semibold tracking-wider text-[#f3be65] border border-[#f3be65]/30">
          {photo.album}
        </div>

        {/* View-Only Indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md text-[10px] text-[#e4e1e5]/80 px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">
          View Only
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-serif text-base font-semibold text-[#e4e1e5] group-hover:text-[#f3be65] transition-colors line-clamp-1">
          {photo.title}
        </h3>
        <p className="text-xs text-[#a3a1a8] mt-1 line-clamp-2 leading-relaxed">
          {photo.caption}
        </p>
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#a3a1a8]">
          <span>{new Date(photo.uploadedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="text-[#f3be65] font-medium text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            Enlarge &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
