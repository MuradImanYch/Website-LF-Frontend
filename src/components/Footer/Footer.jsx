import React, { useEffect, useState } from 'react';
import './Footer.css';
import logo from '../../assets/ico/logo.webp';

const Footer = () => {
    const[date, setDate] = useState();

    useEffect(() => {
        let myDate = new Date();
        setDate(myDate.getFullYear());
    }, []);
 
    return (
        <div>
            <footer>
                <div className="container">
                    <img loading="lazy" src={logo} alt="logo" />
                    <p>© {date} Legendary Football</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;