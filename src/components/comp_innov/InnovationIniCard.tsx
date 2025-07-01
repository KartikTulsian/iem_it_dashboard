'use client';

import React, { useState } from 'react';
import { innovation, magazine } from '@/lib/dummydata';
import PublicationCard from './PublicationCard';
import BookCard from './BookCard';
import MagazineCard from './MagazineCard';
import AlumniReportCard from './AlumniReportCard';
import './Innovation.css';
import Image from 'next/image';

interface InnovationItem {
  title: string;
  description: string;
  icon: string;
}

export default function InnovationIniCard() {
  const [selectedItem, setSelectedItem] = useState<InnovationItem | null>(null);

  const handleCardClick = (item: InnovationItem) => {
    setSelectedItem(item);
    setTimeout(() => {
      const detailsSection = document.getElementById('details-section');
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  return (
    <div className="innovation-hub">
      {/* Innovation Hub Section */}
      <h1 className="innovation-heading">Innovation Hub</h1>
      <p className="innovation-subheading">
        Unleashing creativity and transforming ideas into reality through research, development, and technology.
      </p>

      <div className="innovation-container px-4 sm:px-6 md:px-10">
        {innovation.map((item, index) => (
          <div
            key={index}
            className="innovation-card"
            onClick={() => handleCardClick(item)}
          >
            <div className="innovation-icon-container">
              <Image
                width={512}
                height={512}
                src={item.icon}
                alt={item.title || `icon-${index}`}
                className="innovation-icon"
              />
            </div>
            <h2 className="innovation-title">{item.title}</h2>
            <p className="innovation-desc text-white/80 text-sm sm:text-base">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Scholarly Spectrum Section */}
      <h1 className="innovation-heading mt-20">Scholarly Spectrum</h1>
      <p className="innovation-subheading">
        Showcasing innovation, knowledge, and excellence through research, insights, and creative expression.
      </p>

      <div className="innovation-container px-4 sm:px-6 md:px-10">
        {magazine.map((item, index) => (
          <div
            key={index}
            className="innovation-card"
            onClick={() => handleCardClick(item)}
          >
            <div className="innovation-icon-container">
              <Image
                width={512}
                height={512}
                src={item.icon}
                alt={item.title || `mag-icon-${index}`}
                className="innovation-icon"
              />
            </div>
            <h2 className="innovation-title">{item.title}</h2>
            <p className="innovation-desc text-white/80 text-sm sm:text-base">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Details Section */}
      {selectedItem && (
        <div
          id="details-section"
          className="w-full px-4 sm:px-6 md:px-10 mt-12"
        >
          {selectedItem.title === 'Publications' && <PublicationCard />}
          {selectedItem.title === 'Book Chapters' && <BookCard />}
          {selectedItem.title === 'Alumni Report' && <AlumniReportCard />}
          {selectedItem.title === 'Annual Report' && <MagazineCard />}
        </div>
      )}
    </div>
  );
}
