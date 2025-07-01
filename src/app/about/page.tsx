import Back from '@/components/Common/back/Back'
import Footer from '@/components/Common/Footer/Footer'
import GoToTop from '@/components/Common/GotoTop/GoToTop'
import Aboutprog from '@/components/comp_about/Aboutprog'
import Aboutvision from '@/components/comp_about/Aboutvision'
import Hprogs from '@/components/comp_about/Hprogs'
import React from 'react'

export default function page() {
  return (
    <div>
      <Back title='About Us'/>
      <Aboutprog/>
      <Aboutvision/>
      <Hprogs/>
      <GoToTop/>
      <Footer/>
    </div>
  )
}
