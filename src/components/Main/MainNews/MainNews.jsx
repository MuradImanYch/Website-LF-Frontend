import React, { useEffect, useState } from 'react';
import './MainNews.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import axios from 'axios';

const News = () => {
    const[mainNews, setMainNews] = useState(); 
    
    useEffect(() => { 
        axios.get('/mainNews')
        .then(response => {
            setMainNews(response.data && response.data.reverse().splice(32, 6).map((e) => {
                let date = new Date(e.date);
                let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                let year = date.getFullYear();
                let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());

                const animIn = () => { // anim mouse in
                    $(`.newsHr #${'mainNews' + e.id} .img img`).css({'transform': 'scale(1.04)'});
                    $(`.newsHr #${'mainNews' + e.id}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                    $(`.newsHr #${'mainNews' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                    $(`.newsHr #${'mainNews' + e.id} .img img`).css({'opacity': '1'});
                }
                const animOut = () => { // anim mouse out
                    $(`.newsHr #${'mainNews' + e.id} .img img`).css({'transform': 'scale(1)'});
                    $(`.newsHr #${'mainNews' + e.id}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                    $(`.newsHr #${'mainNews' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                    $(`.newsHr #${'mainNews' + e.id} .img img`).css({'opacity': '0.8'});
                }
                return  <div key={'mainNews' + e.id} className="cart" id={'mainNews' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                            <Link to={`/news/read/${e.id}`}>
                                <div className="img"><img alt={e.title} src={e.img} /></div>
                                <h3>{e.title}</h3>
                                <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                            </Link>
                        </div>
            })); 
        })
        .catch(err => {
            console.log(err);
        });
    }, []);  
    

    return (
        <div className="newsHr" id='mainNews'>
            <section>
                {mainNews}
            </section>
        </div>
    );
};

export default News;