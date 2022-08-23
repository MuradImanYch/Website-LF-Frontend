import React, { useEffect, useState } from 'react';
import './MainNews3.css';
import $ from 'jquery';

const MainNews3 = () => {
    const[mainNews, setMainNews] = useState(); 

    useEffect(() => { 
            $.ajax({
                type: "GET",
                url: '/mainNews3'
            }).done(function (response) {
                setMainNews(response && response.splice(0, 6).map((news, i) => {
                    const animIn = () => { // anim mouse in
                        $(`#mainNews3 #${'id' + i} .img img`).css({'transform': 'scale(1.04)'});
                        $(`#mainNews3 #${'id' + i}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                        $(`#mainNews3 #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                        $(`#mainNews3 #${'id' + i} .img img`).css({'opacity': '1'});
                    }
                    const animOut = () => { // anim mouse out
                        $(`#mainNews3 #${'id' + i} .img img`).css({'transform': 'scale(1)'});
                        $(`#mainNews3 #${'id' + i}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                        $(`#mainNews3 #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                        $(`#mainNews3 #${'id' + i} .img img`).css({'opacity': '0.8'});
                    }
                    return  <div key={'key' + i} className="cart" id={'id' + i} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <a href={'https://www.euro-football.ru' + news.src} target="__blank">
                                    <div className="img"><img alt={news.title} src={news.img} /></div>
                                    <h3>{news.title}</h3>
                                    <span>{news.date}</span>
                                </a>
                            </div>
                })); 
            });
    }, []); 

    return (
        <div id="mainNews3">
            <section>
                {mainNews}
            </section>
        </div>
    );
};

export default MainNews3;