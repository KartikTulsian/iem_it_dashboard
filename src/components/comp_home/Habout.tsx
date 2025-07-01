'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Container } from 'react-bootstrap';
import './homePart.css';
import { deptCard } from '@/lib/dummydata';
import Heading from '../Common/heading/Heading';
import Image from 'next/image';

export default function Habout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: parseInt(savedPosition, 10), behavior: 'instant' });
      });
    }
  }, [pathname]);

  const handleExplore = (deptName: string): void => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());

    switch (deptName) {
      case 'CAMPUS':
        router.push('/about');
        break;
      case 'PLACEMENT':
        router.push('/students');
        break;
      case 'FACULTY':
        router.push('/faculty');
        break;
      case 'DIGITAL LIBRARY':
        window.open('https://iemgurukul-opac.l2c2.co.in/', '_blank');
        break;
    }
  };

  return (
    <section className="homeabout py-11">
      <Container className='head_home_about'>
        <Heading subtitle="our branch" title="explore our department" />

        <div className="coursescard mt-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deptCard.map((val, i) => (
              <div
                key={i}
                className="card bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center"
              >
                <div className="icon_img w-20 h-20 rounded-full bg-violet-700 flex items-center justify-center mx-auto mb-4">
                  <Image
                    width={512}
                    height={512}
                    src={val.cover}
                    alt={val.deptName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h1 className="text-lg md:text-xl font-bold mb-2">{val.deptName}</h1>
                <p className="text-sm md:text-base text-gray-600 mb-4 text-justify">{val.desc}</p>
                <button
                  onClick={() => handleExplore(val.deptName)}
                  className="explore-btn border-2 border-violet-700 text-violet-700 px-4 py-2 text-sm font-semibold uppercase rounded-md transition-all duration-300 hover:bg-violet-700 hover:text-white"
                >
                  Explore !
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
