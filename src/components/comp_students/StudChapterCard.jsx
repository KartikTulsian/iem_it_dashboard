import React from 'react';
import Heading from '../Common/heading/Heading';
import Link from 'next/link';
import Image from 'next/image';

export default function StudChapterCard() {
  return (
    <section
      id="student-chapter-section"
      className="relative bg-gradient-to-br from-[#1c1c3c] to-[#3b3b98] py-16 px-4 md:px-8 text-white overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center">
        <Heading
          title="IEM-ICDC 2025"
          subtitle=""
          subtitleClass="chap-subheading"
          titleClass="chap-heading"
        />
        <div className="mt-3 text-xl sm:text-lg lg:text-2xl max-w-3xl mx-auto leading-relaxed">
          3rd International Conference on Computational Intelligence, Data Science and Cloud Computing
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg mt-12 px-4 py-8 sm:p-10 max-w-6xl mx-auto">
        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#ffea00] uppercase mb-10 text-center">
          About IEM-ICDC 2025
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <Image
              src="/images/iem_iete/iem-iete.jpg"
              alt="IEM IETE Forum"
              width={1600}
              height={900}
              className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-5 text-sm sm:text-base leading-relaxed">
            <p>
              The International Conference on Computational Intelligence, Data Science and Cloud Computing is
              an endeavour to spark interest in these domains through research and innovation. As the world embraces
              Industry 4.0, these technologies have become essential across multiple disciplines.
            </p>
            <p>
              This three-day event features keynotes, technical sessions, and workshops in cutting-edge fields such as
              AI, Robotics, NLP, Image Processing, Cloud Computing, Big Data, Cybersecurity, Blockchain, and IoT.
              Researchers and industry professionals are invited to join and make this event a grand success.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Link */}
      <div className="mt-10 text-center">
        <Link
          href="https://iemicdc.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#ffea00] to-[#ff7b00] text-[#222] font-bold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-3.5 rounded-full uppercase tracking-wide shadow-md hover:scale-105 hover:from-[#ff7b00] hover:to-[#ffea00] hover:shadow-xl transition-all duration-300"
        >
          Visit IEM-ICDC Official Website
        </Link>
      </div>
    </section>
  );
}
