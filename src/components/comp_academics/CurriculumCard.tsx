'use client';

import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import './Courses.css';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type SemesterType = "4TH SEM" | "6TH SEM" | "8TH SEM";
const semesters: SemesterType[] = ["4TH SEM", "6TH SEM", "8TH SEM"];


type TableCell = string | number | { text: string; colspan?: number; rowspan?: number; section?: string };
type CourseStruct = TableCell[][];
type Elective = TableCell[][];

type CurriculumData = {
  struct?: CourseStruct;
  elective?: Elective;
};

const course_struct: Record<SemesterType , CurriculumData> = {
    "4TH SEM": {"struct": [
      [{text: "Sl. No.", rowspan:2}, {text: "Type of course", rowspan:2}, {text: "Course Code", rowspan:2}, {text: "Course Name", rowspan:2}, {text:"Hours per week", colspan:4, rowspan:1} ,{text: "Credit Points", rowspan:2}],
      ["Lecture", "Tutorial", "Practical", "Sessional"],
      [{text: "Theory Papers", colspan:9, section: "theory"}],
      [1, "Professional Core Course", "PCCCS401", "Discrete Mathematics", 3, 0,0,0,3],
      [2, "Professional Core Course", "PCCCS402", "Computer Organisation & Architecture", 3,0,0,0,3],
      [3, "Professional Core Course", "PCCCS403", "Artificial Intelligence & Machine Learning", 3, 0,0,0,3],
      [4, "Professional Core Course", "PCCCS404", "Design & Analysis of Algorithms", 3,0,0,0,3],
      [5, "Professional Core Course", "PCCCS405", "Advanced Programming (OOP)", 3, 0,0,0,3],
      [6, "Humanities & Social Sciences including Management course", "HSMCS471", "Management 1 (Finance & Accounting)", 3,0,0,0,3],
      [7, "Humanities & Social Sciences including Management course", "ESP401", "Essential Studies for Professionals - IV", 2, 0,0,0,0.5],
      [8, "Mandatory Course", "MCC471", "Sustainability , Climate Actions & Environment al Sciences", 1,"-","(Field Projects)","-",2],
      [{text:"Total", colspan:4}, 21,0,0,0,20.5],
      [{text: "Practical Papers", colspan:9, section: "practical"}],
      [1, "Professional Core Course", "PCCCS492", "Computer Organisation & Architecture Laboratory", 0,0,4,0,2],
      [2, "Professional Core Course", "PCCCS493", "Artificial Intelligence & Machine Learning Laboratory", 0,0,2,0,1],
      [3, "Professional Core Course", "PCCCS494", "Design & Analysis of Algorithms Laboratory", 0,0,4,0,2],
      [4, "Professional Core Course", "PCCCS402", "Advanced Programming (OOP) Laboratory", 0,0,2,0,1],
      [{text:"Total", colspan:4}, 0,0,12,0,6],
      [{text: "Sessional Papers", colspan:9, section: "sessional"}],
      [1, "Humanities & Social Sciences including Management course", "SDP481", "Skill Development for Professionals - IV", 0,0,0,2,0.5],
      [2, "Innovative Project", "PRJCS481", "Innovative Project -II", 0,0,0,0,1],
      [3, "Professional Core Course", "PCCCS481", "Data Analytics", 0,0,4,0,2],
      [{text:"Total", colspan:4}, 0,0,0,4,0.5],
      [{text: "Mandatory Requirements", colspan:9, section: "mandatory"}],
      [1, "Co-curricular & Extra Curricular Activities", "MAR", "Mandatory Additional Requirement s (Score)", "-","-","-","-","-"],
      [2, "Honours", "MOOCs", "Massive Open Online Course (Credit)", "-","-","-","-","-"],
      [3, "Certification", "IFC", "Industry and Foreign Certification (Count)", "-","-","-","-","-"],
      [{text:"Total", colspan:4}, 21,0,12,4,29]
    ]
  },
    "6TH SEM": { 
    "struct": [
      [{text: "Sl. No.", rowspan:2}, {text: "Type of course", rowspan:2}, {text: "Course Code", rowspan:2}, {text: "Course Name", rowspan:2}, {text:"Hours per week", colspan:4} ,{text: "Credit Points", rowspan:2}],
      ["Lecture", "Tutorial", "Practical", "Sessional"],
      [{text: "Theory Papers", colspan:9, section: "theory"}],
      [1, "Professional Core Course", "PCCCS601", "Computer  Networks", 3, 0,0,0,3],
      [2, "Professional Core Course", "PCCCS602", "Cloud Computing & IOT", 3,0,0,0,2],
      [3, "Professional Core Course", "PCCCS603", "Introductory Cyber Scurity", 3, 0,0,0,3],
      [4, "Professional Core Course", "PCCCS604", "Elective - I", 3,0,0,0,3],
      [5, "Professional Core Course", "PCCCS605", "Elective -II", 3, 0,0,0,3],
      [6, "Humanities & Social Sciences including Management course", "ESP(CS)601", "Essential Studies for Professionals – VI (CS)", 2, 0,0,0,0.5],
      [{text:"Total", colspan:4}, 16,0,0,0,14.5],
      [{text: "Practical Papers", colspan:9, section: "practical"}],
      [1, "Professional Core Course", "PCCCS691", " Computer  Networks Laboratory", 0,0,4,0,2],
      [2, "Professional Core Course", "PCCCS692", " Cloud Computing & IOT Laboratory", 0,0,4,0,2],
      [3, "Professional Elective Course", "PECCS691", "Introuctory Cyber Security Laboratory", 0,0,4,0,2],
      [{text:"Total", colspan:4}, 0,0,12,0,6],
      [{text: "Sessional Papers", colspan:9, section: "sessional"}],
      [1, "Humanities & Social Sciences including Management course", "SDP681", "Skill Development for Professionals - VI", 0,0,0,2,0.5],
      [2, "Innovative Project", "PRJCS681", "Project -I", 0,0,0,6,3],
      [3, "Professional Core Course", "PCCCS481", "Generative AI & Deep Learning", 0,0,0,2,1],
      [{text:"Total", colspan:4}, 0,0,0,10,4.5],
      [{text: "Mandatory Requirements", colspan:9, section: "mandatory"}],
      [1, "Co-curricular & Extra Curricular Activities", "MAR", "Mandatory Additional Requirement s (Score)", "-","-","-","-","-"],
      [2, "Honours", "MOOCs", "Massive Open Online Course (Credit)", "-","-","-","-","-"],
      [3, "Certification", "IFC", "Industry and Foreign Certification (Count)", "-","-","-","-","-"],
      [{text:"Total", colspan:4}, 16,0,12,10,25],
    ],
    "elective": [
      ["Program Name", "Track", "Elective - I", "Elective - II"],
      [{text: "B.Tech in CSE", rowspan:4}, "Network & Security", "Blockchain, Cryptocurrency & NFT (PECCS602A)", "Digital Forensics (PECCS603A)"],
      ["Artificial Intelligence & Data Science", "Soft Computing (PECCS602B)", "Natural Language Processing Data (PECCS603B)"],
      ["Theory & Systems", "Graph Theory (PECCS602C)", "Distributed Systems (PECCS603C)"],
      ["Applications", "Image Processing (PECCS602D)", "Computer Graphics (PECCS603D)"],
      [{text: "B.Tech in IT", rowspan:4}, "Network & Security", "Information Theory & Coding (PECCS602E)", "Data Communication (PECCS603F)"],
      ["Artificial Intelligence", "Soft Computing (PECCS602B)", "Natural Language Processing (PECCS603B)"],
      ["Theory and Algorithms", "Graph Theory (PECCS602C)", "Computer Graphics (PECCS603D)"],
      ["Applications", "Image Processing (PECCS602D)", "E-Commerce (PECCS603I)"],
      [{text: "B.Tech in CSE (IOTCSBT)", rowspan:3}, "Network & Security", "Blockchain, Cryptocurrency & NFT (PECCS602A)", "Digital Forensics (PECCS603A)"],
      ["Artificial Intelligence", "-", "Big Data Analytics (PECCS603G)"],
      ["Applications", "-", "Wireless Sensor Network (PECCS603H)"],
      [{text: "B.Tech in CSE (IOT)", rowspan:3}, "Network & Security", "5G Network Technology (PECCS602H)", "Data Communication (PECCS603F)"],
      ["Artificial Intelligence", "Soft Computing (PECCS602B)", "Big Data Analytics (PECCS603G)"],
      ["Applications", "Embedded System (PECCS602J) ", "Wireless Sensor Network (PECCS603H)"],
      [{text: "B.Tech in CSE (AI)", rowspan:2}, "Artificial Intelligence", "Soft Computing (PECCS602B)", "Natural Language Processing Data (PECCS603B)"], 
      ["Data Science", "Data Science using Python (PECCS602K)", "Cognitive Computing (PECCS603E)"],
      [{text: "B.Tech in CST / CSIT", rowspan:3}, "Network & Security", "Blockchain, Cryptocurrency & NFT (PECCS602A)", "Digital Forensics (PECCS603A)"], 
      ["Artificial Intelligence", "Soft Computing (PECCS602B)", "Natural Language Processing (PECCS603B)"], 
      ["Applications", "-", "Computer Graphics (PECCS603D)"],
      [{text:"B.Tech in CSE (AI & ML)", rowspan:2}, "Theoretical AI", "Soft Computing (PECCS602B)", "Natural Language Processing (PECCS603B)"],
      ["Applied AI", "Data Science using Python (PECCS602K)", "Pattern Recognition (PECCS603J)"],
      [{text: "B.Tech in CSBS", rowspan:2}, "Networks", "Blockchain, Cryptocurrency & NFT (PECCS602A)", "Wireless Sensor Network (PECCS603H)"],
      ["Applied AI", "Data Science using Python (PECCS602K)", "Natural Language Processing (PECCS603B)"]
    ]
  },
  //   "8TH SEM": { "struct": [
  //     [{text: "Sl. No.", rowspan:2}, {text: "Type of course", rowspan:2}, {text: "Course Code", rowspan:2}, {text: "Course Name", rowspan:2}, {text:"Hours per week", colspan:4} ,{text: "Credit Points", rowspan:2}],
  //     ["Lecture", "Tutorial", "Practical", "Sessional"],
  //     [{text: "Theory Papers", colspan:9, section: true}],
  //     [1, "Professional Core Course", "PCCCS601", "Computer  Networks", 3, 0,0,0,3],
  //     [2, "Professional Core Course", "PCCCS602", "Cloud Computing & IOT", 3,0,0,0,2],
  //     [3, "Professional Core Course", "PCCCS603", "Introductory Cyber Scurity", 3, 0,0,0,3],
  //     [4, "Professional Core Course", "PCCCS604", "Elective - I", 3,0,0,0,3],
  //     [5, "Professional Core Course", "PCCCS605", "Elective -II", 3, 0,0,0,3],
  //     [6, "Humanities & Social Sciences including Management course", "ESP(CS)601", "Essential Studies for Professionals - VI (CS)", 2, 0,0,0,0.5],
  //     [{text:"Total", colspan:4}, 16,0,0,0,14.5],
  //     [{text: "Practical Papers", colspan:9, section: true}],
  //     [1, "Professional Core Course", "PCCCS691", " Computer  Networks Laboratory", 0,0,4,0,2],
  //     [2, "Professional Core Course", "PCCCS692", " Cloud Computing & IOT Laboratory", 0,0,4,0,2],
  //     [3, "Professional Elective Course", "PECCS691", "Introuctory Cyber Security Laboratory", 0,0,4,0,2],
  //     [{text:"Total", colspan:4}, 0,0,12,0,6],
  //     [{text: "Sessional Papers", colspan:9, section: true}],
  //     [1, "Humanities & Social Sciences including Management course", "SDP681", "Skill Development for Professionals - VI", 0,0,0,2,0.5],
  //     [2, "Innovative Project", "PRJCS681", "Project -I", 0,0,0,6,3],
  //     [3, "Professional Core Course", "PCCCS481", "Generative AI & Deep Learning", 0,0,0,2,1],
  //     [{text:"Total", colspan:4}, 0,0,0,10,4.5],
  //     [{text: "Mandatory Requirements", colspan:9,section: true}],
  //     [1, "Co-curricular & Extra Curricular Activities", "MAR", "Mandatory Additional Requirement s (Score)", "-","-","-","-","-"],
  //     [2, "Honours", "MOOCs", "Massive Open Online Course (Credit)", "-","-","-","-","-"],
  //     [3, "Certification", "IFC", "Industry and Foreign Certification (Count)", "-","-","-","-","-"],
  //     [{text:"Total", colspan:4}, 16,0,12,10,25],
  //   ]
  // }
  "8TH SEM": {},
}

