import React from 'react';
import './Footer.css';
import logo from '../../assets/ico/logo.webp';

const Footer = () => {
    return (
        <div>
            <footer>
                <div className="container">
                    <img src={logo} alt="logo" />
                    <p>2023</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;