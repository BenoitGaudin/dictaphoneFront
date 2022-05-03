import React, { useState } from "react";


import './App.css';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";




import Home from './screens/Home/Home';
import Records from './screens/Records/Records';
import Settings from "./screens/Settings/Settings";

import LegalNotice from "./screens/LegalNotice/LegalNotice";
import ContactUs from "./screens/ContactUs/ContactUs";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";


import DictaphoneAudio from "./screens/DictaphoneAudio/DictaphoneAudio";








const App = () => {
  return (


    <div>



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Records" element={<Records />} />
        <Route path="Settings" element={<Settings />} />

        <Route path="LegalNotice" element={<LegalNotice />} />
        <Route path="ContactUs" element={<ContactUs />} />
        <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="DictaphoneAudio" element={<DictaphoneAudio />} />




      </Routes>



    </div>


  );
}

export default App;
