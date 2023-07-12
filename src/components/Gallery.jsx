import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";
import img1 from "../assets/images/img13.webp";
import img2 from "../assets/images/img2.webp";
import img3 from "../assets/images/img3.webp";
import img4 from "../assets/images/img1.webp";
import img5 from "../assets/images/img10.webp";
import img6 from "../assets/images/img6.webp";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../assets/style/gallery.css"
import Lang from "../utils/lang.js";
import Settings from "../api/settings.js";

const Gallery = () => {

    const [lang,setLang] = useState('')

    const text = Lang.getCurrentText(lang)
    const fetchData = async () =>{
        const res = await Settings.getData()
        setLang(res.defaultLanguage)
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <section className="container gallery-container certificates-container" id="gallery">
            <div className="gallery-head">
                <h1>{text.gallery.toUpperCase()}</h1>
                <a href="#" className="all">{text.all}</a>
            </div>
            <div className="certificates gallery">
                <div className="gallery">
                    <img src={img1} alt=""/>
                </div>
                <div className="gallery">
                    <img src={img2} alt=""/>
                </div>
                <div className="gallery">
                    <img src={img3} alt=""/>
                </div>
                <div className="gallery">
                    <img src={img4} alt=""/>
                </div>
                <div className="gallery">
                    <img src={img5} alt=""/>
                </div>
                <div className="gallery">
                    <img src={img6} alt=""/>
                </div>
                <div className="gallery">
                    <img src={img2} alt=""/>
                </div>
                <div className="gallery">
                    <img src={img1} alt=""/>
                </div>
            </div>
        </section>
    );
};

export default Gallery;