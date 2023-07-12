import React from 'react';
import Header from "../components/Header.jsx";
import CustomSwiper from "../components/CustomSwiper.jsx";
import UsefulInfo from "../components/UsefulInfo.jsx";
import Reviews from "../components/Reviews.jsx";
import Footer from "../components/Footer.jsx";
import ContactUs from "../components/ContactUs.jsx";
import Gallery from "../components/Gallery.jsx";
import NewsComponent from "../components/Bariatric.jsx";

const HomePage = () => {
    return (
        <div className="homePage">
            <Header/>
            <main>
                <CustomSwiper/>
                <NewsComponent/>
                <UsefulInfo/>
                <Reviews/>
                <Gallery/>
                <ContactUs/>
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;