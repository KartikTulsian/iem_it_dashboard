'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import './back.css';

type BackProps = {
  title: string;
};

export default function Back({ title }: BackProps) {
  const pathname = usePathname();
  const path = pathname.split('/')[1] || 'home';

  return (
    <section className="relative w-full min-h-[40vh] sm:min-h-[50vh] lg:min-h-[70vh] flex items-center justify-center text-center px-4 lg:pb-[25vh]">
      <div className="max-w-4xl">
        <h2 className="back-subtitle">Home / {path}</h2>
        <h1 className="back-title">{title}</h1>
      </div>
      <div className="margin_back"></div>
    </section>
  );
}
