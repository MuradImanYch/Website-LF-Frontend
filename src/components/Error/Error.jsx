import React from 'react';
import './Error.css';

const Error = (props) => {
    return (
        <div id='error'>
            <img src={ require(`../../assets/img/error404${Math.ceil(Math.random() * 4)}.jpg`) } alt="" />
        </div>
    );
};

export default Error;