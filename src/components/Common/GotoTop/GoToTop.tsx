'use client';

import React, { useEffect, useState } from 'react'
import "./gototop.css"

export default function GoToTop() {
    const [backToTopBtn, setBackToTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setBackToTopBtn(true);
            } else {
                setBackToTopBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    }, []);

    const scrollUp = () => {
        window.scrollTo( {
            top: 0,
            behavior: 'smooth',
        })
    }

  return (
    <div className={`top-btn-container ${backToTopBtn ? "show" : ""}`}>
        <button onClick={scrollUp} className='top-btn'>
            <i className="fa-solid fa-arrow-up"></i>
        </button>
    </div>
  )
}