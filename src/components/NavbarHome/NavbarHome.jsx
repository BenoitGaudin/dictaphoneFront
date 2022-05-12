import React, { useState } from "react";
import "./NavbarHome.css";
import { Link } from "react-router-dom";
import Register from "../Register";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from "../Login";
import UserInfo from "../UserInfo";

const NavbarHome = () => {

  const history = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete('/logout');
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="navbarHome">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <a className="logo nav-link dropdown-toggle-ls" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          dictaphone
        </a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown ">
              <div className="dropdown-menu border-dark" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item  " href="#"><Link to="records">
                  <button type="button" className="btn "> YOUR RECORDS </button>
                </Link></a>
                <a className="dropdown-item" href="#">
                  <Link to="settings">
                    <button type="button" className="btn "> SETTINGS </button>
                  </Link></a>
              </div>
            </li>
            <li className="nav-item">
              <UserInfo />
            </li>
            <div className="authentication">
              <div className="dropdown2 ">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle-ls text-dark  " href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                    SIGN IN
                  </a>
                  <div className="dropdown-menu dropdown-menu-right border-dark" aria-labelledby="navbarDropdownMenuLink">

                    <div className="registration">
                      <Register />
                    </div>

                  </div>

                </li>
              </div>
              <div className="dropdown3">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle-ls text-dark  " href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                    LOGIN
                  </a>
                  <div className="dropdown-menu border-dark dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                    <Login />
                    <button onClick={Logout} className="button is-light">
                      Log Out
                    </button>
                  </div>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </nav >





    </div >




  );
};


export default NavbarHome;