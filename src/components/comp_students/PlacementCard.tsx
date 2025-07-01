'use client';

import React from "react";
import Heading from "../Common/heading/Heading";
import "./blog.css";
import { placement } from "@/lib/dummydata";

// Dynamic border and shadow colors
const colors = ["#FF6B6B", "#1E90FF", "#FFB400", "#6BFF85", "#E066FF", "#FF5733", "#33FFCE", "#FF4081"];

export default function PlacementCard() {
  return (
    <section className="placement" id="placement-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading
          subtitle="Placements"
          title="Some of our Elite Head-Hunters"
          subtitleClass="placement-subtitle"
        />

        <div className="placement-grid mt-10">
          {placement.map((val, index) => (
            <div
              key={index}
              className="placement-box"
              style={{
                borderColor: colors[index % colors.length],
                boxShadow: `0px 0px 15px ${colors[index % colors.length]}`
              }}
            >
              <h1 className="placement-title">{val.courseName}</h1>
              <span
                className="placement-tag"
                style={{
                  background: colors[index % colors.length],
                  color: "#fff"
                }}
              >
                {val.course}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
