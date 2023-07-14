import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/style/singlenews.css"
import {useParams} from "react-router-dom";
import News from "../api/news.js";
import {HashLoader} from "react-spinners";

const SingleNewsPage = () => {

    const {id} = useParams()
    const [data, setData] = useState({})
    const [isFetching, setIsFetching] = useState(true)

    const fetchData = async () => {
        setIsFetching(true)
        const res = await News.getSingleNews(id)
        setData(res)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [id])

    return (
        <div>

            {isFetching ? (
                <HashLoader style={{position: "absolute", top: "50%", left: "50%"}} color="#5A9367" size={70}/>
            ) : (
                <div>
                    <Header/>
                    <div className="singleNewsPage-container">
                        <div className="news-header">
                            <h1>{data.title}</h1>
                            <span className="date">{data.createDate.split('T')[0]}</span>
                        </div>
                        <div className="singleNewsPage">
                            <div className="img-container">
                                <img src={`https://cdn.3steps.az/his-content/` + data?.imageUrl} alt=""/>
                            </div>
                            <div className="content-container" dangerouslySetInnerHTML={{__html:data?.description}}/>
                        </div>
                    </div>
                    <Footer/>
                </div>)}
        </div>
    );
};

export default SingleNewsPage;