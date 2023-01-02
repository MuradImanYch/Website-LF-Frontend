import React, { useEffect, useState } from 'react';
import './VideoNews.css';
import $ from 'jquery';
import playIco from '../../../assets/ico/playIco.webp';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VideoNews = () => {
    const[videoNews, setVideoNews] = useState(); 
    
    useEffect(() => { 
        axios.get('/videoNews')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('videoNews', JSON.stringify(response.data));
            }
            setVideoNews(JSON.parse(localStorage.getItem('videoNews')) && JSON.parse(localStorage.getItem('videoNews')).splice(0, 8).reverse().map((e, i) => {
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
                return  <div key={'videoNews' + e.id} id={'videoNews' + e.id} className="cart" onMouseEnter={animIn} onMouseLeave={animOut}>  <Link to={`/news/${e.id}`}>
                                <div className="img"><img alt={e.title} src={e.img} /></div>
                                <h3>{e.title}</h3>
                                <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                                <p className='playWrap'>
                                    <img src={playIco} alt="playIco" />
                                </p>
                            </Link>
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