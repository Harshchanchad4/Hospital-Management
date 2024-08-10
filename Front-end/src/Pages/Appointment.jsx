import React from 'react'
import AppointmentForm from '../Components/AppointmentForm'
import Hero from '../Components/Hero'

const Appointment = () => {
  return (
    <div>
      <Hero title={"Schedule your Appointment | Medicare Medical Institute"} imageUrl={"/signin.png"} />
      <AppointmentForm />
    </div>
  )
}

export default Appointment