import React, { useEffect, useState } from 'react';
import './Footer.css';
import logo from '../../assets/ico/logo.webp';
import {Link} from 'react-router-dom';

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
                        <div>
                            <img src={logo} alt="logo" />
                            <div className="links">
                                <li><Link to="/suggestions-complaints">— Предложения и жалобы</Link></li>
                                {/* <li>— Карьера</li> */}
                            </div>
                        </div>
                </div>
                <hr />
                <span className='copy'>© 2023 - {date} Legendary Football</span>
            </footer>
        </div>
    );
};

export default Footer;