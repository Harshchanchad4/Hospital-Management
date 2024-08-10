import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL


const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    nic: "",
    dob: "",
    gender: ""
  });

  const { firstName, lastName, email, password, nic, dob, phone, gender } = formData;

  function handleOnChange(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }

  // Handle Form Submission
  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL +  "/user/patient/register",
        { ...formData, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/");

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (isAuthenticated) {
    navigate("/");
  }


  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <p>Please sign up to continue</p>

      <form onSubmit={handleOnSubmit}>
        <div>
          <input
            type="text"
            id='firstName'
            value={firstName}
            placeholder='Enter Firstname'
            name='firstName'
            onChange={handleOnChange}
          />
          <input
            type="text"
            value={lastName}
            id='lastName'
            placeholder='Enter Lastname'
            name='lastName'
            onChange={handleOnChange}
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            id='email'
            placeholder='Enter Email'
            name='email'
            onChange={handleOnChange}
          />
          <input
            type="tel"
            id='phone'
            value={phone}
            placeholder='Enter Phone Number'
            name='phone'
            onChange={handleOnChange}
          />
        </div>

        <div>
          <input
            type="number"
            id='nic'
            value={nic}
            placeholder='Enter NIC'
            name='nic'
            onChange={handleOnChange}
          />
          <input
            type="date"
            id="dob"
            value={dob}
            placeholder='Enter Date of Birth'
            name='dob'
            onChange={handleOnChange}
          />
        </div>

        <div>
          <select name="gender" id="gender" value={gender} onChange={handleOnChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="password"
            id='password'
            value={password}
            placeholder='Enter Password'
            name='password'
            onChange={handleOnChange}
          />
        </div>

        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
