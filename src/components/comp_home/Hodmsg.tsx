'use client';

import React from 'react';
import Image from 'next/image';
import './homePart.css'; // keep for quote animation and custom styles
import Link from 'next/link';

export default function Hodmsg() {
  return (
    <section className="msg_hod">
      {/* Section Title */}
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 uppercase mb-8 relative section-title">
          Message from HOD
        </h2>

        {/* HOD Box */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
          {/* Image Centered */}
          <div className="flex flex-col items-center mb-6 relative">
            <div className="hod-img-wrapper relative inline-block">
              <Image
                src="/images/hod_img.jpg"
                alt="HOD"
                width={220}
                height={220}
                className="rounded-full border-4 border-blue-900 shadow-lg hod-img object-cover"
              />
              {/* Hover quote on md+ */}
              <p className="hod-quote hidden lg:block">
                <i>
                  &quot;I invite you to explore our website and get more information about our distinguished academic programs, 
                  state of the art facilities, and dedicated faculty members. It will give you our clear intention and commitment 
                  towards excellence and quality. Thanks to the efforts of our researchers, teachers, and our students too, we persevere 
                  to play a primary role in our discipline, both nationally and internationally.&quot;
                </i>
              </p>
            </div>

            {/* Always show quote below image on small screens */}
            <p className="mt-4 lg:hidden text-sm text-gray-700 italic bg-blue-100 p-3 rounded border-l-4 border-blue-700 shadow-sm w-full max-w-md text-left">
              &quot;I invite you to explore our website and get more information about our distinguished academic programs, 
              state of the art facilities, and dedicated faculty members...&quot;
            </p>
          </div>

          {/* HOD Details */}
          <div className="text-left text-sm md:text-base text-gray-700 leading-relaxed">
            <h3 className="text-xl font-bold uppercase text-gray-800 text-center md:text-left mb-3">
              Prof. Dr. Moutushi Singh, PhD
            </h3>
            <p className="text-center md:text-left">
              Head of the Department of Computer Science<br />
              Institute of Engineering and Management<br />
              Y-12 Salt Lake Electronics Complex, Sector – V, Kolkata – 700091<br />
              <span className="font-semibold">Email ID:</span>{' '}
              <Link
                href="mailto:moutushi.singh@iem.edu.in"
                className="text-blue-600 font-semibold hover:underline"
              >
                moutushi.singh@iem.edu.in
              </Link>
            </p>
          </div>
        </div>

        {/* Thanking Box - Separate */}
        <div className="thanking bg-gradient-to-r from-blue-900 to-blue-600 text-white mt-10 p-6 rounded-xl shadow-lg text-justify">
          <p className="text-sm md:text-base leading-relaxed">
            It gives me immense pride and pleasure to introduce the Department of Information Technology. 
            The Department of Information Technology was founded in 1999.
            <br /><br />
            The Bachelor degree program was started in 1999. The Master degree program was started in 2011.
            <br /><br />
            Currently, the Master degree program run by the department is Computer Science & Business Systems. 
            The bachelor degree program is accredited by the National Board of Accreditation (NBA), New Delhi. 
            All the academic programs are periodically reviewed and updated to incorporate the latest trends in 
            information technology-driven society.
            <br /><br />
            We are proud of our strong academic programs, which are based on theoretical and practical knowledge 
            and match well with the requirements and demands of the industry. We are committed to students by offering 
            short-term courses and pre-placement training classes that foster critical and analytical thinking and 
            build the necessary skills to succeed in the industry. Sitting squarely in an Engineering Faculty, the 
            Department of Information Technology is focused on devising innovative, correct solutions to hard problems, 
            while ensuring that the solutions execute optimally with the aspiration to create patents. We regularly conduct 
            entrepreneurship development programs that aim to train engineering graduates in the essentials of conceiving, 
            planning, initiating, and launching an economic activity or an enterprise successfully.
          </p>
        </div>
      </div>
    </section>
  );
}
