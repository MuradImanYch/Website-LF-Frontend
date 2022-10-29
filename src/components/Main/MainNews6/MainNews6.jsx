import React, { useEffect, useState } from 'react';
import './MainNews6.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainNews6 = () => {
    const[mainNews, setMainNews] = useState();

    useEffect(() => {
        axios.get('/myNews')
        .then(response => {
            setMainNews(response.data && response.data.reverse().splice(8, 6).map((e) => {
                let date = new Date(e.date);
                let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth()) : String(date.getMonth());
                let year = date.getFullYear();
                let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());

                const animIn = () => { // anim mouse in
                    $(`#mainNews6 #${'id' + e.id} .img img`).css({'transform': 'scale(1.04)'});
                    $(`#mainNews6 #${'id' + e.id}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                    $(`#mainNews6 #${'id' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                    $(`#mainNews6 #${'id' + e.id} .img img`).css({'opacity': '1'});
                }
                const animOut = () => { // anim mouse out
                    $(`#mainNews6 #${'id' + e.id} .img img`).css({'transform': 'scale(1)'});
                    $(`#mainNews6 #${'id' + e.id}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                    $(`#mainNews6 #${'id' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                    $(`#mainNews6 #${'id' + e.id} .img img`).css({'opacity': '0.8'});
                }
                return <div key={'key' + e.id} className="cart" id={'id' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                <Link to={`/news/${e.id}`}>
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
        <div className='newsVr' id='mainNews6'>
            <section>
                {mainNews}
            </section>
        </div>
    );
};

export default MainNews6;