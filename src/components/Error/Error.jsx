import React from 'react';
import './Error.css';
import LazyLoad from 'react-lazy-load';
import {Helmet} from 'react-helmet-async';

const Error = (props) => {
    return (
        <div id='error'>
            <Helmet>
                <title>404 | Страница не найдена</title>
            </Helmet>
            <LazyLoad offset={800}>
                <img loading="lazy" src={ require(`../../assets/img/error404${Math.ceil(Math.random() * 4)}.jpg`) } alt="img" />
            </LazyLoad>
            <p>Ошибка 404 | Страница не найдена | <a href="/">Вернуться на главную</a></p>
        </div>
    );
};

export default Error;