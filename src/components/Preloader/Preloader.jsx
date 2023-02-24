import React from 'react';
import './Preloader.css';
import preloadImgL from '../../assets/ico/logoL.png';
import preloadImgF from '../../assets/ico/logoF.png';

const Preloader = () => {
    return (
        <div id='preloader'>
            <div className='imgWrap'>
                <img src={preloadImgL} alt="preloadImgL" />
                <img src={preloadImgF} alt="preloadImgF" />
            </div>
        </div>
    );
};

export default Preloader;