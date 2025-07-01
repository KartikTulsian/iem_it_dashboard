'use client';

import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import PlacementCard from './PlacementCard';
import StudyMaterialsCard from './StudyMaterialsCard';
import StudentAchieveCard from './StudentAchieveCard';
import StudChapterCard from './StudChapterCard';
import { blog } from '@/lib/dummydata';
import './blog.css';
import Heading from '../Common/heading/Heading';
import DepartmentEvents from './DepartmentEvents';
import Image from 'next/image';

export default function Blogcard() {
    const [showPlacemants, setShowPlacements] = useState(false);
    const [showStuChap, setShowStuChap] = useState(false);
    const [showStudMats, setShowStudMats] = useState(false);
    const [showStudAchieve, setShowStudAchieve] = useState(false);
    const [showDeptEvents, setShowDeptEvents] = useState(false);

    const handlePlacementsClick = () => {
        setShowPlacements(true);
        setShowStuChap(false);
        setShowStudAchieve(false);
        setShowStudMats(false);
        setShowDeptEvents(false);
        setTimeout(() => {
            document.getElementById("placement-section")?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    };

    const handleStuChapClick = () => {
        setShowStuChap(true);
        setShowPlacements(false);
        setShowStudAchieve(false);
        setShowStudMats(false);
        setShowDeptEvents(false);
        setTimeout(() => {
            document.getElementById("student-chapter-section")?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    };

    const handleStudMatsClick = () => {
        setShowStuChap(false);
        setShowPlacements(false);
        setShowStudAchieve(false);
        setShowStudMats(true);
        setShowDeptEvents(false);
        setTimeout(() => {
            document.getElementById("materials-section")?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    };

    const handleStudAchieveClick = () => {
        setShowStuChap(false);
        setShowPlacements(false);
        setShowStudMats(false);
        setShowStudAchieve(true);
        setShowDeptEvents(false);
        setTimeout(() => {
            document.getElementById("achievement-section")?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    };

    const handleDeptEventsClick = () => {
        setShowStuChap(false);
        setShowPlacements(false);
        setShowStudMats(false);
        setShowStudAchieve(false);
        setShowDeptEvents(true);
        setTimeout(() => {
            document.getElementById("department-events-section")?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    };

    return (
        <div className="w-full bg-[#f5f7fa] pt-10">
            <section className="blog w-full pt-12">
                {/* Section Heading */}
                <div className="max-w-6xl mx-auto px-4 text-center mb-10">
                    <Heading
                        subtitle="EXPLORE, ENGAGE, EXCEL"
                        title="Our Students: Cultivating Curiosity, Building Brilliance"
                    />
                </div>

                {/* Grid of Cards */}
                <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 max-w-6xl w-full px-4">
                    {blog.map((val, i) => (
                        <div
                            key={i}
                            className="blog-card shadow"
                            onClick={() => {
                                if (val.title === 'Placements') handlePlacementsClick();
                                if (val.title === 'IEM-ICDC') handleStuChapClick();
                                if (val.title === 'Study Materials and Assignments') handleStudMatsClick();
                                if (val.title === 'Students Achievement') handleStudAchieveClick();
                                if (val.title === 'Department Events') handleDeptEventsClick();
                            }}
                            style={{
                                cursor:
                                    val.title === 'Placements' ||
                                        val.title === 'IEM-ICDC' ||
                                        val.title === 'Study Materials and Assignments' ||
                                        val.title === 'Students Achievement' ||
                                        val.title === 'Department Events'
                                        ? 'pointer'
                                        : 'default',
                            }}
                        >
                            <div className="blog-img">
                                <Image width={1000} height={670} src={val.cover} alt={val.title} />
                                <div className="img-overlay"></div>
                            </div>
                            <div className="blog-text">
                                <h1>{val.title}</h1>
                                <p>{val.desc}</p>
                            </div>
                        </div>
                    ))}
                </Container>
            </section>

            {/* Conditional Section Renders */}
            {showPlacemants && <PlacementCard />}
            {showStuChap && <StudChapterCard />}
            {showStudMats && <StudyMaterialsCard />}
            {showStudAchieve && <StudentAchieveCard />}
            {showDeptEvents && <DepartmentEvents />}
        </div>
    );

}
