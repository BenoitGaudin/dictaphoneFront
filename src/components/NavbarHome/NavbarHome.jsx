import React, { useState } from "react";
import "./NavbarHome.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";











const NavbarHome = () => {




  return (
    <div className="navbarHome">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <a className="logo nav-link dropdown-toggle-ls" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          dictaphone
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
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

            <div className="authentication">
              <div className="dropdown2 ">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle-ls text-dark  " href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                    SIGN IN
                  </a>
                  <div className="dropdown-menu dropdown-menu-right border-dark" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">
                      <div className="registration">

                      </div>
                    </a>

                    <a className="dropdown-item" href="#">

                      <Navbar />

                    </a>

                  </div>

                </li>
              </div>


              <div className="dropdown3">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle-ls text-dark  " href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                    LOGIN
                  </a>
                  <div className="dropdown-menu border-dark dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">
                      <div className="login">


                      </div>
                    </a>

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