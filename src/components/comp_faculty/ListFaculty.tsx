import React from "react";
import { itfaculty } from "@/lib/dummydata";
import "./faculty_gen.css";
import Link from "next/link";
import Image from "next/image";

interface FacultyMember {
  id: string;
  title: string;
  desg: string;
  img?: string;
  linkedin?: string;
  gscholar?: string;
}

interface FacultyGroup {
  hod: FacultyMember[];
  faculty: FacultyMember[];
}

// Optional: list of color classes for variety
const colorClasses = [
  "group-color-1",
  "group-color-2",
  "group-color-3",
  "group-color-4",
  "group-color-5",
];

const getRandomColorClass = () => {
  return colorClasses[Math.floor(Math.random() * colorClasses.length)];
};

const FacultyNode: React.FC<{ faculty: FacultyMember }> = ({ faculty }) => {
  const isHOD = faculty.desg.toLowerCase().includes("head");
  const colorClass = getRandomColorClass();

  return (
    <div className={`faculty-card group ${isHOD ? "hod-card" : colorClass}`}>
      <div className="faculty-card__img-container flex items-center justify-center gap-2 lg:gap-0 lg:relative">
        <Image
          width={1700}
          height={1700}
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

const FacultyTree: React.FC<{ facultyData: FacultyGroup }> = ({ facultyData }) => {
  if (!facultyData || !facultyData.hod) {
    return <div>No faculty data available.</div>;
  }

  return (
    <div className="faculty-tree" id="mentors-section">
      {/* HOD */}
      <div className="tree-node root flex justify-center mb-10">
        {facultyData.hod.map((hod) => (
          <div key={hod.id} className="tree-hod">
            <FacultyNode faculty={hod} />
          </div>
        ))}
      </div>

      {/* All Faculty */}
      <div className="faculty-grid w-full flex flex-wrap justify-center gap-6 px-4">
        {facultyData.faculty.map((member) => (
          <div
            key={member.id}
            className="faculty-item w-full sm:w-[48%] md:w-[32%] lg:w-[23%] flex justify-center"
          >
            <FacultyNode faculty={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ListFaculty() {
  const facultyData = itfaculty || {};

  if (!facultyData.hod || !Array.isArray(facultyData.hod)) {
    return <div>Loading faculty data...</div>;
  }

  return (
    <div className="faculty-container" id="faculty-section">
      <h1 className="faculty-header text-2xl md:text-3xl font-bold text-center mb-10 py-10">
        IT Faculty List
      </h1>
      <FacultyTree facultyData={facultyData} />
    </div>
  );
}
