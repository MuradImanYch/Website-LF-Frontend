import React, {useState, useEffect} from 'react';
import './UelNews.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import uelLogo from '../../../assets/ico/uelLogo.webp';

const UelNews = () => {
    const[news, setNews] = useState();

    useEffect(() => {
        axios.get('/uelNews')
        .then(response => {
            setNews(response.data && response.data.reverse().map((e) => {
                let date = new Date(e.date);
                let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
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
                return  <div key={'key' + e.id} className="cart" id={'id' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
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
        <div id='uelNews' className='newsHr leagueNews'>
            <div className="logoPageName">
                <Tippy content='ЛЕ'><img src={uelLogo} alt="uelLogo" /></Tippy>
                <h1 className="pageName">Лига европы УЕФА</h1>
            </div>
            <section>
                {news}
            </section>
        </div>
    );
};

export default UelNews;