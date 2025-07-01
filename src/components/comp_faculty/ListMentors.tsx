'use client';

import React, { useState, useEffect } from 'react';
import './faculty_gen.css';
import { mentorsList } from '@/lib/dummydata';
import Link from 'next/link';
import Image from 'next/image';

// Types
type MenteeData = (string | number)[];

interface Faculty {
  id: string | number;
  title: string;
  desg: string;
  linkedin?: string;
  gscholar?: string;
  img?: string;
  mentees?: { [year: string]: MenteeData[] | undefined };
}

interface FacultyGroup {
  hod?: Faculty[];
  prof?: Faculty[];
  asso_prof?: Faculty[];
  assi_prof?: Faculty[];
}

interface FacultyNodeProps {
  faculty: Faculty;
  onClick: (faculty: Faculty) => void;
}

interface FacultyTreeProps {
  facultyData: FacultyGroup;
  onSelect: (faculty: Faculty) => void;
}

interface MentorModalProps {
  mentor: Faculty | null;
  onClose: () => void;
}

// Faculty card component
const FacultyNode: React.FC<FacultyNodeProps> = ({ faculty, onClick }) => {
  const isHOD = faculty.desg.toLowerCase().includes("head");

  return (
    <div className={`faculty-card group ${isHOD ? "hod-card" : ""}`} onClick={() => onClick(faculty)}>
      <div className="faculty-card__img-container flex items-center justify-center gap-2 lg:gap-0 lg:relative">
        <Image
          width={700}
          height={700}
          src={faculty.img || "/default-profile.png"}
          alt={faculty.title}
          className="w-28 h-28 rounded-full border-4 border-[#7a2fe3] object-cover hover:scale-105 hover:rotate-1 transition"
        />
        <div className="faculty-card__info absolute left-full mx-1  lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:left-[110%] transition-all duration-300">
          {faculty.linkedin && (
            <Link
              href={faculty.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fa-brands fa-linkedin" />
            </Link>
          )}
          {faculty.gscholar && (
            <Link
              href={faculty.gscholar}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fa-brands fa-google-scholar" />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-base md:text-lg font-bold text-gray-800">
          {faculty.title}
        </h3>
        <p className="text-sm text-gray-600 font-medium">{faculty.desg}</p>
      </div>
    </div>
  );
};

// Tree structure component
const FacultyTree: React.FC<FacultyTreeProps> = ({ facultyData, onSelect }) => {
  if (!facultyData || !facultyData.hod) {
    return <div>No faculty data available.</div>;
  }

  return (
    <div className="faculty-tree px-4 sm:px-6 md:px-8" id="mentors-section">
      {/* HOD */}
      {facultyData.hod && facultyData.hod.length > 0 && (
        <div className="tree-group hod-group mb-8">
          <h2 className="text-xl font-semibold text-center mt-4 text-[#7a2fe3]">Head of Department</h2>
          <div className="tree-row flex flex-wrap justify-center gap-6">
            {facultyData.hod.map((hod) => (
              <div key={hod.id} className="tree-node">
                <FacultyNode faculty={hod} onClick={onSelect} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professors */}
      {facultyData.prof && facultyData.prof.length > 0 && (
        <div className="tree-group professor-group mb-8">
          <h2 className="text-xl font-semibold text-center mt-4 text-[#2196f3]">Professors</h2>
          <div className="tree-row flex flex-wrap justify-center gap-6">
            {facultyData.prof.map((prof) => (
              <div key={prof.id} className="tree-node">
                <FacultyNode faculty={prof} onClick={onSelect} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Associate Professors */}
      {facultyData.asso_prof && facultyData.asso_prof.length > 0 && (
        <div className="tree-group associate-prof-group mb-8">
          <h2 className="text-xl font-semibold text-center mt-4 text-[#4caf50]">Associate Professors</h2>
          <div className="tree-row flex flex-wrap justify-center gap-6">
            {facultyData.asso_prof.map((asso) => (
              <div key={asso.id} className="tree-node">
                <FacultyNode faculty={asso} onClick={onSelect} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assistant Professors */}
      {facultyData.assi_prof && facultyData.assi_prof.length > 0 && (
        <div className="tree-group assistant-prof-group-1 mb-8">
          <h2 className="text-xl font-semibold text-center mt-4 text-[#ff9800]">Assistant Professors</h2>
          <div className="tree-row flex flex-wrap justify-center gap-6">
            {facultyData.assi_prof.map((assi) => (
              <div key={assi.id} className="tree-node">
                <FacultyNode faculty={assi} onClick={onSelect} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// Modal for mentor info
const MentorModal: React.FC<MentorModalProps> = ({ mentor, onClose }) => {
  if (!mentor) return null;

  return (
    <div className="mentor-modal" onClick={onClose}>
      <div
        className="mentor-modal-content flex flex-col md:flex-row w-[90%] max-w-[900px] max-h-[80vh] overflow-y-hidden bg-gradient-to-br from-[#fff] to-gray-50 lg:border-4 lg:border-[#7a2fe3] md:border-4 md:border-[#7a2fe3] rounded-xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image - Hidden on small screens */}
        <div className="mentor-left hidden md:flex justify-center items-center flex-1 mb-4 md:mb-0">
          <Image
            width={1700}
            height={1700}
            src={mentor.img || '/default-profile.png'}
            alt={mentor.title}
            className="mentor-img w-[300px] h-[300px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="mentor-right flex-1 px-0 md:px-6">
          <h2 className="text-2xl font-semibold text-gray-800">{mentor.title}</h2>
          <p className="mt-1 text-gray-600 font-medium">{mentor.desg}</p>

          <div className="mentor-links mt-4 mb-6">
            {mentor.linkedin && (
              <Link href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            )}
            {mentor.gscholar && (
              <Link href={mentor.gscholar} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-google-scholar"></i>
              </Link>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-800">Mentees</h3>
          <div className="mentees-container mt-2">
            {mentor.mentees ? (
              Object.entries(mentor.mentees).map(([year, mentees]) =>
                mentees ? (
                  <div key={year} className="mentees-section">
                    <h4>{year}</h4>
                    <ul className='p-0'>
                      {mentees.map(([roll, serial, name]) => (
                        <li key={roll}>
                          {serial}. {name} ({roll})
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )
            ) : (
              <p>No mentees assigned.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

// Main component
const ListMentors: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<Faculty | null>(null);
  const facultyData: FacultyGroup = mentorsList;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedMentor(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="faculty-container py-8 px-4 sm:px-6 lg:px-12">
      <h1 className="faculty-header text-center text-3xl sm:text-4xl font-bold mb-12 py-10 text-[#7a2fe3]">
        IT Mentors List
      </h1>
      <FacultyTree facultyData={facultyData} onSelect={setSelectedMentor} />
      <MentorModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
    </section>
  );
};


export default ListMentors;
