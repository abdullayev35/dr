import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../assets/style/usefulInfo.css";
import {Autoplay, Pagination} from "swiper";
import Lang from "../utils/lang.js";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"
import Service from "../api/service.js";
import {HashLoader} from "react-spinners";

const UsefulInfo = () => {

    const text = Lang.getCurrentText()
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState([])
    const fetchData = async () => {
        const res = await Service.getServices()
        setData(res)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
        }, [isFetching])

    return (
        <section className="container" id="useful-info">
        
         {isFetching ? (
                <HashLoader style={{position: "absolute", top: "50%", left: "50%",background: "#031a3a"}} color="#4F2CB7" size={70}/>
            ) : (
                <>
                        <h1>{text.useful_info.toUpperCase()}</h1>
                        <div className="cards">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={20}
                                loop={true}
                                pagination={{
                                    clickable: true,
                                }}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                modules={[Pagination, Autoplay]}
                                className="mySwiper1"
                                breakpoints={{
                                    635: {
                                        slidesPerView: 2,
                                    },
                                    1000: {
                                        slidesPerView: 4,
                                    }
                                }}
                            >
                                {data?.map((item) => (
                                    <SwiperSlide key={item.id} className="card">
                                        <a className="link" href={`/useful-info/${item.id}`}>
                                            {text.read_more}
                                        </a>
                                        <LazyLoadImage
                                            src={`https://cdn.3steps.az/his-content/` + item?.imageUrl}
                                            effect="blur"
                                            alt={item.title}
                                            wrapperClassName="card-img"
                                            style={{
                                                objectFit: 'cover',
                                                width: "100%",
                                                height: "200px",
                                                borderRadius: "5px"
                                            }}
                                        />
                                        <div className="card-content">{item.title}</div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        </>
                        )}
        </section>
    );
};

export default UsefulInfo;
