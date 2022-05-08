import React from 'react';
import './NavbarSettings.css'

import { Link } from 'react-router-dom';

const NavbarSettings = () => {
    return (
        <div class="containerSettings">
            <div class="row ">

                <button type="button" class="btn btn-light col-3 bg-white text-center btn-lg border rounded-0">  <Link to="/">
                    <button type="button" className="btn "> RETURN </button>
                </Link>
                </button>
                <div class="col-7 text-light text-center">
                    SETTINGS
                </div>

            </div>
        </div>
    );
};

export default NavbarSettings;