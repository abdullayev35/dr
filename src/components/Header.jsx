import React, {useEffect, useRef, useState} from 'react';
import logo from "../assets/images/logo7a.png"
import "../assets/style/index.css"
import {scroller} from "react-scroll"
import {Link, useLocation} from "react-router-dom"
import {HiMenuAlt3} from "react-icons/hi"
import {RiCloseLine} from "react-icons/ri"
import debounce from 'lodash/debounce';
import Lang from "../utils/lang.js";
import Settings from "../api/settings.js";
import {FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaYoutubeSquare} from "react-icons/fa";


const Header = ({bgWhite}) => {

    const [data, setData] = useState({})
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
    const [selectedFlag, setSelectedFlag] = useState(localStorage.getItem('lang'));
    const [showOtherFlags, setShowOtherFlags] = useState(false);

    const text = Lang.getCurrentText()

    const fetchData = async () => {
        const res = await Settings.getData();
        if (res?.defaultLanguage) {
            if (!localStorage.getItem('lang')) {
                localStorage.setItem('lang', res.defaultLanguage);
                setSelectedFlag(res.defaultLanguage);
            } else {
                setSelectedFlag(localStorage.getItem('lang'));
            }
        }
        setData(res);
    }


    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (sidebarIsOpen) {
            document.body.classList.add("no-scroll")
        } else {
            document.body.classList.remove("no-scroll")
        }
    }, [sidebarIsOpen])

    const handleFlagClick = (flag) => {
        localStorage.setItem('lang', flag)
        window.location.reload()
        setSelectedFlag(flag);
    };
    const handleMouseEnter = () => {
        setShowOtherFlags(true);
    };

    const handleMouseLeave = () => {
        setShowOtherFlags(false);
    };

    const location = useLocation();


    useEffect(() => {
        const hash = location.hash;
        if (hash === "#useful-info" || hash === "#surgery" || hash === "#contact" || hash === "#reviews"  || hash === "#gallery") {
            if (location.pathname === "/") {
                window.scrollTo({top: 0, behavior: "smooth"});
            } else {
                window.location.href = `/${hash}`;
            }
            scroller.scrollTo(hash.slice(1), {
                duration: 1,
                smooth: "easeInOutQuart",
            });
            setTimeout(() => {
                scroller.scrollTo(hash.slice(1), {
                    duration: 1,
                    smooth: "easeInOutQuart",
                });
            }, 1000);
        }
    }, [location]);


    const [activeSection, setActiveSection] = useState('');
    const currentUrl = useRef(new URL(window.location.href));

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = debounce(() => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset;

        let sectionInViewport = false;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.id;
                setActiveSection(id);

                // Update URL with section id
                currentUrl.current.hash = id;
                window.history.replaceState({}, '', currentUrl.current.href);

                sectionInViewport = true;
            }
        });

        if (!sectionInViewport && activeSection !== '') {
            // Set homepage URL if no sections are in viewport and activeSection is not already empty
            setActiveSection('');
            currentUrl.current.hash = '';
            window.history.replaceState({}, '', currentUrl.current.href);
        }
    }, 16);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            let isScrolled = window.scrollY > window.innerHeight;
            setScrolled(isScrolled);
            if (currentUrl.current.href.includes('/about')){
                isScrolled = window.scrollY > 260;
                setScrolled(isScrolled)
            }
            if (currentUrl.current.href.includes('/useful-info')){
                isScrolled = window.scrollY > 120;
                setScrolled(isScrolled)
            }
            if (currentUrl.current.href.includes('/reviews')) {
                isScrolled = 1
                setScrolled(isScrolled)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <header className="header">
            <nav className={`navbar ${scrolled || bgWhite ? 'bg-white' : ''}`}>
                <a href="/" className="logo">
                    <img className="logo" src={logo} alt=""/>
                </a>

                {/*NAVBAR*/}
                <div className="navigation">
                    <ul className="links">
                        <li>
                            <a
                                href="/about"
                                className={window.location.href.includes("about") ? 'active-link' : ''}
                            >
                                {text.about}
                            </a>
                        </li>
                        <li>
                            <Link
                                to="#surgery"
                                className={window.location.href.includes("#surgery") ? 'active-link' : ''}
                            >
                                {text.surgery}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#useful-info"
                                className={window.location.href.includes("useful-info") ? 'active-link' : ''}
                            >
                                {text.useful_info}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#reviews"
                                className={window.location.href.includes("reviews") ? 'active-link' : ''}
                            >
                                {text.reviews}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#gallery"
                                className={window.location.href.includes("gallery") ? 'active-link' : ''}
                            >
                                {text.gallery}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#contact"
                                className={window.location.href.includes("#contact") ? 'active-link' : ''}
                            >
                                {text.contact_us}
                            </Link>
                        </li>
                        <li>
                            <div className="lang-container" onMouseEnter={handleMouseEnter}
                                 onMouseLeave={handleMouseLeave}>
                                {selectedFlag === 'az' && <span className="fi fi-az"/>}
                                {selectedFlag === 'en' && <span className="fi fi-gb"/>}
                                {selectedFlag === 'ru' && <span className="fi fi-ru"/>}

                                {showOtherFlags && selectedFlag && (
                                    <div className="lang-options">
                                        {selectedFlag !== 'az' &&
                                            <span className="fi fi-az" onClick={() => handleFlagClick('az')}/>}
                                        {selectedFlag !== 'en' &&
                                            <span className="fi fi-gb" onClick={() => handleFlagClick('en')}/>}
                                        {selectedFlag !== 'ru' &&
                                            <span className="fi fi-ru" onClick={() => handleFlagClick('ru')}/>}
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
                <button className="menu-button" onClick={() => setSidebarIsOpen(true)}><HiMenuAlt3 size={30}/></button>
            </nav>
            {/*SIDEBAR*/}
            <>
                <div className={`sidebar-menu ${sidebarIsOpen && 'open'}`}>
                    <button className="sidebar-button" onClick={() => setSidebarIsOpen(false)}><RiCloseLine size={30}/>
                    </button>
                    <div className="tabs">
                        <ul>
                            <li>
                                <a
                                    href="/about"
                                    onClick={() => setSidebarIsOpen(false)}
                                >
                                    {text.about}
                                </a>
                            </li>
                            <li>
                                <Link
                                    to="#surgery"
                                    onClick={() => setSidebarIsOpen(false)}
                                >
                                    {text.surgery}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#useful-info"
                                    onClick={() => setSidebarIsOpen(false)}
                                >
                                    {text.useful_info}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#reviews"
                                    onClick={() => setSidebarIsOpen(false)}
                                >
                                    {text.reviews}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#gallery"
                                    onClick={() => setSidebarIsOpen(false)}
                                >
                                    {text.gallery}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#contact"
                                    onClick={() => setSidebarIsOpen(false)}
                                >
                                    {text.contact_us}
                                </Link>
                            </li>
                            <div className="sidebar-lang">
                                <span className="fi fi-gb" onClick={() => handleFlagClick('en')}></span>
                                <span className="fi fi-az" onClick={() => handleFlagClick('az')}></span>
                                <span className="fi fi-ru" onClick={() => handleFlagClick('ru')}></span>
                            </div>
                        </ul>

                    </div>
                    <div className="sidebar-icons">
                        <div className="title">{text.follow_us}</div>
                        <Link className="fb" target="_blank"
                              to={data?.facebook}><FaFacebookSquare size={34}/></Link>
                        <Link className="linkedin" target="_blank" to={data?.linkedin}><FaLinkedin
                            size={34}/></Link>
                        <Link className="instagram" target="_blank" to={data?.instagram}><FaInstagramSquare
                            size={34}/></Link>
                        <Link className="youtube" target="_blank" to={data?.youTube}><FaYoutubeSquare
                            size={34}/></Link>
                    </div>
                </div>
                {sidebarIsOpen && <div className="sidebar-overlay" onClick={() => setSidebarIsOpen(false)}></div>}
            </>
        </header>)
}
export default Header;
