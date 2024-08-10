import React from 'react'
import Hero from '../Components/Hero'
import Biography from '../Components/Biography'



const AboutUs = () => {
  return (
    <div>
      <Hero title={"learn more About Us | Medicare Medical Institute"} 
        imageUrl={"/about.png"}

      />
      <Biography 
        imageUrl={"/whoweare.png"}
      />


    </div>
  )
}

export default AboutUs