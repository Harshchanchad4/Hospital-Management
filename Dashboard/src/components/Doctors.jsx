import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {

        const response = await axios.get("http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(response.data.doctors);


      } catch (error) {
        toast.error(error.response.data.message);
      }

    }
    fetchDoctors();
  }, [])

  if(!isAuthenticated)
  {
    navigate("/login");
  }

  return (
    <div className="page doctors">
      <h1>Doctors</h1>
      <div className="banner">
        {
          doctors && doctors.length > 0 ? (doctors.map((element) => {
            return(
              <div className="card">
                <img src={element.docAvatar && element.docAvatar.url} alt="Doctor Avatar" />
                <h4>{`${element.firstName} ${element.lastName}`} </h4>
                <div className='details'>
                    <p>Email : <span>{element.email}</span></p>
                    <p>Phone : <span>{element.phone}</span></p>
                    <p>DOB : <span>{element.dob.substring(0 , 10)}</span></p>
                    <p>Department : <span>{element.doctorDepartment}</span></p>
                    <p>NIC : <span>{element.nic}</span></p>
                    <p>Gender : <span>{element.gender}</span></p>

                </div>
              </div>
            )
          }))
          :(
            <div>No Doctors Found</div>

          )
          
        }

      </div>
    </div>
  )

}

export default Doctors