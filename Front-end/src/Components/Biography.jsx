import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Welcome to the Medicare Medical Institute, a premier healthcare provider dedicated to serving patients with excellence. Our institute is home to a diverse team of doctors across various medical fields, ensuring comprehensive care for all health needs.
          </p>
          <p>
            At Medicare, we prioritize patient convenience and quality care. Through our user-friendly website, patients can easily schedule appointments with their preferred specialists. Our advanced system allows for seamless appointment booking and management, enhancing the overall patient experience.
          </p>
          <p>
            Our team of experienced doctors spans multiple specialties, including general medicine, pediatrics, cardiology, orthopedics, and more. We are committed to delivering personalized and effective treatment plans tailored to each patient's unique requirements.
          </p>
          <p>
            Join us at the Medicare Medical Institute, where cutting-edge technology meets compassionate care. Our mission is to provide top-notch medical services and ensure the well-being of our community.
          </p>
          <p>
            Explore our website to learn more about our doctors, services, and appointment scheduling. We look forward to serving you and your family with the highest standard of medical care.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
