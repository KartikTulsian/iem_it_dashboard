import React, { useState } from "react";
import { FaFolder, FaFilePdf, FaChevronDown, FaChevronRight } from "react-icons/fa";
import Heading from "../Common/heading/Heading";
import "./cards_students.css";
import Link from "next/link";

const semesters = ["4TH SEM", "6TH SEM", "8TH SEM"];

const study_materials = {
    "4TH SEM": {
    "AIML": [
        { "name": "AI Notes", "link": "../pdfs/study_mats/aiml/AI_notes.pdf" },
        { "name": "Russell & Norvig AI", "link": "../pdfs/study_mats/aiml/AI_Russell_Norvig.pdf" },
        { "name": "Knowledge Representation", "link": "../pdfs/study_mats/aiml/Knowledge_representation.pdf" },
        { "name": "LDA", "link": "../pdfs/study_mats/aiml/LDA.pdf" },
        { "name": "Machine Learning - Tom Mitchell", "link": "../pdfs/study_mats/aiml/M1-Machine-Learning-Tom-Mitchell_.pdf" },
        { "name": "ML3A", "link": "../pdfs/study_mats/aiml/ML3A.pdf" },
        { "name": "PCA", "link": "../pdfs/study_mats/aiml/PCA.pdf" },
        { "name": "SVD", "link": "../pdfs/study_mats/aiml/SVD.pdf" }
    ],
    "AP(OOPS)": [
        { "name": "Java Fundamentals", "link": "../pdfs/study_mats/ap(oops)/1_Java Fundamentals.pdf" },
        { "name": "Polymorphism in JAVA", "link": "../pdfs/study_mats/ap(oops)/2_Polymorphism in JAVA.pdf" },
        { "name": "Exception Handling in JAVA", "link": "../pdfs/study_mats/ap(oops)/3_Exception Handling in JAVA.pdf" },
        { "name": "User Interface Design (Applet & Swing)", "link": "../pdfs/study_mats/ap(oops)/4_User Interface Design (Applet & Swing).pdf" },
        { "name": "Java Class Notes", "link": "../pdfs/study_mats/ap(oops)/java1_class note.pptx" },
        { "name": "OOP Module 1", "link": "../pdfs/study_mats/ap(oops)/OOP_M1.pdf" },
        { "name": "OOP Module 2", "link": "../pdfs/study_mats/ap(oops)/OOP_M2.pdf" },
        { "name": "OOP Module 3", "link": "../pdfs/study_mats/ap(oops)/OOP_M3.pdf" },
        { "name": "OOP Module 4", "link": "../pdfs/study_mats/ap(oops)/OOP_M4.pdf" },
        { "name": "OOP Module 5", "link": "../pdfs/study_mats/ap(oops)/OOP_M5.pdf" }
    ],
    "COA": [
        { "name": "COA Division Algorithm", "link": "../pdfs/study_mats/coa/Coa_division_algorithm.pdf" },
        { "name": "COA Adder", "link": "../pdfs/study_mats/coa/coa_adder.pdf" },
        { "name": "COA Module 2", "link": "../pdfs/study_mats/coa/Coa_mod2.pdf" },
        { "name": "COA Multiplication", "link": "../pdfs/study_mats/coa/coa_multiplication.pdf" }
    ],
    "DISCRETE MATHEMATICS": [
        { "name": "Assignment on Propositional Logic", "link": "../pdfs/study_mats/discrete_mathematics/Assignment on Propositional Logic.pdf" },
        { "name": "Assignment on Propositional Logic 2", "link": "../pdfs/study_mats/discrete_mathematics/Assignment on Propositional Logic2.pdf" },
        { "name": "Boolean Algebra - Assignment", "link": "../pdfs/study_mats/discrete_mathematics/Boolean Algebra - Assignment.pdf" },
        { "name": "CNF & DNF - Propositional Logic", "link": "../pdfs/study_mats/discrete_mathematics/CNF & DNF -Propositional Logic.pdf" },
        { "name": "Detailed Proof Techniques in Discrete Mathematics", "link": "../pdfs/study_mats/discrete_mathematics/Detailed Proof Techniques Discrete Mathematics..pdf" },
        { "name": "Notes on Boolean Algebra", "link": "../pdfs/study_mats/discrete_mathematics/Notes on Boolean Algebra.pdf" },
        { "name": "Problems on Pigeonhole Principle", "link": "../pdfs/study_mats/discrete_mathematics/Problems on Pigeonhole Principle.pdf" },
        { "name": "Solution Problems on Pigeonhole Principle", "link": "../pdfs/study_mats/discrete_mathematics/Solution Problems on Pigeonhole Principle.pdf" },
        { "name": "Syntax and Semantics", "link": "../pdfs/study_mats/discrete_mathematics/Syntax and Semantics.pdf" },
        { "name": "Types of Proofs - Predicate Logic", "link": "../pdfs/study_mats/discrete_mathematics/Types of Proofs-Predicate Logic-Discrete Mathematics.pdf" }
    ],
    "ESS": [
        { "name": "ESS Module 1", "link": "../pdfs/study_mats/ess/ess_mod1.pdf" },
        { "name": "ESS Module 2", "link": "../pdfs/study_mats/ess/ess_mod2.pdf" }
    ]
},
}

