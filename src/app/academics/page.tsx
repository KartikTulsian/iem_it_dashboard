import Back from '@/components/Common/back/Back'
import Footer from '@/components/Common/Footer/Footer'
import GoToTop from '@/components/Common/GotoTop/GoToTop'
import AcademicsCard from '@/components/comp_academics/AcademicsCard'
import React from 'react'

export default function page() {
  return (
    <div>
      <Back title='Explore Academics'/>
      <AcademicsCard/>
      <GoToTop/>
      <Footer/>
    </div>
  )
}
