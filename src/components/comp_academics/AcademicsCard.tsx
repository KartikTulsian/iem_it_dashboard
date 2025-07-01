'use client';

import React, { useState } from 'react';
import Heading from '../Common/heading/Heading';
import RoutineCard from './RoutineCard';
import CurriculumCard from './CurriculumCard';
import InfrastructureCard from './InfrastructureCard';
import { homeAbout } from '@/lib/dummydata';
import './academic_card.css';
import Image from 'next/image';

export default function AcademicsCard() {
  const [showRoutine, setShowRoutine] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [showInfrastructure, setShowInfrastructure] = useState(false);

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div>
      <section className="abouthome pt-10 pb-20 px-4 md:px-10">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <Heading subtitle="LEARN ANYTHING" title="Empowering Minds, Shaping Futures" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center justify-center">
          {homeAbout.map((val, i) => (
            <div
              key={i}
              className="item"
              onClick={() => {
                setShowRoutine(val.title === 'Routine');
                setShowCurriculum(val.title === 'Curriculum');
                setShowInfrastructure(val.title === 'Infrastructure');
                scrollToSection(val.title.toLowerCase() + '-section');
              }}
            >
              <div className="img">
                <Image width={512} height={512} src={val.cover} alt={val.title} />
              </div>
              <div className="text">
                <h2>{val.title}</h2>
                <p>{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditional Section Renders */}
      {showRoutine && <RoutineCard />}
      {showCurriculum && <CurriculumCard />}
      {showInfrastructure && <InfrastructureCard />}
    </div>
  );
}
