import React from 'react';
import "./FooterHome.css";
import { Link } from "react-router-dom";


const FooterHome = () => {
    return (

        <div className="footer">
            <div className="bottomHome">
                <div className="legalNotice "> <Link to="LegalNotice"><button type="button" className="btn">

                    LEGAL NOTICE </button>
                </Link>

                </div>

                <div className="contactUs">  <Link to="ContactUs"><button type="button" className="btn ">
                    CONTACT US</button>
                </Link>

                </div>

                <div className="privacyPolicy text-dark"><Link to="privacyPolicy"><button type="button" className="btn ">
                    PRIVACY POLICY</button>
                </Link>
                </div>
            </div>

            <div className="text-footer">
                YOU CAN RECORD YOUR VOICE, MODIFY IT, SELECT WHAT YOU WANT TO KEEP. YOU CAN ALSO SAVE YOUR VOICE ON YOUR COMPUTER AND KEEP YOUR FILES ON THE SITE IN UNLIMITED NUMBER.

            </div>

        </div>



    );
};

export default FooterHome;