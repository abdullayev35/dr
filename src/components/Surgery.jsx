import React, {useEffect, useState} from 'react';
import "../assets/style/surgery.css"
import Lang from "../utils/lang.js";
import News from "../api/news.js";
import {HashLoader} from "react-spinners";
import {LazyLoadComponent} from 'react-lazy-load-image-component';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

const NewsComponent = () => {

    const text = Lang.getCurrentText()

    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState([])
    const fetchData = async (count = 6) => {
        const res = await News.getLastNews({count})
        setData(res)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [isFetching])

    return (
        <section className="container surgery-section" id="surgery">
            {isFetching ?
                <HashLoader style={{position: "absolute", top: "50%", left: "50%"}} color="#5A9367" size={70}/>
                : (
                    <>
                        <h1>{text.surgery.toUpperCase()}</h1>
                        <div className="surgery-container">
                            <Accordion className="accordion-container">
                                {data.map((item) => (
                                    <AccordionItem className="accordion" key={item.id}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                {item?.title}
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <div
                                                dangerouslySetInnerHTML={{__html: item.description}}/>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </>
                )}
        </section>
    );
};

export default NewsComponent;