'use client';

import React from 'react';
import './vision.css';

export default function Aboutvision() {
  return (
    <section className="vision-mission-section">
      <div className="max-w-7xl mx-auto px-4">
        {/* VISION */}
        <div className="vision-section flex flex-row flex-wrap items-center justify-between gap-4 lg:gap-8">
          <div className="text-section w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <h2 className="section-title">VISION OF THE PROGRAM</h2>
            <p className="section-text">
              The Department of Information Technology at IEM Kolkata strives to achieve excellence in academics, 
              innovation, research, and student development. It is well-equipped to tackle novel challenges in this 
              fast-evolving era of Information Technology through research and entrepreneurial initiatives, thereby 
              creating true value for society.
              <br /><br />
              The department is internationally recognized in distinctive areas of education and research, driven by a 
              professional and technology-oriented focus, based on a culture of innovation and excellence.
            </p>
          </div>
          <div className="image-section w-full lg:w-1/2 flex justify-center">
            <img
              src="./images/vision.jpg"
              alt="Vision"
              className="rounded shadow-lg max-w-[600px] w-full h-auto sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px]"
            />
          </div>
        </div>

        {/* MISSION */}
        <div className="mission-section flex flex-row flex-wrap items-center justify-between gap-4 lg:gap-8 mt-12">
          <div className="image-section w-full lg:w-1/2 flex justify-center">
            <img
              src="./images/mission.jpg"
              alt="Mission"
              className="rounded shadow-lg max-w-[600px] w-full h-auto sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px]"
            />
          </div>
          <div className="text-section w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <h2 className="section-title">MISSION OF THE PROGRAM</h2>
            <p className="section-text">
              To assist students in understanding and enjoying the seamless nature of knowledge, encouraging them to 
              apply acquired knowledge to practical use, ensuring they become socially responsible individuals sought 
              after for their leadership qualities.
              <br /><br />
              To foster creativity, innovation, and excellence through an example-based teaching-learning process imparted 
              in the most simple and understandable way.
              <br /><br />
              To continuously upgrade knowledge bases, improve infrastructure, adopt the latest technological tools, and 
              update curricula based on periodic stakeholder feedback, enabling students to meet professional requirements 
              and expectations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
