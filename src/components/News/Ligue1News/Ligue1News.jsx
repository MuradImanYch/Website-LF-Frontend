import React, {useState, useEffect} from 'react';
import './Ligue1News.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import $ from 'jquery';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import Helmet from 'react-helmet';

import ligue1Logo from '../../../assets/ico/ligue1Logo.webp';

const Ligue1News = () => {
    const[news, setNews] = useState();
    const[currentPage, setCurrentPage] = useState(1);
    const[newsCount, setNewsCount] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/news/ligue1News')
            .then(response => {
                setNewsCount(response.data.length);
                setNews(response.data && response.data.reverse().splice(currentPage * 30 - 30, 30).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth() + 1).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
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
                                            <img loading="lazy" alt={e.title} src={e.img} />
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
    }, [currentPage]);

    const selectPagPage = (e) => {
        setCurrentPage($(e.target).text());
        $('.pagination a').css({background: '#fff', color: '#000'}).removeClass('selected');
        $(e.target).addClass('selected');
        $('#news .newsHr section').hide();
        $('#news .newsHr section').fadeIn();
    }

    return (
        <div id='ligue1News' className='newsHr leagueNews'>
            <Helmet>
                <title>Новости Чемпионата Франции (Лига 1) - на Legendary Football</title>
                <meta name="description" content="Будьте в курсе всех новостей Чемпионата Франции (Лига 1) и французском футболе в целом." />
                <meta name="keywords" content="лига 1, чемпионат франции, французский футбол, футбол, псж, монако, олимпик лион, олимпик марсель, новости, новости лиги 1" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Лига 1'><img loading="lazy" src={ligue1Logo} alt="ligue1Logo" /></Tippy>
                </LazyLoad>
                <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Новости - Лига 1</h1>
            </div>
            <section>
                {news}
            </section>
            <ul className='pagination'>
                {newsCount && Array(Math.ceil(newsCount / 30)).fill(1).map((value, index) => <li key={`page${value + index}`}><a onClick={selectPagPage} href='#'>{value + index}</a></li>)}
            </ul>
        </div>
    );
};

export default Ligue1News;