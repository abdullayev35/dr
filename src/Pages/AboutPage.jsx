import React, {useEffect, useState} from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import {BsChevronDown} from "react-icons/bs";
import "../assets/style/safety.css"
import Lang from "../utils/lang.js";
import Constants from "../api/constants.js";
import {HashLoader} from "react-spinners";
import ContactUs from "../components/ContactUs.jsx";
import YouTubePlayer from "../components/YoutubePlayer.jsx";
const AboutPage = () => {


    const videoIds = ['I8D8zpLqpw8' ,'1RkseDeYS9g']
    const text = Lang.getCurrentText()
    const [data, setData] = useState({})
    const [isFetching, setIsFetching] = useState(true)

    const fetchData = async () => {
        const res = await Constants.getAbout()
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

    return (
        <div>

            {isFetching ? (
                <HashLoader style={{position: "absolute", top: "50%", left: "50%"}} color="#4F2CB7" size={70}/>
            ) : (
                <div className="aboutPage" id="about">
                    <Header/>
                    <div className="safety-container container">
                        <div className="safety">
                            <div className="safety-img-container">
                                <img className="safety-img" src={`https://cdn.3steps.az/his-content/` + data?.imageUrl}/>
                            </div>
                        </div>
                    </div>

                    <div className="safety-info">
                        <h1>{text.about}</h1>
                        <div className="desc-container">
                            <div className="about-description" dangerouslySetInnerHTML={{__html:data?.description}}></div>
                            <div className="yt">
                                {videoIds.map((videoId) => (
                                    <YouTubePlayer key={videoId} videoId={videoId} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>)}
        </div>
    );
};

export default AboutPage;
