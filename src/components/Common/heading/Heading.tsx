import React from 'react';

type HeadingProps = {
  subtitle: string;
  title: string;
  subtitleClass?: string;
  titleClass?: string;
};

export default function Heading({
  subtitle,
  title,
  subtitleClass = '',
  titleClass = '',
}: HeadingProps) {
  return (
    <div className="text-center py-6">
      <h3
        className={`font-semibold tracking-wider text-[#7a2fe3] uppercase text-sm sm:text-base ${subtitleClass}`}
      >
        {subtitle}
      </h3>
      <h1
        className={`text-[28px] sm:text-[36px] md:text-[40px] lg:text-[45px] mt-3 capitalize font-bold ${titleClass}`}
      >
        {title}
      </h1>
    </div>
  );
}
