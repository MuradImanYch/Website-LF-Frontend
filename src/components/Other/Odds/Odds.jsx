import React, { useEffect, useState } from 'react';
import './Odds.css';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';

const Forecasts = () => {
    const[forecasts, setForecasts] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        function convertGermanToclientTime(germanTime) {
            // Разбиваем строку времени на часы и минуты
            const [hours, minutes] = germanTime.split(':').map(Number);
          
            // Создаем объект Date с текущей датой и временем в немецкой временной зоне
            const germanDate = new Date();
            germanDate.setHours(hours);
            germanDate.setMinutes(minutes);

            const clientUTCOffset = new Date();
          
            // Добавляем разницу между немецким и иранским временем (2.5 часа)
            const clientDate = new Date(germanDate.getTime() + ((-clientUTCOffset.getTimezoneOffset() / 60) - 3) * 60 * 60 * 1000);
          
            // Получаем иранское время в формате "чч:мм"
            const clientTime = `${clientDate.getHours()}:${clientDate.getMinutes().toString().padStart(2, '0')}`;
          
            return clientTime;
          }
          
        const fetchData = async () => {
            await axios.get('/forecasts/odds')
            .then(response => {
                setForecasts(response.data && response.data.map((e, i) => {
                    return  <div className="col" key={'forecasts' + i}>
                                <div>
                                    <div className="head"><span>{e.lCountryName}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>{e.lName}</span></div>
                                    <div className="center">
                                        <div className="home"><LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}><img loading="lazy" src={e.hLogo} alt={e.hName} /></Tippy></LazyLoad><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.hName}</span></div>
                                        <div className="dateTime"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff', borderBottom: '1px solid #fff'} : null}>{e.date}</span><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{convertGermanToclientTime(e.time)}</span></div>
                                        <div className="away"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.aName}</span><LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}><img loading="lazy" src={e.aLogo} alt={e.aName} /></Tippy></LazyLoad></div>
                                    </div>
                                </div>
                                <div className="coefWrap">
                                    <div className="w1">
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Победа первой команды"><span>П1</span></Tippy>
                                        <span>{e.w1 === '' ? '-' : e.w1}</span>
                                    </div>
                                    <div className="w1">
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничья"><span>Х</span></Tippy>
                                        <span>{e.draw === '' ? '-' : e.draw}</span>
                                    </div>
                                    <div className="w1">
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Победа второй команды"><span>П2</span></Tippy>
                                        <span>{e.w2 === '' ? '-' : e.w2}</span>
                                    </div>
                                    <div className="w1">
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Будет забито меньше 2-ух (включительно) мячей"><span>ТМ 2.5</span></Tippy>
                                        <span>{e.totalU === '' ? '-' : e.totalU}</span>
                                    </div>
                                    <div className="w1">
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Будет забито больше 3-ёх (включительно) мячей"><span>ТБ 2.5</span></Tippy>
                                        <span>{e.totalO === '' ? '-' : e.totalO}</span>
                                    </div>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }

        // fetchData();
    }, []);
        
    return (
        <div id='forecastsOther'>
            <Helmet>
                <title>Котировки на матчи - Онлайн список коэффициентов</title>
                <meta name="description" content="Узнайте актуальные котировки на матчи вашей любимой команды. Анализируйте коэффициенты и делайте осмысленные ставки с нашими надежными котировками." />
                <meta name="keywords" content="котировки на матчи, ставки на спорт, спортивные ставки, коэффициенты на футбол, котировки на баскетбол, теннисные ставки, ставки на спортивные события, спортивные коэффициенты, спортивные ставки онлайн, актуальные котировки, спортивные победы" />
            </Helmet>
            <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Котировки на матчи</h1>
            <section>
                {forecasts}
            </section>
        </div>
    );
};

export default Forecasts;