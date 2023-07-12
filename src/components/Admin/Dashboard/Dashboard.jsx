import React, { useEffect } from 'react';
import './Dashboard.css';

const Main = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    return (
        <div id="dashboard">
            dash
        </div>
    );
};

export default Main;