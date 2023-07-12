import React, {useEffect, useState} from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/style/project.css"
import {useParams} from "react-router-dom";
import Projects from "../api/projects.js";
import {HashLoader} from "react-spinners";
import Lang from "../utils/lang.js";

const ProjectPage = () => {
    const {id} = useParams()
    const [data, setData] = useState({})
    const [isFetching, setIsFetching] = useState(true)
    const text = Lang.getCurrentText()
    const slides = data?.imageUrls?.map((image) => ({src: `https://cdn.3steps.az/his-content/` + image?.imageUrl}));

    const [open, setOpen] = React.useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const fetchData = async () => {
        setIsFetching(true)
        const res = await Projects.getProject(id)
        setData(res)
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [id])

    return (
        <div>
            {isFetching ? (
                <HashLoader style={{position: "absolute", top: "50%", left: "50%"}} color="#4F2CB7" size={70}/>
            ) : (

                <div className="projectPage">
                    <Header/>
                    <div className="career-img" style={{
                        backgroundImage: `url(${`https://cdn.3steps.az/his-content/` + data?.selectedProject?.mainImageUrl})`,
                        height: '40vh',
                        width: '100%',
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        overflow: 'hidden',
                    }}>
                    </div>
                    <div className="projectPage-container">
                        <h1>{data?.selectedProject?.name}</h1>
                        <div className="projectPage-description" dangerouslySetInnerHTML={{__html:data?.selectedProject?.description}}>
                        </div>
                        {data?.imageUrls?.length > 0 && (
                            <div className="gallery">
                                <h2>{text.gallery}</h2>
                                <div className="gallery-images">
                                    {data?.imageUrls.map((image, index) => (
                                        <div className="gallery-img" key={index}>
                                            <img src={`https://cdn.3steps.az/his-content/` + image?.imageUrl} alt="" onClick={() => {
                                                setOpen(true)
                                                setSelectedImageIndex(index)
                                            }}/>
                                        </div>
                                    ))}
                                </div>
                                {open && <Lightbox
                                    open={open}
                                    close={() => setOpen(false)}
                                    slides={slides}
                                    index={selectedImageIndex}
                                />}
                            </div>
                        )}
                    </div>
                    <Footer/>
                </div>
            )}
        </div>
    );
};

export default ProjectPage;