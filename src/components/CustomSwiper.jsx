import {Swiper, SwiperSlide} from "swiper/react";
import React from "react";
import {BsChevronDown} from "react-icons/bs"
import {LazyLoadImage} from 'react-lazy-load-image-component';


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import "../assets/style/swiper.css"

// import required modules
import img1 from '../assets/images/img1.webp'
import img2 from '../assets/images/img2.webp'
import img3 from '../assets/images/img3.webp'
import img4 from '../assets/images/img4.webp'
import img5 from '../assets/images/img5.webp'
import img6 from '../assets/images/img6.webp'

import {Autoplay, EffectFade, Pagination} from "swiper";

const CustomSwiper = () => {

    const images = [img2, img1, img3, img4, img5, img6]


    const handleClick = () => {
        window.scrollTo({
            top: window.innerHeight * 0.94,
            behavior: "smooth"
        });
    };

    return (
        <>
            <Swiper
                grabCursor={true}
                speed={2000}
                spaceBetween={30}
                centeredSlides={true}
                effect={"fade"}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade, Pagination]}
                className="mySwiper mainSwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <LazyLoadImage
                            src={image}
                            className="slider-image"
                            alt=""
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <BsChevronDown className="scroll-down" onClick={handleClick} size={50}/>
        </>
    );
};

export default CustomSwiper
