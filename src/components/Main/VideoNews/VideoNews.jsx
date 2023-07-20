import React, { useEffect, useState } from 'react';
import './VideoNews.css';
import $ from 'jquery';
import playIco from '../../../assets/ico/playIco.webp';
import axios from 'axios';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

const VideoNews = () => {
    const[videoNews, setVideoNews] = useState(); 
    
    useEffect(() => { 
        const fetchData = async () => {
            await axios.get('/news/videoNews')
            .then(response => {
                setVideoNews(response.data && response.data.reverse().splice(0, 6).map((e, i) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                    let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());
    
                    const animIn = () => { // anim mouse in
                        $(`.newsVr #${'videoNews' + e.id} .img img`).css({'transform': 'scale(1.04)'});
                        $(`.newsVr #${'videoNews' + e.id}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                        $(`.newsVr #${'videoNews' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                        $(`.newsVr #${'videoNews' + e.id} .img img`).css({'opacity': '1'});
                    }
                    const animOut = () => { // anim mouse out
                        $(`.newsVr #${'videoNews' + e.id} .img img`).css({'transform': 'scale(1)'});
                        $(`.newsVr #${'videoNews' + e.id}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                        $(`.newsVr #${'videoNews' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                        $(`.newsVr #${'videoNews' + e.id} .img img`).css({'opacity': '0.8'});
                    }
                    return  <div key={'videoNews' + e.id} id={'videoNews' + e.id} className="cart" onMouseEnter={animIn} onMouseLeave={animOut}>  
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img">
                                        <LazyLoad offset={800}>
                                            <img loading="lazy" alt={e.title} src={e.img} />
                                        </LazyLoad>
                                    </div>
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
        
        fetchData();
    }, []); 


    return (
        <div className="newsVr" id='videoNews'>
            <section id='videoQckNav'>
                <h2 className="sectionName">Видео</h2>
                {videoNews && videoNews.length > 0 ? videoNews : <div className='noData'>Данных нет</div>}
            </section>
        </div>
    );
};

export default VideoNews;