const syllabusFiles: Record<SemesterType, string> = {
  "4TH SEM": "/pdfs/4th_Semester_DetailedSyllabus.pdf",
  "6TH SEM": "/pdfs/Detailed_Syllabus_for_6th_Semester_removed.pdf",
  "8TH SEM": "/pdfs/IT_2021-2025.pdf",
};

export default function CurriculumCard() {
  const [selectedSem, setSelectedSem] = useState<SemesterType  | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  useEffect(() => {
    if (selectedSem) {
      setSelectedPdf(syllabusFiles[selectedSem]);  // Update PDF when semester changes
    }
  }, [selectedSem]);

  // useEffect(() => {
  //   const loadPdf = async () => {
  //     if (!selectedPdf) return;
  //     setLoading(true);
  //     try {
  //       const pdf = await pdfjsLib.getDocument(selectedPdf).promise;
  //       const pages = [];

  //       for (let i = 1; i <= pdf.numPages; i++) {
  //         const page = await pdf.getPage(i);
  //         const viewport = page.getViewport({ scale: 3 });
  //         const canvas = document.createElement("canvas");
  //         const context = canvas.getContext("2d");
  //         canvas.width = viewport.width;
  //         canvas.height = viewport.height;

  //         await page.render({ canvasContext: context, viewport }).promise;
  //         pages.push(canvas.toDataURL("image/png"));
  //       }

  //       setPdfPages(pages);
  //     } catch (error) {
  //       console.error("Error loading PDF:", error);
  //     }
  //     setLoading(false);
  //   };

  //   loadPdf();
  // }, [selectedPdf]);

  return (
    <section className="curriculum" id="curriculum-section">
      <Container className="sem_tabs">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 px-4 sm:px-8 mb-6">
          {semesters.map((sem) => (
            <div
              key={sem}
              className={`sem-tab ${selectedSem === sem ? 'active' : ''}`}
              onClick={() => setSelectedSem(sem)}
            >
              {sem}
            </div>
          ))}
        </div>
      </Container>
      {selectedSem && course_struct[selectedSem]?.struct && course_struct[selectedSem].struct!.length > 0 && (
        <Container className="yr_curriculum w-full overflow-x-auto">
          <h2 className="heading">{selectedSem} Course Structure</h2>
          <Table striped bordered hover={false} responsive className="curriculum-table my-6 overflow-auto rounded-lg">
            <thead>
              {course_struct[selectedSem]?.struct?.slice(0, 2).map((row, idx) => (
                <tr key={idx}>
                  {row.map((col, i) => {
                    const text = typeof col === 'object' ? col.text : col;
                    return (
                      <th key={i} colSpan={(col as any)?.colspan || 1} rowSpan={(col as any)?.rowspan || 1}>
                        {text}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {course_struct[selectedSem]?.struct?.slice(2).map((row, idx) => (
                <tr key={idx} className={(row as any).section ? 'section-row' : idx % 2 === 0 ? 'even-row-c' : 'odd-row-c'}>
                  {row.map((col, i) => {
                    const content = typeof col === 'object' ? col.text : col;
                    const isHeading = ["Theory Papers", "Practical Papers", "Sessional Papers", "Mandatory Requirements"].includes(String(content));
                    const isTotal = typeof col === 'object' && col.text.includes("Total");
                    return (
                      <td
                        key={i}
                        colSpan={(col as any)?.colspan || 1}
                        rowSpan={(col as any)?.rowspan || 1}
                        className={isHeading ? 'section-heading' : isTotal ? 'highlight-total' : ''}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>

          {selectedSem === "6TH SEM" && course_struct[selectedSem]?.elective && (
            <div className='w-full overflow-x-auto'>
              <h2 className="heading">Elective Courses</h2>
              <Table striped bordered hover responsive className="curriculum-table">
                <thead>
                  {course_struct[selectedSem].elective?.slice(0, 1).map((row, idx) => (
                    <tr key={idx}>
                      {row.map((col, i) => (
                        <th key={i} colSpan={(col as any)?.colspan || 1} rowSpan={(col as any)?.rowspan || 1}>
                          {typeof col === 'object' ? col.text : col}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {course_struct[selectedSem].elective?.slice(1).map((row, idx) => (
                    <tr key={idx} className={(row as any).section ? 'section-row' : idx % 2 === 0 ? 'even-row-c' : 'odd-row-c'}>
                      {row.map((col, i) => {
                        const content = typeof col === 'object' ? col.text : col;
                        const isBtech = typeof content === 'string' && content.includes("B.Tech");
                        return (
                          <td
                            key={i}
                            colSpan={(col as any)?.colspan || 1}
                            rowSpan={(col as any)?.rowspan || 1}
                            className={isBtech ? "highlight-Btech" : ""}
                          >
                            {content}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Container>
      )}
      

      {/* Responsive PDF Viewer */}
      {selectedSem && syllabusFiles[selectedSem] && (
        <Container className="syll-container">
          <h2 className="heading">{selectedSem} Syllabus</h2>
          <div className="w-full max-w-[1200px] mx-auto h-[80vh] sm:h-[85vh] md:h-[85vh] rounded-xl overflow-hidden shadow-xl border border-gray-300 bg-white mt-6">
            <iframe
              title={`${selectedSem} syllabus`}
              src={syllabusFiles[selectedSem]}
              className="w-full h-full"
              loading="lazy"
              style={{ border: 'none' }}
            />
          </div>
        </Container>
      )}
    </section>
  );
}



