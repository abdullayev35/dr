import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/style/reviews.css"
import Service from "../api/certificates.js";
import {HashLoader} from "react-spinners";
import Lang from "../utils/lang.js";
import Lightbox from "yet-another-react-lightbox";

const ReviewsPage = () => {
    const [isFetching,setIsFetching] = useState(true)
    const [data,setData] = useState([])
    const fetchData = async (type = null) => {
        setIsFetching(true)
        const res = await Service.getCertificates({
            Type:type
        })
        setData(res)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    },[])


    const [open, setOpen] = React.useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const slides = data?.map((item) => ({src: `https://cdn.3steps.az/his-content/` + item?.imageUrl}));

const text = Lang.getCurrentText()
    return (
        <div>
            {isFetching ? <HashLoader style={{position:"absolute",top: "50%",left: "50%"}} color="#5A9367" size={70} />
                : (
                <div className="reviewsPage">
                    <Header bgWhite={true}/>
                    <div className="reviewsPage-header">{text.reviews}</div>
                    <div className="reviews-container">
                        <div className="reviews-gallery">
                            {data.map((item,index) => (
                                <img
                                    src={`https://cdn.3steps.az/his-content/` + item?.imageUrl}
                                    alt={item?.title}
                                    onClick={() => {
                                        setOpen(true);
                                        setSelectedImageIndex(index);
                                    }}
                                />
                            ))}
                            {open && (
                                <Lightbox
                                    open={open}
                                    close={() => setOpen(false)}
                                    slides={slides}
                                    index={selectedImageIndex}
                                />
                            )}
                        </div>
                    </div>
                    <Footer/>
                </div>
            )}
        </div>
    );
};

export default ReviewsPage;