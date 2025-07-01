// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// export default function EventCalendar() {
//   const [value, onChange] = useState<Value>(new Date());

//   const router = useRouter();

//   useEffect(() => {
//     if (value instanceof Date) {
//       // router.push(`?data=${value}`);
//       const iso = value.toISOString().split("T")[0]; // Just the date part
//       router.push(`?date=${iso}`);
//     }
//   }, [value, router])

//   return (
//     <Calendar onChange={onChange} value={value} />
//   );
// }


"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type EventDay = {
  date: string; // "YYYY-MM-DD"
};

export default function EventCalendar() {
  const [value, onChange] = useState<Value>(new Date());
  const [eventDates, setEventDates] = useState<EventDay[]>([]);
  const router = useRouter();

  const toLocalDateStr = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (value instanceof Date) {
      const localDate = toLocalDateStr(value);
      router.push(`?date=${localDate}`);
    }
  }, [value, router]);


  useEffect(() => {
    // Fetch event dates (you could optimize with caching)
    fetch("/api/event-days") // create this endpoint to return list of event dates
      .then(res => res.json())
      .then(setEventDates);
  }, []);

  const highlightDates = new Set(eventDates.map(d => d.date));

  return (
    <Calendar
      onChange={onChange}
      value={value}
      tileClassName={({ date, view }) => {
        if (view === "month") {
          const localDateStr = toLocalDateStr(date);
          return highlightDates.has(localDateStr) ? "highlight" : null;
        }
        return null;
      }}
    />
  );
}
