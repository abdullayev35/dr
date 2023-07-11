import React, {useEffect, useRef, useState} from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import "../assets/style/reviews.css"
import Lang from "../utils/lang.js";
import CertificatesApi from "../api/certificates.js";
import Lightbox from "yet-another-react-lightbox";
import {Autoplay, Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";
import {Link} from "react-router-dom";

const Reviews = () => {

    const [data, setData] = useState([])
    const text = Lang.getCurrentText()
    const fetchData = async () => {
        const res = await CertificatesApi.getCertificates()
        setData(res)
    }
    const [open, setOpen] = React.useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const slides = data?.map((item) => ({src: `https://cdn.3steps.az/his-content/` + item?.imageUrl}));


    useEffect(() => {
        fetchData()
    }, [])

    const swiperRef = useRef(null);

    const goPrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const goNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    return (
        <section className="reviews-container" id="reviews">
            <h1>{text.reviews.toUpperCase()}</h1>
            <div className="reviews">
                <div className="rev-desc-container">
                    <p className="review-desc">Yüzlərlə pasiyenti sağlam və gözəl bədən quruluşuna qovuşdurduq! Siz də qəbula yazılaraq mədəkiçiltmə
                        əməliyyatı ilə artıq çəkinizdən qurtulun və bizdən məmnun ayrılan pasientlərimizdən biri olun!</p>
                    <Link className="all_rev" to="/reviews">{text.all_reviews}</Link>
                </div>
                <div className="swip">
                    <Swiper
                        autoplay={true}
                        navigation={{prevEl: '.prev-button', nextEl: '.next-button'}} modules={[Navigation, Autoplay]}
                        loop={true}
                        className="mySwiper2">
                        {data.map((item, index) => (
                            <SwiperSlide className="review-slider" key={index}>
                                <img
                                    src={`https://cdn.3steps.az/his-content/` + item?.imageUrl}
                                    alt={item?.title}
                                    onClick={() => {
                                        setOpen(true);
                                        setSelectedImageIndex(index);
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                        {open && (
                            <Lightbox
                                open={open}
                                close={() => setOpen(false)}
                                slides={slides}
                                index={selectedImageIndex}
                            />
                        )}
                    </Swiper>
                    <div className="buttons">
                        <button className="custom-button prev-button"><BsArrowLeft className="svg" size={40}
                                                                                   color="#4F2CB7"/></button>
                        <button className="custom-button next-button"><BsArrowRight className="svg" size={40}
                                                                                    color="#4F2CB7"/></button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
