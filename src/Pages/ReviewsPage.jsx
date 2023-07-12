import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/style/projects.css"
import Project from "../components/Project.jsx";
import Projects from "../api/projects.js";
import {HashLoader} from "react-spinners";
import Lang from "../utils/lang.js";

const ReviewsPage = () => {
    const [isFetching,setIsFetching] = useState(true)
    const [data,setData] = useState([])
    const [counts,setCounts] = useState({})
    const [activeParam,setActiveParam] = useState('ALL')
    const fetchData = async (type = null) => {
        if(type) {
            setActiveParam(type)
        }
        setIsFetching(true)
        const res = await Projects.getProjects({
            Type:type
        })
        setData(res)
        setIsFetching(false)
    }

    const fetchCount = async () => {
        const res = await Projects.getProjectsCount()
        setCounts(res)
    }

    const fetchAllData = async () => {
        await Promise.all([fetchData(activeParam),fetchCount()])
    }

    useEffect(() => {
        fetchAllData()
    },[])
const text = Lang.getCurrentText()
    return (
        <div>
            {isFetching ? <HashLoader style={{position:"absolute",top: "50%",left: "50%"}} color="#32549E" size={70} />
                : (
                <div className="reviewsPage">
                    <Header/>
                    <div className="reviewsPage-header">{text.reviews}</div>
                    <div className="projects-container">
                        <div className="projects">
                            {data.map((item,index) => (
                                <Project item={item} key={index}/>
                            ))}
                        </div>
                    </div>
                    <Footer/>
                </div>
            )}
        </div>
    );
};

export default ReviewsPage;