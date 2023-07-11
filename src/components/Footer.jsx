import React, {useEffect, useState} from 'react';
import "../assets/style/index.css"
import logo from "../assets/images/logo7a.png";
import {Link} from "react-router-dom";
import {
    TiSocialFacebookCircular, TiSocialInstagramCircular, TiSocialLinkedinCircular, TiSocialYoutubeCircular
} from "react-icons/ti"
import {FiPhoneCall} from "react-icons/fi";
import {SlLocationPin} from "react-icons/sl"
import {MdOutlineMailOutline} from "react-icons/md"
import Settings from "../api/settings.js";
import Lang from "../utils/lang.js";

const Footer = () => {
    const [data, setData] = useState({})
    const [phone, setPhone] = useState([])
    const text = Lang.getCurrentText()

    const fetchData = async () => {
        const res = await Settings.getData()
        setData(res)
        setPhone(res.phone.split(","))
        if (res?.defaultLanguage && !localStorage.getItem('lang')) {
            localStorage.setItem('lang', res?.defaultLanguage)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (<div className="footer">
        <a href="/" className="logo">
            <img className="logo" src={logo} alt=""/>
        </a>

        <div className="footer-contacts">
            <h3 className="title">{text.contact_info}</h3>
            <div className="phone">
                <FiPhoneCall/>
                <div className="phones">
                    {phone.map((item) => {
                        const phoneNumber = item.replace(/[^\d\s]/g, '').replace(/\s/g, ''); // Remove non-numeric and whitespace characters
                        return <a key={item} href={`tel:+${phoneNumber}`}>{item}</a>;
                    })}
                </div>
            </div>
            <div className="email">
                <MdOutlineMailOutline/>
                                <a href={`mailto:${data?.mailAdressForContact}`}>{data?.mailAdressForContact}</a>

            </div>
            <div className="location">
                <SlLocationPin/>
                <a href="https://www.google.com/maps/place/Hidro+İnşaat+Servis+MMC/@40.4105742,49.8561134,17z/data=!3m1!4b1!4m6!3m5!1s0x40307d566558a067:0x3088ec9cf282fac3!8m2!3d40.4105743!4d49.8609789!16s%2Fg%2F11g6wv7603"
                   target="_blank" rel="noreferrer">{text.show_in_map}</a>
            </div>
        </div>

        <div className="social-icons">
            <div className="title">{text.follow_us}</div>
            <div className="icons">
                <Link className="fb" target="_blank"
                      to={data?.facebook}><TiSocialFacebookCircular size={40}/></Link>
                <Link className="linkedin" target="_blank" to={data?.linkedin}><TiSocialLinkedinCircular
                    size={40}/></Link>
                <Link className="instagram" target="_blank" to={data?.instagram}><TiSocialInstagramCircular
                    size={40}/></Link>
                <Link className="youtube" target="_blank" to={data?.youTube}><TiSocialYoutubeCircular
                    size={40}/></Link>
            </div>
        </div>
        <p>2023 © Bariatric MMC. {text.all_rights_reserved}</p>
    </div>);
};

export default Footer;
