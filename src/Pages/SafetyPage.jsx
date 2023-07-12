import React, {useEffect, useState} from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import {BsChevronDown} from "react-icons/bs";
import "../assets/style/safety.css"
import Lang from "../utils/lang.js";
import Constants from "../api/constants.js";
import {HashLoader} from "react-spinners";
import ContactUs from "../components/ContactUs.jsx";

const SafetyPage = () => {

    const [data, setData] = useState({})
    const [isFetching, setIsFetching] = useState(true)

    const fetchData = async () => {
        const res = await Constants.getSafety()
        setData(res)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = () => {
        window.scrollTo({
            top: window.innerHeight - 128,
            behavior: "smooth"
        });
    };
    const text = Lang.getCurrentText()
    return (
        <div>

            {isFetching ? (
                <HashLoader style={{position: "absolute", top: "50%", left: "50%"}} color="#4F2CB7" size={70}/>
            ) : (
                <div className="safetyPage">
                    <Header/>
                    <div className="safety-container container">
                        <div className="safety">
                            <div className="safety-img-container">
                                <img className="safety-img" src={`https://cdn.3steps.az/his-content/` + data?.imageUrl}/>
                            </div>
                        </div>
                    </div>

                    <div className="safety-info">
                        <h1>{text.hse_policy}</h1>
                        <div className="description" dangerouslySetInnerHTML={{__html:data?.description}}>
                        </div>
                    </div>
                        <ContactUs/>
                    <Footer/>
                </div>
            )}
        </div>
    );
};

export default SafetyPage;