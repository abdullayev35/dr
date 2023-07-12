import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/style/career.css"
import Lang from "../utils/lang.js";
import Constants from "../api/constants.js";
import {HashLoader} from "react-spinners";
import ContactUs from "../components/ContactUs.jsx";

const CareerPage = () => {

    const text = Lang.getCurrentText()
    const [data, setData] = useState({})
    const [isFetching, setIsFetching] = useState(true)

    const fetchData = async () => {
        const res = await Constants.getCareer()
        setData(res)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>

            {isFetching ? (
                <HashLoader style={{position: "absolute", top: "50%", left: "50%"}} color="#4F2CB7" size={70}/>
            ) : (

                <div className="careerPage">
                    <Header/>
                    <div className="career-container">
                        <div className="newsPage-header">{text.career}</div>
                        <div className="description" dangerouslySetInnerHTML={{__html:data?.description1}}>
                        </div>
                        <div className="career-img-container">
                            <div className="career-img" style={{
                                backgroundImage: `url(${`https://cdn.3steps.az/his-content/` + data?.imageUrl})`,
                                height: '60vh',
                                width: '100%',
                                backgroundAttachment: 'fixed',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                overflow: 'hidden'
                            }}>
                            </div>
                        </div>
                        <div className="description" dangerouslySetInnerHTML={{__html:data?.description2}}>
                        </div>
                    </div>
                    <ContactUs/>
                    <Footer/>
                </div>)}
        </div>
    );
};

export default CareerPage;