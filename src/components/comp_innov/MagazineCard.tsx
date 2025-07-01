import React from 'react';
import Heading from '../Common/heading/Heading';

// PDF File Path
const dept_magazine = "/pdfs/Harmony-2nd_Edition.pdf";

export default function MagazineCard() {

  return (
    <div
      id="magazine-section"
      className="mt-10 px-4 py-12 sm:py-16 bg-gradient-to-br from-[#0f0f27] via-[#2b5766] to-[#2d2c64] rounded-xl shadow-2xl text-center font-poppins"
    >
      <Heading
        subtitle="Optimizing Success, One Metric at a Time"
        title="Performance Metrics: The Annual Report"
        subtitleClass="magazine_subheading"
        titleClass="magazine_heading"
      />

      <div className="relative flex justify-center items-center w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-6 sm:p-10 mt-10">
        {/* iFrame always mounted */}
        <div className="w-full h-[75vh] sm:h-[85vh] rounded-lg overflow-hidden border border-gray-300 shadow-xl bg-white">
          <iframe
            title="Department Magazine"
            src={dept_magazine}
            className="w-full h-full"
            loading="lazy"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
