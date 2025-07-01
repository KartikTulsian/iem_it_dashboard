'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import './Header.css'
import Head from './Head'

export default function Header() {
  const [click, setClick] = useState(false)

  return (
    <div className='text-white pb-2'>
      <Head />
      <header className="site-header ">
        <nav className="relative flex items-center justify-between md:px-8 px-2 py-2 h-[70px]">
          {/* Navigation Links */}
          <ul
            className={`${
              click ? 'mobile-nav' : 'hidden md:flex'
            } flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-0`}
            onClick={() => setClick(false)}
          >
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/academics">Academics</Link></li>
            <li><Link href="/land_students">Students</Link></li>
            <li><Link href="/faculty">Faculty</Link></li>
            <li><Link href="/innovation_initiatives">Innovation & Initiatives</Link></li>
          </ul>

          {/* Sign In Button */}
          {/* <div className="hidden md:block">
            <Link href="/sign-in" className="sign-button">Sign In</Link>
          </div> */}

          {/* Hamburger Button */}
          <button
            className="md:hidden text-white text-3xl z-20 right-4 top-2 p-2"
            onClick={() => setClick(!click)}
          >
            {click ? <i className="fa fa-times" /> : <i className="fa fa-bars" />}
          </button>

        </nav>
      </header>
    </div>
  )
}
