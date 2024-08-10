import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL

const AppointmentForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        department: "",
        address: ""

    });
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [hasVisited, setHasvisited] = useState(false);

    const { firstName, lastName, email, nic, dob, phone, gender,
        department, appointmentDate, address } = formData;



    const departmentsArray = [
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",
    ];

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {

        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get(BASE_URL + "/user/doctors",
                    { withCredentials: true }
                );

                setDoctors(data.doctors);
            } catch (error) {
                console.error(error);
            }
        }
        fetchDoctors();

    }, [])

    function handleOnChange(e) {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }
    const handleAppointment = async (e) => {
        e.preventDefault();
        try {
            const hasVisitedBool = Boolean(hasVisited);
            const { data } = await axios.post("http://localhost:4000/api/v1/appointment/post",
                {
                    firstName,
                    lastName,
                    email,
                    phone,
                    gender,
                    dob,
                    nic,
                    appointment_date: appointmentDate,
                    department,
                    doctor_firstName: doctorFirstName,
                    hasVisited,
                    doctor_lastName: doctorLastName,
                    address,
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }

                }
            );
            toast.success(data.message);
            navigate("/");

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (

        <div className='container form-component appointment-form'>
            <h2>Appointment</h2>
            <p>Please sign up to continue</p>

            <form onSubmit={handleAppointment}>
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
                    <input type="date"
                        placeholder='Appointment Date'
                        value={appointmentDate}
                        name='appointmentDate'
                        onChange={handleOnChange}
                    />

                </div>

                <div>
                    <select name="department" id="department"
                        value={department}
                        onChange={handleOnChange}
                    >
                        {
                            departmentsArray.map((depart, index) => (
                                <option key={index} value={depart}>{depart}</option>
                            ))
                        }

                    </select>

                    <select
                        value={`${doctorFirstName} ${doctorLastName}`}
                        disabled={!department}
                        onChange={(e) => {

                            const [firstName, lastName] = e.target.value.split(" ");
                            setDoctorFirstName(firstName);
                            setDoctorLastName(lastName);

                        }}

                    >
                        <option value="">Select Doctor</option>
                        {
                            doctors.filter(doctor => doctor.doctorDepartment === department).map((doctor, index) => {
                                return (
                                    <option value={`${doctor.firstName} ${doctor.lastName}`}>
                                        {doctor.firstName} {doctor.lastName}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>

                <textarea
                    typeof='text'
                    rows="10"
                    name='address'
                    value={address}
                    onChange={handleOnChange}
                    placeholder="Address"
                />

                <div
                    style={{
                        gap: "10px",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                    }}
                >
                    <p style={{ marginBottom: 0 }}>Have you visited Before ?</p>
                    <input type="checkbox" checked={hasVisited}
                        onChange={(e) => setHasvisited(e.target.checked)}
                        style={{ flex: "none", width: "25px" }}

                    />
                </div>



                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type="submit">GET APPOINTMENT</button>
                </div>
            </form>
        </div>
    )
}

export default AppointmentForm