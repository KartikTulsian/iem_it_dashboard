'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievements } from '@/lib/dummydata';
import Image from 'next/image';

interface Achievement {
  id: number;
  img: string;
  title: string;
  desc: string;
}

export default function StudentAchieveCard() {
  const [selected, setSelected] = useState<Achievement | null>(null);

  // ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="achievement-section"
      className="min-h-screen w-full bg-gradient-to-br from-[#d8e0ec] via-[#6ad4f8] to-[#094e6b] py-16 px-4 sm:px-8 lg:px-16 text-[#160e53]"
    >
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-4 text-[#0a0f30] drop-shadow-lg">
        Mission Accomplished: Student Edition
      </h2>
      <div className="w-32 h-1 bg-[#160e53] rounded-full mx-auto mb-10"></div>

      {/* Flex Grid */}
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className="flex flex-col bg-white/40 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-[1.03] cursor-pointer max-w-sm w-full sm:basis-[48%] md:basis-[31%]"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelected(achievement)}
          >
            <Image
              width={1600}
              height={1600}
              src={achievement.img}
              alt={achievement.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-[#160e53] flex-1 flex flex-col justify-between">
              <div className="text-xl font-bold mb-2">{achievement.title}</div>
              <p className="text-sm text-justify">
                {achievement.desc.length > 280
                  ? achievement.desc.substring(0, 280) + '...'
                  : achievement.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto md:flex"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-50 text-white text-xl font-bold bg-black/30 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-500 transition"
              >
                &times;
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <Image
                  width={1600}
                  height={1600}
                  src={selected.img}
                  alt={selected.title}
                  className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 text-left">
                <h2 className="text-xl font-bold mb-4">{selected.title}</h2>
                <p className="text-sm leading-relaxed text-justify">{selected.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
