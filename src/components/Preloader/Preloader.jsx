import React from 'react';
import './Preloader.css';
import preloadImgL from '../../assets/ico/logoL.png';
import preloadImgF from '../../assets/ico/logoF.png';
import Typewriter from 'typewriter-effect';

const Preloader = () => {
    return (
        <div id='preloader' style={localStorage.getItem('darkTheme') === 'true' ? {backgroundColor: 'rgb(34, 34, 34)'} : null}>
            <style>
                {`
                    #preloader > div.Typewriter > span.Typewriter__wrapper {
                        color: ${localStorage.getItem('darkTheme') === 'true' ? '#fff' : null};
                    }
                `}
            </style>
            <div className='imgWrap'>
                <img loading="lazy" src={preloadImgL} alt="preloadImgL" />
                <img loading="lazy" src={preloadImgF} alt="preloadImgF" />
            </div>
            <Typewriter
                onInit={(e) => {
                    e.typeString('Загрузка...').start()
                }}
                options={{
                    loop: true,
                    color: 'white'
                }}
            />
        </div>
    );
};

export default Preloader;