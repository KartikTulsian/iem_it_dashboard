'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './Footer.css';
import Link from 'next/link';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('footerScrollPosition');
    const fromFooter = sessionStorage.getItem('fromFooter');

    if (savedPosition && fromFooter === 'true') {
      setTimeout(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }, 100);
      sessionStorage.removeItem('fromFooter');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  const handleNavigate = (path: string) => {
    sessionStorage.setItem('footerScrollPosition', window.scrollY.toString());
    sessionStorage.setItem('fromFooter', 'true');
    router.push(path);
  };

  return (
    <div>
      {/* Newsletter Section */}
      <section className="newletter">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 max-w-screen-xl mx-auto">
          <div className="left w-full md:w-2/3">
            <h1 className="text-white text-xl md:text-2xl font-semibold mb-2">
              Newsletter - Stay tuned and get the latest updates
            </h1>
            <span>Stay updated with the latest trends and innovations in technology.</span>
          </div>
          <div className="right w-full md:w-1/3 flex items-center gap-2 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Enter email address"
              className="flex-grow bg-white text-black placeholder-gray-500 border border-gray-300 rounded px-4 py-4"
            />
            <i className="fa fa-paper-plane p-3 bg-white text-purple-700 rounded"></i>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="pt-10">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Logo & Info */}
          <div className="box logo col-span-1 xl:col-span-2">
            <h2 className="text-lg font-bold mb-1">Department of Computer Science,</h2>
            <h2 className="text-lg font-bold mb-1">Program Information Technology</h2>
            <span className="block text-sm text-purple-600">Institute of Engineering & Management, Kolkata</span>
            <p className="text-gray-600 mt-4 mb-4">
              Dive into a world of cutting-edge technology, where innovation meets knowledge!
            </p>
            <div className="flex space-x-3">
              <i className="fab fa-facebook bg-purple-700 text-xl text-white p-2 rounded-full cursor-pointer hover:scale-105 transition"></i>
              <i className="fab fa-instagram bg-purple-700 text-xl text-white p-2  rounded-full cursor-pointer hover:scale-105 transition"></i>
              <i className="fab fa-youtube bg-purple-700 text-xl text-white p-2  rounded-full cursor-pointer hover:scale-105 transition"></i>
            </div>
          </div>

          {/* Explore Links */}
          <div className="box link">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul>
              <li onClick={() => handleNavigate('/about')}>About Us</li>
              <li onClick={() => handleNavigate('/academics')}>Academics</li>
              <li onClick={() => handleNavigate('/students')}>Students</li>
              <li onClick={() => handleNavigate('/faculty')}>Faculty</li>
              <li onClick={() => handleNavigate('/innovation_initiatives')}>Innovation & Initiatives</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="box link">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link href="https://iem.edu.in/" target="_blank" rel="noopener noreferrer">IEM Website</Link>
              </li>
              <li>
                <Link href="https://www.iemlearning.com/" target="_blank" rel="noopener noreferrer">IEM Learning</Link>
              </li>
              <li>
                <Link href="https://iem-iete-students-forum.netlify.app/" target="_blank" rel="noopener noreferrer">
                  IEM-IETE Student&apos;s Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="box last">
            <h3 className="text-lg font-semibold mb-4">Have Questions?</h3>
            <ul>
              <li className="address flex gap-3 items-start">
                <i className="fa fa-map text-purple-700"></i>
                <span>
                  Gurukul, Y-12, Block -EP, Sector-V, Salt Lake Electronics Complex Kolkata – 700 091, West Bengal, India.
                </span>
              </li>
              <li className="email flex gap-3 items-start mt-6">
                <i className="fa fa-paper-plane text-purple-700"></i>
                <span>admissions@iem.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom mt-10">
          <p>© 2025 IEM CSE Department | Innovating technology, transforming futures.</p>
        </div>
      </footer>
    </div>
  );
}
