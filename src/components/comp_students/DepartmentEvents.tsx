import React from 'react';

export default function DepartmentEvents() {
  return (
    <section
      id="department-events-section"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-skyblue-300 to-yellow-100 px-4"
    >
      <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full border border-white/20">
        {/* Icon */}
        <div className="text-6xl sm:text-7xl mb-4 animate-bounce">🚧</div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f30] mb-2 drop-shadow-md">
          Under Construction
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#006aff] uppercase tracking-wide">
          Will Be Updated Soon...
        </p>

        {/* Optional CTA */}
        <p className="mt-6 text-sm text-[#0a0f30]/80 italic">
          We&apos;re working hard to bring you the latest updates. Stay tuned!
        </p>
      </div>
    </section>
  );
}
