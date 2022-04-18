import React from 'react';
import "./ContactUs.css"
import { Link } from "react-router-dom";

import Contact from '../../components/Contact/Contact';


const ContactUs = () => {
    return (
        <div>

            <div className="dictaphoneLegalNotice"><Link to="/">
                <button type="button" class="big-logo btn -lg " >dictaphone</button>
            </Link>

                <Contact />
            </div>

        </div>
    );
};

export default ContactUs;