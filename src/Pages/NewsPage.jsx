import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Lang from "../utils/lang.js";
import {HashLoader} from "react-spinners";
import News from "../api/news.js";
import {LazyLoadComponent} from "react-lazy-load-image-component";

const NewsPage = () => {

    const [isFetching, setIsFetching] = useState(true)
    const [data,setData] = useState([])

    const fetchData = async () =>{
        const res = await News.getNews()
        setData(res)
        setIsFetching(false)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const text = Lang.getCurrentText()
    return (
        <div>
            {isFetching ?
                <HashLoader style={{position: "absolute", top: "50%", left: "50%"}} color="#5A9367" size={70}/>
                : (
                    <div className="surgeryPage">
                        <Header/>
                        <div className="newsPage-header">{text.news}</div>
                        <div className="news-container">
                            {data.map((item) => (
                                <LazyLoadComponent key={item.id}>
                                    <SingleSurgery item={item}/>
                                </LazyLoadComponent>
                            ))}
                        </div>

                        <Footer/>
                    </div>
                )
            }
        </div>
    )
};

export default NewsPage;