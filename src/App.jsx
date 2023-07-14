import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import ScrollToTop from "react-scroll-to-top";
import {IoIosArrowUp} from "react-icons/io"
import InfoPage from "./Pages/InfoPage.jsx";
import NewsPage from "./Pages/NewsPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ReviewsPage from "./Pages/ReviewsPage.jsx";
import SingleNewsPage from "./Pages/SingleNewsPage.jsx";
import {ToastContainer} from "react-toastify";

function App() {

    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route exact path={"/"} element={<HomePage/>}/>
                    <Route exact path={"/about"} element={<AboutPage/>}/>
                    <Route exact path={"/reviews"} element={<ReviewsPage/>}/>
                    <Route exact path={"/useful-info/:id"} element={<InfoPage/>}/>
                    <Route exact path={"/news"} element={<NewsPage/>}/>
                    <Route exact path={"/news/:id"} element={<SingleNewsPage/>}/>
                </Routes>
                <ScrollToTop smooth top={400} style={{background: "#5A9367",zIndex:"1"}}
                             component={<IoIosArrowUp size={26} color={"white"}/>}/>
            </BrowserRouter>
        </>
    )
}

export default App
