import Link from 'next/link'
import React from 'react'

type Mentee = {
  id: string
  name: string
  surname: string
  year: {
    name: string;
  };
}

type Props = {
  teacher: {
    mentees: Mentee[]
  }
}

export default function YearWiseMenteesCard({ teacher }: Props) {
  // Group mentees by year
  const menteesByYear = teacher.mentees.reduce<Record<string, Mentee[]>>((acc, mentee) => {
    const yearName = mentee.year?.name || 'Unknown';
    if (!acc[yearName]) acc[yearName] = [];
    acc[yearName].push(mentee);
    return acc;
    }, {});


  return (
    <div className="mt-4 bg-white rounded-md p-6 max-h-[800px] overflow-y-auto shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Mentees by Year</h1>

      {Object.entries(menteesByYear).map(([year, mentees]) => (
        <div key={year} className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b border-indigo-300 pb-1">{year}</h2>
          <ul className="space-y-3">
            {mentees.map(({ id, name, surname }) => (
              <li key={id}>
                <Link
                  href={`/list/students/${id}`}
                  className="block p-3 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-sm"
                  title={`View details of ${name} ${surname}`}
                >
                  <span className="font-medium text-indigo-900">
                    {name} {surname}
                  </span>
                  <span className="ml-2 text-sm text-indigo-600">({id})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {teacher.mentees.length === 0 && (
        <p className="text-gray-500 italic">No mentees assigned yet.</p>
      )}
    </div>
  )
}
