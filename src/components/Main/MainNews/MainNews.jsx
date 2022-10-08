import React, { useEffect, useState } from 'react';
import './MainNews.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const News = () => {
    const[mainNews, setMainNews] = useState(); 
    
    useEffect(() => { 
            $.ajax({
                type: "GET",
                url: '/mainNews',
            }).done(function (response) {
                if(response.length > 0) {
                    localStorage.setItem('mainNews', JSON.stringify(response));
                }
                setMainNews(JSON.parse(localStorage.getItem('mainNews')) && JSON.parse(localStorage.getItem('mainNews')).splice(1, 6).map((news, i) => {
                    const animIn = () => { // anim mouse in
                        $(`.mainNews #${'id' + i} .img img`).css({'transform': 'scale(1.04)'});
                        $(`.mainNews #${'id' + news.i}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                        $(`.mainNews #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                        $(`.mainNews #${'id' + i} .img img`).css({'opacity': '1'});
                    }
                    const animOut = () => { // anim mouse out
                        $(`.mainNews #${'id' + i} .img img`).css({'transform': 'scale(1)'});
                        $(`.mainNews #${'id' + i}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                        $(`.mainNews #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                        $(`.mainNews #${'id' + i} .img img`).css({'opacity': '0.8'});
                    }
                    return  <div key={'key' + i} className="cart" id={'id' + i} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <Link to={`/news/${news.id}`}>
                                    <div className="img"><img alt={news.title} src={news.img} /></div>
                                    <h3>{news.title}</h3>
                                    <span>{news.date}</span>
                                </Link>
                            </div>
                })); 
            });
    }, []);  
    

    return (
        <div className="mainNews">
            <section>
                {mainNews}
            </section>
        </div>
    );
};

export default News;