import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import './header.css';
import * as helpers from './helpers';
import Logo from './img/logo.png';
import Login from '../Login';
import Logout from '../Logout';

const Header = ({ isAuthenticated, onStateChange }) => {

    useEffect(() => {
        /**
      * Toggle .header-scrolled class to #header when page is scrolled
      */
        let selectHeader = helpers.select('#header');
        if (selectHeader) {
            const headerScrolled = () => {
                if (window.scrollY > 50) {
                    selectHeader.classList.add('header-scrolled')
                } else {
                    selectHeader.classList.remove('header-scrolled')
                }
            }
            window.addEventListener('load', headerScrolled)
            helpers.onscroll(document, headerScrolled)
        }
    }, [])


    /**
     * Mobile nav dropdowns activate
     */
    helpers.on('click', '.navbar .dropdown > a', function (e) {
        if (helpers.select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    helpers.on('click', '.scrollto', function (e) {
        if (helpers.select(this.hash)) {
            e.preventDefault()

            let navbar = helpers.select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = helpers.select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            helpers.scrollto(this.hash)
        }
    }, true)

    const mobile = (e) => {
        /**
       * Mobile nav toggle
       */
        helpers.select('#navbar').classList.toggle('navbar-mobile')
        helpers.select('.mobile-nav-toggle').classList.toggle('bi-list')
        helpers.select('.mobile-nav-toggle').classList.toggle('bi-x')
    }

    return (
        <>
            <header id="header" className="header fixed-top">
                <div className="container-fluid container d-flex flex-wrap align-items-center justify-content-between">
                    {/* <div className="row">
                        <div className="col-12 col-md">
                        </div>
                        <div className="col-12 col-md">
                        </div>
                    </div> */}

                    <a href="/" className="logo d-flex align-items-center">
                        <img src={Logo} alt="" />
                        <span>BELLUMWARE</span>
                    </a>

                    <nav id="navbar" className="navbar justify-content-center">
                        <ul>
                            <li><Link className="nav-link scrollto active" to="/#hero">Home</Link></li>
                            <li><a className="nav-link scrollto" href="#about">About</a></li>
                            <li><a className="nav-link scrollto" href="#services">Services</a></li>
                            <li><a className="nav-link scrollto" href="#features">Features</a></li>
                            <li><a className="nav-link scrollto" href="#tecnology">Tecnology</a></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" onClick={mobile}></i>
                    </nav>
                    <div className="d-flex translateX mt-3 mt-md-0">
                        {isAuthenticated ? (
                            <Logout onStateChange={onStateChange} />
                        ) : (
                            <Login onStateChange={onStateChange} />
                        )}
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Header;