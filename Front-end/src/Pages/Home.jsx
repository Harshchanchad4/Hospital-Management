import React, { useContext } from "react";
import Biography from "../Components/Biography";
import Hero from "../Components/Hero";
import Department from "../Components/Department";
import MessageForm from "../Components/MessageForm";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero
        title={
          "Welcome to MediCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <MessageForm />
    </>
  );
};

export default Home;