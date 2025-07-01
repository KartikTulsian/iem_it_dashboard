'use client';

import React, { useEffect, useState } from 'react';
import Stack from '@/components/Components/Stack/Stack';
import Heading from '../heading/Heading';
import './Hero.css';
import Carousel, { CarouselItem } from '@/components/Components/Carousel/Carousel';
import Link from 'next/link';

type ImageItem = {
  id: number;
  img: string;
  title: string;
};

export default function Hero() {
  const images: ImageItem[] = [
    { id: 1, img: '../images/bg_1.jpg', title: 'IEM HACKOASIS 1.0' },
    { id: 2, img: '../images/bg_2.JPG', title: 'IEM HACKOASIS 1.0' },
    { id: 3, img: '../images/bg_3.JPG', title: 'IEM HACKOASIS 1.0' },
    { id: 4, img: '../images/bg_4.JPG', title: 'IEM HACKOASIS 1.0' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  const carouselItems: CarouselItem[] = images.map((image) => ({
    id: image.id,
    title: image.title,
    description: '',
    image: image.img,
  }));

  const [carouselWidth, setCarouselWidth] = useState(360);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setCarouselWidth(500); // md+
      } else if (width >= 640) {
        setCarouselWidth(420); // sm
      } else {
        setCarouselWidth(360); // base
      }
    };

    handleResize(); // set on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="hero relative text-white overflow-hidden bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-screen px-4 md:px-8">
      <div className="max-w-7xl w-full py-8 md:py-12 lg:pb-16 lg:pt-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Section */}
          <div className="desc_hero w-full lg:w-1/2 bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-6 sm:p-8 transition-all hover:translate-y-[-5px]">
            <Heading
              subtitle="EXPLORE, LEARN, INNOVATE"
              title="Empowering Future IT Leaders"
            />
            <p className="mt-1 text-base md:text-lg text-[#f3f3f3] leading-relaxed">
              Dive into a world of cutting-edge technology, where innovation meets knowledge! The Department of IT
              welcomes you to an immersive learning experience—designed to sharpen your skills, fuel your creativity,
              and prepare you for the digital revolution.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:justify-start">
              <Link href="/sign-in" className="primary-btn">
                STUDENT'S CORNER<i className="fa fa-long-arrow-alt-right ml-2" />
              </Link>
              <Link href="/about" className="secondary-btn">
                NOW MORE <i className="fa fa-long-arrow-alt-right ml-2" />
              </Link>
            </div>
          </div>

          {/* Right Section - Large: Stack | Medium/Small: Image Carousel */}
          <div className="w-full lg:w-1/2 flex justify-center sm:justify-end">
            {/* Stack on large screens */}
            <div className="hidden lg:block w-full px-4 sm:px-0 mx-auto sm:ml-4 sm:mr-6 max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
              <Stack
                randomRotation={true}
                sensitivity={150}
                sendToBackOnClick={false}
                cardDimensions={{ width: 700, height: 500 }}
                cardsData={images}
              />
            </div>

            {/* Carousel on small/medium screens */}
            {/* <div className="block lg:hidden w-full px-4 sm:px-0 mx-auto sm:ml-4 sm:mr-6 max-w-full sm:max-w-[500px]">
              <img
                src={images[currentImageIndex].img}
                alt={`Slide ${currentImageIndex + 1}`}
                className="w-full h-auto rounded-xl shadow-lg transition-all duration-4000"
              />
            </div> */}
            <div
              className="block lg:hidden w-full justify-center px-4 sm:px-6 md:px-8"
            >
              <div style={{ width: `${carouselWidth}px` }}>
                <Carousel
                  items={carouselItems}
                  baseWidth={carouselWidth}
                  autoplay={true}
                  autoplayDelay={4000}
                  pauseOnHover={false}
                  loop={true}
                  round={false}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
