import React, {useState, useEffect} from 'react';
import './UeclNews.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import $ from 'jquery';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import Helmet from 'react-helmet';

import ueclLogo from '../../../assets/ico/ueclLogo.webp';

const UeclNews = () => {
    const[news, setNews] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/news/ueclNews')
            .then(response => {
                setNews(response.data && response.data.reverse().map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                    let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());
    
                    const animIn = () => { // anim mouse in
                        $(`.newsHr #${'id' + e.id} .img img`).css({'transform': 'scale(1.04)'});
                        $(`.newsHr #${'id' + e.id}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                        $(`.newsHr #${'id' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                        $(`.newsHr #${'id' + e.id} .img img`).css({'opacity': '1'});
                    }
                    const animOut = () => { // anim mouse out
                        $(`.newsHr #${'id' + e.id} .img img`).css({'transform': 'scale(1)'});
                        $(`.newsHr #${'id' + e.id}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                        $(`.newsHr #${'id' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                        $(`.newsHr #${'id' + e.id} .img img`).css({'opacity': '0.8'});
                    }
                    return  <div key={'news' + e.id} id={'id' + e.id} className="cart" onMouseEnter={animIn} onMouseLeave={animOut}>
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img">
                                        <LazyLoad offset={800}>
                                            <img alt={e.title} src={e.img} />
                                        </LazyLoad>
                                    </div>
                                    <h3>{e.title}</h3>
                                    <span className='date'>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes} <span className='views'>👁 {`${e && e.views?.split(',').length > 0 ? e.views?.split(',').length : '0'}`}</span></span>
                                    <span className='category'><span className="likes">❤ {`${e && e.likes?.split(',').length > 0 ? e.likes?.split(',').length : '0'}`}</span> {`#${e.category}`}</span>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        fetchData();
    }, []);

    return (
        <div id='ueclNews' className='newsHr leagueNews'>
            <Helmet>
                <title>Новости Лиги Конференции (ЛК) - на Legendary Football</title>
                <meta name="description" content="Будьте в курсе всех новостей Лиги Конференции (ЛК) и европейском футболе в целом." />
                <meta name="keywords" content="уефа, новости уефа, лк, лига конференции, европейский футбол, футбол, рома, вест хем, новости, новости лк" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy content='ЛК'><img src={ueclLogo} alt="ueclLogo" /></Tippy>
                </LazyLoad>
                <h1 className="pageName">Новости - Лига конференций УЕФА</h1>
            </div>
            <section>
                {news}
            </section>
        </div>
    );
};

export default UeclNews;