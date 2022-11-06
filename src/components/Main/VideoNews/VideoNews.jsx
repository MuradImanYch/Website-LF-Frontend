import React, { useEffect, useState } from 'react';
import './VideoNews.css';
import $ from 'jquery';
import playIco from '../../../assets/ico/playIco.webp';
import axios from 'axios';

const VideoNews = () => {
    const[videoNews, setVideoNews] = useState(); 
    
    useEffect(() => { 
        axios.get('/videoNews')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('videoNews', JSON.stringify(response.data));
            }
            setVideoNews(JSON.parse(localStorage.getItem('videoNews')) && JSON.parse(localStorage.getItem('videoNews')).splice(0, 8).map((news, i) => {
                const animIn = () => { // anim mouse in
                    $(`.newsVr #${'id' + i} .img img`).css({'transform': 'scale(1.04)'});
                    $(`.newsVr #${'id' + i}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                    $(`.newsVr #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                    $(`.newsVr #${'id' + i} .img img`).css({'opacity': '1'});
                }
                const animOut = () => { // anim mouse out
                    $(`.newsVr #${'id' + i} .img img`).css({'transform': 'scale(1)'});
                    $(`.newsVr #${'id' + i}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                    $(`.newsVr #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                    $(`.newsVr #${'id' + i} .img img`).css({'opacity': '0.8'});
                }
                return  <div key={'key' + i} className="cart" id={'id' + i} onMouseEnter={animIn} onMouseLeave={animOut}>           <a href={news.src} target="__blank">
                                <div className="img"><img alt={news.title} src={news.img} /></div>
                                <h3>{news.title}</h3>
                                <span>{news.date}</span>
                                <p className='playWrap'>
                                    <img src={playIco} alt="playIco" />
                                </p>
                            </a>
                        </div>
            })); 
        })
        .catch(err => {
            console.log(err);
        });
}, []); 


    return (
        <div className="newsVr" id='videoNews'>
            <section>
            <h3 className="sectionName">Видео</h3>
                {videoNews}
            </section>
        </div>
    );
};

export default VideoNews;