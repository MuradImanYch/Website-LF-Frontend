import React from 'react';
import './Error.css';
import LazyLoad from 'react-lazy-load';

const Error = (props) => {
    return (
        <div id='error'>
            <LazyLoad offset={800}>
                <img src={ require(`../../assets/img/error404${Math.ceil(Math.random() * 4)}.jpg`) } alt="" />
            </LazyLoad>
        </div>
    );
};

export default Error;