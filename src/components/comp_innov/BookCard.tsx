'use client';

import React, {useState} from 'react'
import { book_chapter } from "@/lib/dummydata";

type BookType = 'faculty' | 'students';

const pubTypes: Record<BookType, string> = {
    faculty: "Faculty Publications",
    students: "Student Publications",
  };

export default function BookCard() {
  const [selectedPub, setSelectedPub] = useState<BookType | null>(null);

  const handleSelect = (type: BookType) => {
    setSelectedPub(type);
    setTimeout(() => {
      const section = document.getElementById(`${type}-section`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <div id="publication-section"
      className='relative isolate font-poppins lg:py-12 lg:px-4 py-6 px-3 bg-gradient-to-br from-sky-700 to-purple-700 rounded-xl shadow-xl mt-10 text-white'
    >
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {(Object.keys(pubTypes) as BookType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={`px-6 py-3 text-lg font-semibold rounded-full shadow-md transition-transform duration-300 ${
              selectedPub === type
                ? "bg-gradient-to-r from-green-500 to-teal-400"
                : "bg-gradient-to-r from-pink-500 to-yellow-400"
            } hover:scale-105 text-white`}
          >
            {pubTypes[type]}
          </button>
        ))}
      </div>
      {selectedPub && (
        <div
          id={`${selectedPub}-section`}
          className="w-full max-w-6xl mx-auto bg-[#c1c1c175] text-gray-900 lg:p-6 p-4 rounded-lg shadow-lg border border-gray-300"
        >
          <div className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-4 rounded-md mb-6 uppercase tracking-wide">
            {pubTypes[selectedPub]}
          </div>

          <div>
            <h3 className="text-yellow-600 font-bold text-lg sm:text-xl mb-3 border-b-2 border-yellow-400 inline-block">
              Book Chapter Publications
            </h3>
            <BookTable type={selectedPub}/>
          </div>
        </div>
      )}
    </div>
  );
}

interface TableProps {
  type: BookType;
}

function BookTable({ type }: TableProps) {
  const data = book_chapter[type];
  if (!data || data.length < 2) return null;

  const [header1, header2, ...rows] = data;

  return (
    <div className="w-full overflow-x-auto mt-4 rounded-md scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-200">
      <table className="w-full min-w-[700px] text-sm sm:text-base border-collapse bg-indigo-100 text-gray-800 shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            {header1.map((heading: any, idx: number) => (
              <th
                key={idx}
                colSpan={heading.colspan || 1}
                className="text-center lg:px-4 lg:py-3 px-3 py-2 border border-indigo-600"
              >
                {heading.text || heading}
              </th>
            ))}
          </tr>
          <tr>
            {header2.map((heading: any, idx: number) => (
              <th
                key={idx}
                className="text-center lg:px-4 lg:py-3 px-3 py-2 border border-indigo-500"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any[], rowIndex: number) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-indigo-200" : "bg-indigo-100"}
            >
              {row.map((cell, cellIndex) => {
                if (typeof cell === "object" && cell !== null) {
                  return (
                    <td
                      key={cellIndex}
                      colSpan={cell.colspan || 1}
                      rowSpan={cell.rowspan || 1}
                      className="text-center lg:px-4 lg:py-3 px-2 py-2 border border-indigo-300 hover:bg-indigo-400 hover:text-white transition-colors"
                    >
                      {cell.text}
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={cellIndex}
                      className="text-center lg:px-4 lg:py-3 px-2 py-2 border border-indigo-300 hover:bg-indigo-400 hover:text-white transition-colors"
                    >
                      {cell}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
