'use client';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Naac.css';
import Image from 'next/image';

export default function NaacCert() {
  return (
    <div>
      <section className="naac_acre py-16">
        <Container>
          <h2 className="naac-title text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10">
            NAAC Accreditation
          </h2>

          <Row className="naac_section flex flex-wrap gap-8 items-stretch justify-between">
            {/* Text Content */}
            <Col
              lg={6}
              className="txt-section flex flex-col justify-center bg-white rounded-xl shadow-md p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
            >
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 transition-colors duration-300">
                The Dept. of Information Technology, at the Institute of Engineering and Management (IEM), Salt Lake, Kolkata came into existence in 1999 with a Vision
                “To produce Creators of Creative Technological Solutions” for the benefit of Engineering, Science and Technology and the Nation on a larger scale.
                It has always strived to fulfill its Mission to impart Value Based Education and promote Research and Development at the International level.
                The Dept. of Information Technology has received Accreditation twice by the NBA and has since been running its programs successfully.
              </p>
              <br />
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 transition-colors duration-300">
                The Dept. of Information Technology began with its first batch of 40 students for the B.Tech Course. The student intake for the Under Graduate Course
                gradually increased from 40 to 60 seats in 2001 and presently admits 120. The Department achieved another feather in its cap with the initiation of the
                Post Graduate Course (M.Tech) in 2011. Since its inception, the Dept. of Information Technology has been strengthening its resources and providing
                state of the art facilities to foster the spirit of learning and development of professional skills.
              </p>
              <br />
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 transition-colors duration-300">
                The IT Dept. makes full utilisation of its 7 Laboratories in its attempt to put into practice theoretical concepts and getting the students industry ready.
                It also encourages students to take up challenging projects and internships at the National and International level in order to fine-tune their technical skills.
                The Dept provides opportunities for them to join various student chapters such as NEN, SPIE, and OSA etc. in addition to other extracurricular activities.
                It has opened avenues to promote Entrepreneurship among students and instill in them the concept of Corporate Social Responsibility. In its attempt to pursue
                excellence and explore greener pastures, the Dept. hosts a strong team of qualified and experienced Faculty Members who work in co-ordination with the budding engineers.
              </p>
            </Col>

            {/* Image Section */}
            <Col
              lg={6}
              className="cert-section flex justify-center items-center"
            >
              <Image
                src="/images/naac_certificate.jpg"
                alt="NAAC Accreditation"
                width={600}
                height={800}
                className="w-full max-w-[500px] h-auto object-contain rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
