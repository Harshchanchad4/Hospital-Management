import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import logo from "../assets/medicare.png"

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message , {
            position: 'top-right',
          });
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message , {
            position: 'top-center',
          });
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container "}>
        <Link to={"/"} className="logo">
          <img src={logo} alt="logo" className="logo-img" />
        </Link>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated && (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>)}
          {!isAuthenticated && (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger cursor-pointer" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;