import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import './header.css';
import Logo from './img/logo.png';
import Login from '../Login';
import Logout from '../Logout';

const Header = ({ isAuthenticated, onStateChange }) => {

    //Encargado de agregar el fondo cuando existe scroll
    let selectHeader = document.querySelector('#header')    
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        document.addEventListener('scroll', headerScrolled)
    }

    return (
        <>
            <header id="header" className="header fixed-top">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
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
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                    <div className="d-flex">
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