const lab_assignments = {
    "4TH SEM": {
    "AIML LAB": [
        { "name": "Decision Tree Algorithm", "link": "../pdfs/Assignments/AIML_LAB/decision_tree_algo.pdf" },
        { "name": "K-Nearest Neighbors (KNN)", "link": "../pdfs/Assignments/AIML_LAB/knn.pdf" },
        { "name": "Search - Water Jug Problem", "link": "../pdfs/Assignments/AIML_LAB/search-water-jug-handout.pdf" },
        { "name": "The A* Algorithm", "link": "../pdfs/Assignments/AIML_LAB/The Astar_Algorithm.pdf" }
    ],
    "AP(OOPS) LAB": [
        { "name": "Assignment 1", "link": "../pdfs/Assignments/AP(OOPS) LAB/A1.pdf" },
        { "name": "Assignment 2", "link": "../pdfs/Assignments/AP(OOPS) LAB/A2.pdf" },
        { "name": "Assignment 3", "link": "../pdfs/Assignments/AP(OOPS) LAB/A3.pdf" },
        { "name": "Assignment 4", "link": "../pdfs/Assignments/AP(OOPS) LAB/A4.pdf" },
        { "name": "Assignment 5", "link": "../pdfs/Assignments/AP(OOPS) LAB/A5.pdf" },
        { "name": "Assignment 6", "link": "../pdfs/Assignments/AP(OOPS) LAB/A6.pdf" },
        { "name": "Assignment 7", "link": "../pdfs/Assignments/AP(OOPS) LAB/A7.pdf" },
        { "name": "Git Guide", "link": "../pdfs/Assignments/AP(OOPS) LAB/git.pdf" }
    ],
    "DAA LAB": [
        { "name": "Assignment 1 - Graph Traversal", "link": "../pdfs/Assignments/DAA LAB/ASSIGNMENT 1_ GRAPH TRAVERSAL.pdf" },
        { "name": "Assignment 2 - Spanning Tree on Weighted Graph", "link": "../pdfs/Assignments/DAA LAB/ASSIGNMENT 2_ Spanning tree finding on a weighted graph.pdf" },
        { "name": "Assignment 3 - Binary Search Variations", "link": "../pdfs/Assignments/DAA LAB/ASSIGNMENT3_Binary Search Variations.pdf" },
        { "name": "Assignment 4 - Sorting Variations", "link": "../pdfs/Assignments/DAA LAB/ASSIGNMENT_4_SORTING VARIATIONS.pdf" },
        { "name": "Assignment 5 - Chain Matrix Multiplication", "link": "../pdfs/Assignments/DAA LAB/ASSIGNMENT5_Chain_Matrix_Multi.pdf" },
        { "name": "Assignment 6 - 0/1 Knapsack", "link": "../pdfs/Assignments/DAA LAB/ASSIGNMENT 6_01_Knapsack.pdf" }
    ]
}

}

export default function StudyMaterialsCard() {
  const [selectedSem, setSelectedSem] = useState(null);
  const [expandedSubjects, setExpandedSubjects] = useState({});

  const toggleSubject = (key) => {
    setExpandedSubjects((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="materials-section">
      {/* Semester Tabs */}
      <div className="sem_tabs">
        <div className="sem-buttons flex flex-wrap justify-center gap-4">
          {semesters.map((sem) => (
            <div
              key={sem}
              className={`sem-tab ${selectedSem === sem ? "active" : ""}`}
              onClick={() => setSelectedSem(sem)}
            >
              <h3 className="text-base md:text-lg mb-0">{sem}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Study Materials & Lab Assignments */}
      {selectedSem && (
        <div className="study-materials-container flex flex-wrap gap-8 justify-between mt-8 px-4 md:px-8">
          {/* Study Materials Section */}
          <div className="study-mats-section w-full md:w-[48%]">
            <Heading
              title="STUDY MATERIALS"
              subtitle="Essential Resources for In-Depth Learning"
              subtitleClass="study_mat_subheading"
              titleClass="study_mat_heading"
            />
            {Object.entries(study_materials[selectedSem] || {}).map(([subject, files]) => {
              const key = `study_${subject}`;
              return (
                <div className="subject-card" key={subject}>
                  <div className="folder-header" onClick={() => toggleSubject(key)}>
                    <FaFolder className="folder-icon" />
                    <span>{subject}</span>
                    {expandedSubjects[key] ? <FaChevronDown /> : <FaChevronRight />}
                  </div>
                  <div className={`file-list ${expandedSubjects[key] ? "show" : ""}`}>
                    {files.map((file, index) => (
                      <Link
                        key={index}
                        href={file.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-item"
                      >
                        <FaFilePdf className="file-icon" /> {file.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lab Assignments Section */}
          <div className="lab-assign-section w-full md:w-[48%]">
            <Heading
              title="LAB ASSIGNMENTS"
              subtitle="Practice for Better Understanding"
              subtitleClass="lab_subheading"
              titleClass="lab_heading"
            />
            {Object.entries(lab_assignments[selectedSem] || {}).map(([lab, files]) => {
              const key = `lab_${lab}`;
              return (
                <div className="subject-card lab-card" key={lab}>
                  <div className="folder-header" onClick={() => toggleSubject(key)}>
                    <FaFolder className="folder-icon" />
                    <span>{lab}</span>
                    {expandedSubjects[key] ? <FaChevronDown /> : <FaChevronRight />}
                  </div>
                  <div className={`file-list ${expandedSubjects[key] ? "show" : ""}`}>
                    {files.map((file, index) => (
                      <Link
                        key={index}
                        href={file.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-item"
                      >
                        <FaFilePdf className="file-icon" /> {file.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}