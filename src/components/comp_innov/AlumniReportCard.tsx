'use client';

import React from 'react';
import Heading from '../Common/heading/Heading';
import { motion } from 'framer-motion';
import Image from 'next/image';

const alumniTalks = [
  { img: '/images/alumni_talk/Slide1.PNG', title: 'Legacy Builders', desc: 'Empowering the next generation with wisdom and experience.' },
  { img: '/images/alumni_talk/Slide2.PNG', title: 'Innovation & Impact', desc: 'Alumni shaping the future with cutting-edge ideas.' },
  { img: '/images/alumni_talk/Slide3.PNG', title: 'Success Stories', desc: 'Celebrating milestones and achievements.' },
  { img: '/images/alumni_talk/Slide4.PNG', title: 'Networking', desc: 'Connecting minds, building opportunities.' },
  { img: '/images/alumni_talk/Slide5.PNG', title: 'Inspiring Journeys', desc: 'Turning dreams into reality.' },
  { img: '/images/alumni_talk/Slide6.PNG', title: 'Future Leaders', desc: 'Shaping tomorrow’s world today.' }
];

export default function AlumniReportCard() {
  return (
    <div
      id="alumni-report-section"
      className="relative mt-10 px-4 py-16 bg-gradient-to-br from-[#1c1e55] via-[#39497a] to-[#302c64] text-center rounded-3xl overflow-hidden"
    >
      <Heading
        title="THE ALUMNI CHRONICLES"
        subtitle="LEGENDS NEVER GRADUATE!"
        titleClass="alumni-heading"
        subtitleClass="alumni-subheading"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-7xl mx-auto">
        {alumniTalks.map((talk, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col justify-between h-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg transition duration-300 ease-in-out hover:shadow-2xl hover:bg-white/20"
          >
            <Image
              width={1280}
              height={720}
              src={talk.img}
              alt={talk.title}
              className="w-full h-[220px] object-cover brightness-90 transition duration-300 ease-in-out hover:brightness-100"
            />
            <div className="p-4 flex-grow flex flex-col justify-between text-center">
              <h3 className="text-lg sm:text-xl font-bold uppercase text-white drop-shadow-md">
                {talk.title}
              </h3>
              <p className="text-md sm:text-lg text-[#f9c74f] mt-2">{talk.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
