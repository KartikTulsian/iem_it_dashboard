'use client';

import React from "react";
import { Container } from "react-bootstrap";
import "./Courses.css";

const classroom = {
  lg21: {
    title: "LG 2.1 Room",
    img: "../images/infrastructure/class3.jpg",
  },
  cc: {
    title: "Competitive Coding Class",
    img: "../images/infrastructure/class1.jpg",
  },
  lg47: {
    title: "Theoretical Class at LG 4.7",
    img: "../images/infrastructure/class4.jpg",
  },
  annex: {
    title: "Theoretical Class at Annex 5th Floor",
    img: "../images/infrastructure/class5.jpg",
  },
};

const lab = {
  daa: {
    title: "DAA LAB",
    img: "../images/infrastructure/Lab1.jpg",
  },
  aiml: {
    title: "AIML LAB",
    img: "../images/infrastructure/Lab2.jpg",
  },
  oops: {
    title: "OOPS LAB",
    img: "../images/infrastructure/Lab3.jpg",
  },
  coa: {
    title: "COA LAB",
    img: "../images/infrastructure/Lab5.jpg",
  },
};

export default function InfrastructureCard() {
  return (
    <section className="infrastructure pt-16 pb-20 px-4 sm:px-6 lg:px-8" id="infrastructure-section">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="infra-title text-center">Department Infrastructure</h2>

        {/* Classrooms */}
        <h3 className="infra-subtitle text-center mt-12">📚 Modern Classrooms</h3>
        <div className="infra-grid mt-6">
          {Object.values(classroom).map((item, index) => (
            <div className="infra-card" key={index}>
              <img src={item.img} alt={item.title} className="infra-img" />

              {/* Static text below image for small & medium */}
              <div className="block lg:hidden my-3 text-center text-yellow-400 font-semibold text-base sm:text-sm uppercase tracking-wide">
                {item.title}
              </div>

              {/* Overlay only for large screens */}
              <div className="infra-overlay hidden lg:flex">
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Labs */}
        <h3 className="infra-subtitle text-center mt-16">💻 Advanced Labs</h3>
        <div className="infra-grid mt-6">
          {Object.values(lab).map((item, index) => (
            <div className="infra-card" key={index}>
              <img src={item.img} alt={item.title} className="infra-img" />

              {/* Static text below image for small & medium */}
              <div className="block lg:hidden my-3 text-center text-yellow-400 font-semibold text-base sm:text-sm uppercase tracking-wide">
                {item.title}
              </div>

              {/* Overlay only for large screens */}
              <div className="infra-overlay hidden lg:flex">
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}