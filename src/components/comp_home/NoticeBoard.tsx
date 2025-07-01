'use client';

import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import moment from 'moment';
import './Notice.css';
import { notices } from '@/lib/dummydata';
import Link from 'next/link';
import Image from 'next/image';

interface Notice {
  id: number;
  img: string;
  user: string;
  desc: string;
  link: string;
}

const breakpointColumns = {
  default: 3,
  1100: 2,
  768: 1,
};

export default function NoticeBoard() {
  const [time, setTime] = useState<string>(moment().format('h:mm:ss A'));
  const [date, setDate] = useState<string>(moment().format('dddd, MMMM Do YYYY'));
  const [selectedImage, setSelectedImage] = useState<Notice | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format('h:mm:ss A'));
      setDate(moment().format('dddd, MMMM Do YYYY'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="noticeboard-container dark">
      <h2 className="notice-title text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        The What&apos;s-Happening-Here Hub
      </h2>

      {/* Date & Time */}
      <div className="noticeboard-header flex flex-col sm:flex-row gap-2 sm:gap-4">
        <span className="text-sm sm:text-base">🕒 {time}</span>
        <span className="text-sm sm:text-base">📅 {date}</span>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-screen-xl">
          <Masonry
            breakpointCols={breakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {notices.map((notice: Notice) => (
              <motion.div
                key={notice.id}
                className="notice-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(notice)}
              >
                <Image width={1600} height={1600} src={notice.img} alt="Notice" className="notice-img" />
                <h3>{notice.user}</h3>
                <p>{notice.desc.length > 400 ? `${notice.desc.substring(0, 400)}...` : notice.desc}</p>
                <Link
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notice-link"
                  data-full-url={notice.link}
                >
                  {notice.link.length > 30 ? `${notice.link.substring(0, 27)}...` : notice.link}
                </Link>
              </motion.div>
            ))}
          </Masonry>
        </div>
      </div>
      {/* Modal for selected image */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} className="close-btn">✖</button>
            <div className="modal-image">
              <Image
                width={1600}
                height={1600}
                src={selectedImage.img}
                alt={selectedImage.user}
                className="full-image"
              />
            </div>
            <div className="modal-details">
              <h2>{selectedImage.user}</h2>
              <p>{selectedImage.desc}</p>
              <Link
                href={selectedImage.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedImage.link}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
