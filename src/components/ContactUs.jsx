import React, {useEffect, useState} from 'react';
import "../assets/style/map.css"
import "../assets/style/contact.css"
import MapComponent from "./MapComponent.jsx";
import ContactForm from "./ContactForm.jsx";
import Lang from "../utils/lang.js";
import CertificatesApi from "../api/certificates.js";
import Settings from "../api/settings.js";
import {useLocation} from "react-router-dom";

const ContactUs = () => {

    const [lang,setLang] = useState('')

    const text = Lang.getCurrentText(lang)
    const fetchData = async () =>{
        const res = await Settings.getData()
        setLang(res.defaultLanguage)
    }

    useEffect(()=>{
        fetchData()
    },[])
    const location = useLocation();

    return (
        <section className="container contacts-container" id={location.pathname === '/' ? 'contact' : ''}>
            <h1>{text.contact_us.toUpperCase()}</h1>
            <div className="contact">
                <MapComponent/>
                <ContactForm/>
            </div>
        </section>
    );
};

export default ContactUs;