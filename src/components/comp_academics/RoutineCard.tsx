'use client';

import React, { useState } from 'react';
import "./Courses.css"

const routines: Record<string, any[][]> = {
  "2ND YEAR": [
    ["Day", "09:30 -10:20", "10:20-11:10", "11:10-12:00", "12:00-12:50", "12:50-01:40", "01:40-02:30", "02:30-03:20", "03:20-04:10", "04:10-05:00"],
    [{text:"Monday", rowspan:2}, {text:"ESP IV", colspan:2}, "DM", "COA", {text:"L", rowspan:2}, "DAA", { text: "IT (Gr A): COA Lab (PSP, AK, SSAR, AR) IT Lab 7", colspan: 2 }, {text:"Mentoring", rowspan:10}],
    [{text:"ARS", colspan:2}, "SPN", "SBS", "PBL", { text: "IT (Gr B): AIML Lab (APaul, RNB) IT Lab 6", colspan: 2 }],
    [{text:"Tuesday", rowspan:2}, { text: "IT (Grp A): DAA Lab (SSB, SB, PBL) IT Lab 4", colspan: 2 }, "DM", "AIML", {text:"U", rowspan:2}, "DAA", "COA", "ESS"],
    [{ text: "IT (Grp B): AP (OOP) Lab (SJ, SDB, KD) IT Lab 1", colspan: 2 }, "AVC", "SSG", "SSB", "SMU", "SD"],
    [{text:"Wednesday", rowspan:2}, "DM", "AP(OOP)", {text:"SDP IV", colspan:2}, {text:"N", rowspan:2}, { text: "IT (Gr A): AIML Lab (APaul, RNB) IT Lab 6", colspan: 2 }, "AIML"],
    [ "AVC", "SDB", {text:"ARS", colspan:2}, { text: "IT (Gr B): COA Lab (PSP, AK, SSAR, AR) IT Lab 7", colspan: 2 },"SDas"],
    [{text:"Thursday", rowspan:2}, {text:"PPT", colspan:2}, { text: "IT (Grp A): AP (OOP) Lab (SJ, SDB, KD) IT Lab 1", colspan: 2 }, {text:"C", rowspan:2}, "AIML", "F&A", "AP(OOP)"],
    [{ text: "Science Auditorium", colspan: 2 }, { text: "IT (Grp B): DAA Lab (SSB, SB, PBL) IT Lab 4", colspan: 2 }, "SSG", "AB", "SJ"],
    [{text:"Friday", rowspan:2}, "COA", "DAA", "F&A", "AP(OOP)", {text:"H", rowspan:2}, "DAnalytics", "ESS", "F&A"],
    [ "AKundu", "SB", "PSP", "KD", "MGH", "DRC", "AB"],
  ],
  "3RD YEAR": [
    ["Day", "09:30 -10:20", "10:20-11:10", "11:10-12:00", "12:00-12:50", "12:50-01:40", "01:40-02:30", "02:30-03:20", "03:20-04:10", "04:10-05:00"],
    [{text:"Monday", rowspan:2}, "CN", {text:"NLP", colspan:2}, "SoftSkill", {text:"L", rowspan:2}, "ESP VI", "CC&IOT","CN", {text:"Mentoring", rowspan:10}],
    ["Sobya D",{text:"RNB", colspan:2}, "SD", "SB", "BiBA", "SuBH"],
    [{text:"Tuesday", rowspan:2}, { text: "IT (Grp A): CN Lab (SuBH, SGH, PB) IT Lab 2", colspan: 2 }, "NLP", "GT(SDB)", {text:"U", rowspan:2}, { text: "GenAI", colspan: 2 }, "SDP VI"],
    [{ text: "IT (Grp B): CC & IoT Lab (AB, SBS, AG, IEM Labs) IT Lab 8", colspan: 2 }, "KD", "IP(SJ)", { text: "MGH", colspan: 2 }, "VRS"],
    [{text:"Wednesday", rowspan:2}, "CC&IOT", "ICS", "CC&IOT","CN", {text:"N", rowspan:2}, { text: "IT (Gr A): ICS Lab (BD, KS, AVC) IT Lab 5", colspan: 2 }, "GT(SDB)"],
    [ "SJ", "KS", "Saikat Dutt", "RD", { text: "IT (Gr B): CC Lab (SSG, RD, SSingha) IT Lab 3", colspan: 2 },"IP(SJ)"],
    [{text:"Thursday", rowspan:2}, { text: "IT (Gr A): CC Lab (SSG, RD, SSingha) IT Lab 3", colspan: 2 }, "GenAI","ICS", {text:"C", rowspan:2}, "ESP VI", "GT(AVC)", "SDP VI"],
    [{ text: "IT (Gr B): ICS Lab (BD, KS, AVC) IT Lab 5", colspan: 2 }, "SGH","BD", "SNC", "IP(SJ)", "VRS"],
    [{text:"Friday", rowspan:2}, {text:"PPT", colspan:2}, "ICS", "CC&IOT", {text:"H", rowspan:2}, "CN", { text: "IT (Grp A): CC & IoT Lab (AB, SBS, AG, IEM Labs) IT Lab 8", colspan: 2 }],
    [ { text: "Science Auditorium", colspan: 2 }, "MBS", "RD", "Sobya D", { text: "IT (Grp B): CN Lab (SuBH, SGH, PB) IT Lab 2", colspan: 2 }],
  ],
  "4TH YEAR": [
    ["Day", "09:30 -10:20", "10:20-11:10", "11:10-12:00", "12:00-12:50", "12:50-01:40", "01:40-02:30", "02:30-03:20", "03:20-04:10", "04:10-05:00"],
    [{text:"Monday", rowspan:2}, {text:"IR(SSG)", colspan:2}, "HRD&OB", "MC", {text:"L", rowspan:2},{ text: "PROJECT", colspan: 3, rowspan:2 }, {text:"Mentoring", rowspan:10}],
    [{text:"DS(ADB)", colspan:2}, "SD", "KS"],
    [{text:"Tuesday", rowspan:2}, { text: "PROJECT", colspan: 2, rowspan:2 }, "IR(SSG)", "HRD&OB", {text:"U", rowspan:2}, { text: "PROJECT", colspan: 3, rowspan:2 }],
    [ "DS(ADB)", "SD"],
    [{text:"Wednesday", rowspan:2}, "HRD&OB", "MC", { text: "ESP VII", colspan: 2, rowspan:2 }, {text:"N", rowspan:2}, { text: "PROJECT", colspan: 3, rowspan:2 }],
    [ "SYC", "KS"],
    [{text:"Thursday", rowspan:2}, { text: "PROJECT", colspan: 1, rowspan:2 }, { text: "SDP VII", colspan: 1, rowspan:2 }, "MC", { text: "SDP VII", colspan: 1, rowspan:2 }, {text:"C", rowspan:2}, { text: "PROJECT", colspan: 3, rowspan:2 }],
    [ "SGH"],
    [{text:"Friday", rowspan:2}, { text: "PROJECT", colspan: 4, rowspan:2 }, {text:"H", rowspan:2}, { text: "PROJECT", colspan: 3, rowspan:2 }],
    [ ],
  ]
};

export default function RoutineCard() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  return (
    <section className="routine" id="routine-section">
      <div className="years_tab container">
        <div className="year-buttons ">
          {Object.keys(routines).map((year) => (
            <div
              key={year}
              className={`year-tab ${selectedYear === year ? 'active' : ''}`}
              onClick={() => setSelectedYear(year)}
            >
              <h3>{year} Time Table</h3>
            </div>
          ))}
        </div>
      </div>

      {selectedYear && routines[selectedYear].length > 0 && (
        <div className="yr_routine">
          <div className="scaled-table-wrapper">
            <table className="routine-table">
              <thead>
                <tr>
                  {routines[selectedYear][0].map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {routines[selectedYear].slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
                    {row.map((col, colIndex) => {
                      const cellContent = typeof col === 'object' ? col.text : col;
                      const isDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(cellContent);
                      return (
                        <td
                          key={colIndex}
                          rowSpan={typeof col === 'object' && col.rowspan ? col.rowspan : undefined}
                          colSpan={typeof col === 'object' && col.colspan ? col.colspan : undefined}
                          className={isDay ? "highlight-day" : ""}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}