import React from "react";

import FooterHome from '../../components/FooterHome/FooterHome';
import NavbarHome from '../../components/NavbarHome/NavbarHome';

import Dictaphone from "../../assets/magnéto-off.png"


import { Link } from "react-router-dom";



import "./Home.css"

import 'animate.css';



const Home = () => {
    return (

        <div >

            <NavbarHome />


            <div className="animate__animated animate__bounce ">

                <div className="imageBordure responsive">

                    <div className='imgDictaphone'>
                        <Link to="DictaphoneAudio">


                            <img src={Dictaphone} alt=" image of a dictaphone" />

                        </Link>
                    </div>


                </div>
            </div>

            <div className="copyright">
                <p> .COPYRIGHT © 2022 ALL RIGHTS RESERVED.</p>
            </div>




            <FooterHome />





        </div >



    );
};

export default Home;