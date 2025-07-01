import Footer from '@/components/Common/Footer/Footer'
import GoToTop from '@/components/Common/GotoTop/GoToTop'
import Hero from '@/components/Common/hero/Hero'
import Habout from '@/components/comp_home/Habout'
import Hodmsg from '@/components/comp_home/Hodmsg'
import NaacCert from '@/components/comp_home/NaacCert'
import NoticeBoard from '@/components/comp_home/NoticeBoard'
import React from 'react'

export default function HomePage() {
  return (
    <div>
      {/* <Header/> */}
      <Hero/>
      {/* <Hprogs/> */}
      <NoticeBoard/>
      <Hodmsg/>
      <Habout/>
      {/* <Aboutcard/> */}
      {/* <Hblog/> */}
      <NaacCert/>
      <GoToTop/>
      <Footer/>
    </div>
  )
}
