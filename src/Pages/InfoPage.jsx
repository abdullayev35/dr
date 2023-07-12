import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/style/service.css"
import {BsChevronDown} from "react-icons/bs";
import {useParams} from "react-router-dom";
import Service from "../api/service.js";
import {HashLoader} from "react-spinners";

const InfoPage = () => {

    const {id} = useParams()
    const [data, setData] = useState({})
    const [isFetching, setIsFetching] = useState(true)

    const fetchData = async () => {
        setIsFetching(true)
        const res = await Service.getService(id)
        setData(res)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const handleClick = () => {
        window.scrollTo({
            top: window.innerHeight - 148,
            behavior: "smooth"
        });
    };

    return (
        <div>
            {isFetching ? (
                <HashLoader style={{position: "absolute", top: "50%", left: "50%"}} color="#9acc91" size={70}/>
            ) : (
                <div className="servicePage">
                    <Header/>
                    <div className="service-container container">
                        <div className="service">
                            <div className="bg-image-container">
                                <div className="bg-image" style={{
                                    backgroundImage: `url(${`https://cdn.3steps.az/his-content/` + data?.imageUrl})`,
                                    height: '100vh',
                                    backgroundAttachment: 'fixed',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }}>
                                </div>
                            </div>
                            <BsChevronDown className="scroll-down" onClick={handleClick} size={50}/>
                        </div>
                        <div className="service-info">
                            <h1>{data?.title}</h1>
                            <div className="description" dangerouslySetInnerHTML={{__html:data?.description}}>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>)}
        </div>
    );
};

export default InfoPage;