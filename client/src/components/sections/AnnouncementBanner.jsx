"use client";

import React from 'react';

const AnnouncementBanner = () => {
  return (
    <div className="bg-orange-500 py-3 overflow-hidden relative group">
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="whitespace-nowrap flex animate-marquee hover:pause-marquee">
        <div className="flex items-center gap-12 px-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-white">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest italic">
                ⚡ Spend ₹999+ and unlock a scratch card – win exciting goodies!
              </span>
              <span className="text-sm font-black uppercase tracking-widest italic opacity-50">
                · FARM FRESH DAILY ·
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .pause-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBanner;