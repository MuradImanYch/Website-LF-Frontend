import React, {useState, useEffect} from 'react';
import './Video.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import $ from 'jquery';
import LazyLoad from 'react-lazy-load';
import {Helmet} from 'react-helmet-async';
import playIco from '../../../assets/ico/playIco.webp';

const Video = () => {
    const[news, setNews] = useState();
    const[currentPage, setCurrentPage] = useState(1);
    const[newsCount, setNewsCount] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/news/videoNews')
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
                    return  <div key={'video' + e.id} className="cart" id={'id' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img"><LazyLoad offset={800}><img loading="lazy" alt={e.title} src={e.img} /></LazyLoad></div>
                                    <h3>{e.title}</h3>
                                    <span className='date'>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes} <span className='views'>👁 {`${e && e.views?.split(',').length > 0 ? e.views?.split(',').length : '0'}`}</span></span>
                                    <span className='category'><span className="likes">❤ {`${e && e.likes?.split(',').length > 0 ? e.likes?.split(',').length : '0'}`}</span> {`#${e.category}`}</span>
                                    <LazyLoad offset={800}><p className='playWrap'>
                                        <img loading="lazy" src={playIco} alt="playIco" />
                                    </p></LazyLoad>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }

        // fetchData();
    }, [currentPage]);

    const selectPagPage = (e) => {
        setCurrentPage($(e.target).text());
        $('.pagination a').css({background: '#fff', color: '#000'}).removeClass('selected');
        $(e.target).addClass('selected');
        $('#news .newsHr section').hide();
        $('#news .newsHr section').fadeIn();
    }

    return (
        <div id='videoOther' className='newsHr'>
            <Helmet>
                <title>Видеоматериалы, голы, сюжеты</title>
                <meta name="description" content="Видео голов, сюжетов, увлекательные видеоматериалы. Насладитесь лучшими голами, увидьте эпические сюжеты и оцените аналитику специалистов." />
                <meta name="keywords" content="видео голов, сюжеты, увлекательные видеоматериалы, наслаждение голами, эпические сюжеты, оценка аналитики, специалисты, футбольные голы, захватывающие моменты, видео ролики, лучшие голы, футбольные сюжеты, спортивные видеоматериалы, футбольные моменты, голы в футболе, футбольные хайлайты" />
            </Helmet>
            <h1 className="pageName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Видео</h1>
            <section>
                {news}
            </section>
            <ul className='pagination'>
                {newsCount && Array(Math.ceil(newsCount / 30)).fill(1).map((value, index) => <li key={`page${value + index}`}><a onClick={selectPagPage} href='#'>{value + index}</a></li>)}
            </ul>
        </div>
    );
};

export default Video;