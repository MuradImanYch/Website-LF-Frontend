import React, { useEffect, useState } from 'react';
import './TransferNews.css';
import $ from 'jquery';

const TransferNews = () => {
    const[transferNews, setTransferNews] = useState();

    useEffect(() => {
        $.ajax({
            type: "GET",
            url: '/transferNews',
        }).done((response) => {
            setTransferNews(response && response.splice(0, 8).map((e, i) => {
                const animIn = () => { // anim mouse in
                    $(`#transferNews #${'id' + i} .img img`).css({'transform': 'scale(1.04)'});
                    $(`#transferNews #${'id' + i}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                    $(`#transferNews #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                    $(`#transferNews #${'id' + i} .img img`).css({'opacity': '1'});
                }
                const animOut = () => { // anim mouse out
                    $(`#transferNews #${'id' + i} .img img`).css({'transform': 'scale(1)'});
                    $(`#transferNews #${'id' + i}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                    $(`#transferNews #${'id' + i} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                    $(`#transferNews #${'id' + i} .img img`).css({'opacity': '0.8'});
                }
                return <div key={'key' + i} className="cart" id={'id' + i} onMouseEnter={animIn} onMouseLeave={animOut}>
                <a href={'https://footballhd.ru/' + e.src} target="__blank">
                    <div className="img"><img alt={e.title} src={e.img} /></div>
                    <h3>{e.title}</h3>
                    <span>{e.date}</span>
                </a>
            </div>
            }));
        });
    }, []);

    return (
        <div id='transferNews'>
            <section>
                <h3 className="sectionName">Трансферные новости</h3>
                {transferNews}
            </section>
        </div>
    );
};

export default TransferNews;