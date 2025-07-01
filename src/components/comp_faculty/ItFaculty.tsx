"use client";

import React, { useState } from "react";
import { itprogfaculty } from "@/lib/dummydata";
import "./faculty_gen.css";
import ListMentors from "./ListMentors";
import ListFaculty from "./ListFaculty";
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
  incharge1?: FacultyMember[];
  incharge2?: FacultyMember[];
}

const FacultyNode: React.FC<{ faculty: FacultyMember }> = ({ faculty }) => (
  <div className="faculty-card group w-full max-w-[280px] md:max-w-[240px] flex flex-col items-center text-center hover:shadow-xl">
    <div className="faculty-card__img-container flex items-center justify-center gap-2 lg:relative">
      <Image
        width={1700}
        height={1700}
        src={faculty.img || "/default-profile.png"}
        alt={faculty.title}
        className="w-28 h-28 rounded-full border-4 border-[#7a2fe3] object-cover hover:scale-105 hover:rotate-1 transition"
      />
      <div
        className="faculty-card__info flex flex-col gap-2 
          absolute left-full ml-2
          lg:absolute lg:top-[50%] lg:left-full lg:-translate-y-1/2 
          lg:opacity-0 lg:invisible lg:ml-0
          lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:left-[110%] 
          transition-all duration-300"
      >
        {faculty.linkedin && (
          <Link href={faculty.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fa-brands fa-linkedin" />
          </Link>
        )}
        {faculty.gscholar && (
          <Link href={faculty.gscholar} target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fa-brands fa-google-scholar" />
          </Link>
        )}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-base md:text-lg font-bold text-gray-800">{faculty.title}</h3>
      <p className="text-sm text-gray-600 font-medium">{faculty.desg}</p>
    </div>
  </div>
);


const FacultyTree: React.FC<{ facultyData: FacultyGroup }> = ({ facultyData }) => {
  if (!facultyData?.hod) return <div>No faculty data available.</div>;

  return (
    <div className="faculty-tree w-full px-4 sm:px-8 lg:px-20">
      {/* HOD */}
      <div className="mb-10 flex justify-center flex-wrap gap-6">
        {facultyData.hod.map((hod) => (
          <FacultyNode key={hod.id} faculty={hod} />
        ))}
      </div>

      {/* Incharges */}
      <div className="flex flex-col md:flex-row justify-center gap-10 flex-wrap">
        {[facultyData.incharge1, facultyData.incharge2]
          .filter(Array.isArray)
          .map((group, index) => {
            const groupClass = ["professor-group", "associate-prof-group"][index] || "";
            return (
              <div key={index} className={`tree-group ${groupClass} flex flex-wrap justify-center gap-6`}>
                {group?.map((member) => (
                  <FacultyNode key={member.id} faculty={member} />
                ))}
              </div>
            );
          })}
      </div>
    </div>

  );
};

const facultylistselect = ["it_mentors_list", "it_faculty_list"];

export default function ItFaculty() {
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [showMentors, setShowMentors] = useState(false);
  const [showFaculty, setShowFaculty] = useState(false);

  const handleMentorList = () => {
    setShowMentors(true);
    setShowFaculty(false);
    setSelectedList(facultylistselect[0]);
    setTimeout(() => {
      document.getElementById("mentors-section")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleFacultyList = () => {
    setShowFaculty(true);
    setShowMentors(false);
    setSelectedList(facultylistselect[1]);
    setTimeout(() => {
      document.getElementById("faculty-section")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const facultyData: FacultyGroup = itprogfaculty;

  return (
    <div className="faculty-container py-20 bg-gray-50">
      <h1 className="faculty-header text-3xl md:text-4xl font-bold text-[#7a2fe3] text-center mb-4">
        Program Information Technology
      </h1>

      <FacultyTree facultyData={facultyData} />

      {/* Chapter Buttons */}
      <div className="chapter-buttons flex flex-wrap justify-center gap-4 mt-10">
        <button
          onClick={handleMentorList}
          className={`px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200 border-2 ${
            selectedList === facultylistselect[0]
              ? "bg-[#7a2fe3] text-[#fff] border-[#7a2fe3]"
              : "bg-[#fff] text-[#7a2fe3] border-[#7a2fe3]"
          } hover:scale-105`}
        >
          IT MENTORS LIST
        </button>
        <button
          onClick={handleFacultyList}
          className={`px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200 border-2 ${
            selectedList === facultylistselect[1]
              ? "bg-[#7a2fe3] text-[#fff] border-[#7a2fe3]"
              : "bg-[#fff] text-[#7a2fe3] border-[#7a2fe3]"
          } hover:scale-105`}
        >
          IT FACULTY LIST
        </button>
      </div>

      <div className="mt-10">
        {showMentors && <ListMentors />}
        {showFaculty && <ListFaculty />}
      </div>
    </div>
  );
}
