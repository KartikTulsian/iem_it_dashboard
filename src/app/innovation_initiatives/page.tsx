import Back from '@/components/Common/back/Back'
import Footer from '@/components/Common/Footer/Footer'
import GoToTop from '@/components/Common/GotoTop/GoToTop'
import InnovationIniCard from '@/components/comp_innov/InnovationIniCard'
import React from 'react'

export default function page() {
  return (
    <div>
      <Back title='Explore DevWorld'/>
      <InnovationIniCard/>
      <GoToTop/>
      <Footer/>
    </div>
  )
}
