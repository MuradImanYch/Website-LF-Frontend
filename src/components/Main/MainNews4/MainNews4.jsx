import React, { useEffect, useState } from 'react';
import './MainNews4.css';
import $ from 'jquery';

const MainNews4 = () => {
    const[mainNews, setMainNews] = useState(); 

    useEffect(() => { 
            $.ajax({
                type: "GET",
                url: '/mainNews4'
            }).done(function (response) {
                setMainNews(response && response.splice(0, 6).map((news, i) => {
                    const animIn = () => { // anim mouse in
                        $(`#mainNews4 #${'id' + i} .img img`).css({'transform': 'scale(1.04)'});
                        $(`#mainNews4 #${'id' + i}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                        $(`#mainNews4 #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                        $(`#mainNews4 #${'id' + i} .img img`).css({'opacity': '1'});
                    }
                    const animOut = () => { // anim mouse out
                        $(`#mainNews4 #${'id' + i} .img img`).css({'transform': 'scale(1)'});
                        $(`#mainNews4 #${'id' + i}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                        $(`#mainNews4 #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                        $(`#mainNews4 #${'id' + i} .img img`).css({'opacity': '0.8'});
                    }
                    return  <div key={'key' + i} className="cart" id={'id' + i} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <a href={news.src} target="__blank">
                                    <div className="img"><img alt={news.title} src={news.img} /></div>
                                    <h3>{news.title}</h3>
                                    <span>{news.date}</span>
                                </a>
                            </div>
                })); 
            });
    }, []); 

    return (
        <div id="mainNews4">
            <section>
                {mainNews}
            </section>
        </div>
    );
};

export default MainNews4;