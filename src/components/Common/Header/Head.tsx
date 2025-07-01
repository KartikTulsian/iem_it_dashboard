'use client'

import React from 'react'
import { Container } from 'react-bootstrap'
import './Header.css' // Include this to retain your essential styles
import Image from 'next/image'

export default function Head() {
  return (
    <div>
      <section className="head text-[#ffffff]">
        <Container className="flex justify-between items-center flex-wrap gap-4">
          {/* Logo and Tagline */}
          <div className="logo-tagline">
            <div className="logo">
              <Image width={1280} height={1070} src="/images/iem_logo.jpg" alt="iem_logo" />
            </div>
            <div className="tagline">
              <h1 className="text-xl md:text-2xl">Department of Computer Science,</h1>
              <h1 className="text-xl md:text-2xl">Program Information Technology</h1>
              <span className="text-sm md:text-base">
                Institute of Engineering & Management, Kolkata
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="social flex gap-4 text-xl md:text-3xl mt-2 md:mt-0 text-white">
            <i className="fa-brands fa-facebook icon cursor-pointer hover:text-gray-400"></i>
            <i className="fa-brands fa-instagram icon cursor-pointer hover:text-gray-400"></i>
            <i className="fa-brands fa-youtube icon cursor-pointer hover:text-gray-400"></i>
          </div>
        </Container>
      </section>
    </div>
  )
}
