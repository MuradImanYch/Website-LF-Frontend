import React, { useEffect, useState } from 'react';
import './Broadcasts.css';
import Tippy from '@tippyjs/react';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import $ from 'jquery';

import AdsenseAd from '../../Main/AdseseAd/AdsenseAd';

const Broadcasts = () => {
    const[item, setItem] = useState();

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
            const clientDate = new Date(germanDate.getTime() + ((-clientUTCOffset.getTimezoneOffset() / 60) - 4) * 60 * 60 * 1000);
          
            // Получаем иранское время в формате "чч:мм"
            const clientTime = `${clientDate.getHours()}:${clientDate.getMinutes().toString().padStart(2, '0')}`;
          
            return clientTime;
          }

        const fetchData = async () => {
            await axios.get('/broadcasts/get')
            .then(response => {
                setItem(response.data && response.data.map((e) => {    
                    return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Смотреть' key={'broadcast' + e.id}>
                                <Link to={`/broadcast/watch/${e.id + '-' + cyrillicToTranslit().transform(e.hName + '-' + e.aName + '-' + e.lName).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`} id={'broadcast' + e.id}>
                                    <div className="col">
                                        <div><LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}><img loading="lazy" src={e.hLogo} alt={e.hName} /></Tippy></LazyLoad><span>{e.hName}</span></div>
                                        <div className='timeLive'>
                                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.lName}><img loading="lazy" src={e.lLogo} alt={e.lName} /></Tippy></LazyLoad>
                                            {e.broadcastLink === null || e.broadcastLink === '' ? <span>{convertGermanToclientTime(e.time)}</span> : <span style={{color: 'red', letterSpacing: '1.3px'}}>live <br /><div className="liveTime">{convertGermanToclientTime(e.time)}</div></span>}
                                        </div>
                                        <div><span>{e.aName}</span><LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}><img loading="lazy" src={e.aLogo} alt={e.aName} /></Tippy></LazyLoad></div>
                                    </div>
                                </Link>
                            </Tippy>
                })); 
            })
            .catch(err => {
                console.log(err);
            }); 
        }
        
        fetchData();
    }, []); 

    return (
        <div className='otherBroadcasts'>
            <Helmet>
                <title>Онлайн трансляции матчей - на Legendary Football</title>
                <meta name="description" content="Смотрите онлайн трансляцию матчей своих любимых команд и спортивных событий на нашем сайте. Не упустите ни одной важной игры, наслаждайтесь прямыми трансляциями. Окунитесь в мир спортивных эмоций и захватывающих матчей, всё это доступно в режиме реального времени. Подключайтесь к онлайн трансляции матчей уже сегодня!" />
                <meta name="keywords" content="онлайн трансляция матчей, прямые трансляции спорта, спортивные трансляции онлайн, смотреть матчи в реальном времени, онлайн спорт, прямой эфир спортивных событий, трансляции футбола, трансляции баскетбола, онлайн трансляции тенниса, спортивные матчи онлайн, просмотр спортивных событий в интернете" />
            </Helmet>
            <h1 className="pageName">Онлайн трансляции матчей</h1>
            <div className="wrap">
                {item && item.length > 0 ? item : <div className='noData'>Данных нет</div>}
            </div>
            <AdsenseAd />
        </div>
    );
};

export default Broadcasts;