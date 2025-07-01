import Back from '@/components/Common/back/Back'
import Footer from '@/components/Common/Footer/Footer'
import GoToTop from '@/components/Common/GotoTop/GoToTop'
import Blogcard from '@/components/comp_students/Blogcard'
import React from 'react'

export default function page() {
  return (
    <div>
      <Back title="Student's Corner"/>
      <Blogcard/>
      <GoToTop/>
      <Footer/>
    </div>
  )
}
