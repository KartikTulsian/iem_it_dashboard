'use client'

import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './aboutprogs.css'
import { aboutprog } from '@/lib/dummydata'

export default function Aboutprog() {
  return (
    <section className="program">
      <Container>
        <h1 className="headline text-2xl sm:text-4xl md:text-5xl font-bold uppercase mb-8">About the Program</h1>
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="items_prog space-y-6">
              {aboutprog.map((val, i) => (
                <div key={i} className="item_p transition-all duration-300">
                  <p className="text-base sm:text-lg leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
