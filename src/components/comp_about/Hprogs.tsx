'use client';

import React from 'react';
import { peo, po, pso } from '@/lib/dummydata';
import './aboutprogs.css';

export default function Hprogs() {
  return (
    <div className="hprogs bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8">
      {/* PEO Section */}
      <section className="peo mb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="prog_headline">Programme Educational Objectives (PEO)</h1>
          <div className="p_items">
            {peo.map((val, i) => (
              <div key={i} className="p_item">
                <h2>{val.id}. {val.title}</h2>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PO Section */}
      <section className="po mb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="prog_headline">Program Outcomes (PO)</h1>
          <div className="p_items">
            {po.map((val, i) => (
              <div key={i} className="p_item">
                <h2>{val.id}. {val.title}</h2>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PSO Section */}
      <section className="pso">
        <div className="max-w-6xl mx-auto">
          <h1 className="prog_headline">Program Specific Outcomes (PSO)</h1>
          <div className="p_items">
            {pso.map((val, i) => (
              <div key={i} className="p_item">
                <h2>{val.id}. {val.title}</h2>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
