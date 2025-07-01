import Back from '@/components/Common/back/Back'
import Footer from '@/components/Common/Footer/Footer'
import GoToTop from '@/components/Common/GotoTop/GoToTop'
import ItFaculty from '@/components/comp_faculty/ItFaculty'
import React from 'react'

export default function page() {
  return (
    <div>
      <Back title='Faculty Corner'/>
      <ItFaculty/>
      <GoToTop/>
      <Footer/>
    </div>
  )
}
