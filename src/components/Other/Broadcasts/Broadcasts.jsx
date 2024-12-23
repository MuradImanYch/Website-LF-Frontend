import React, { useEffect, useState } from 'react';
import './Broadcasts.css';
import Tippy from '@tippyjs/react';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import $ from 'jquery';
import translate from 'translate';

import config from '../../../conf.json';

const convertGermanToclientTime = (germanTime) => {
    const [hours, minutes] = germanTime.split(':').map(Number);
    const germanDate = new Date();
    germanDate.setHours(hours);
    germanDate.setMinutes(minutes);

    const clientUTCOffset = new Date();
    const clientDate = new Date(germanDate.getTime() + ((-clientUTCOffset.getTimezoneOffset() / 60) - 0) * 60 * 60 * 1000);
    const clientTime = `${clientDate.getHours()}:${clientDate.getMinutes().toString().padStart(2, '0')}`;

    return clientTime;
};

const Broadcasts = () => {
    const [item, setItem] = useState([]);
    const [translatedHNames, setTranslatedHNames] = useState({});
    const [translatedANames, setTranslatedANames] = useState({});
    const [translatedLNames, setTranslatedLNames] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/broadcasts/get');
                const data = response.data;
                setItem(data);

                const translatedHNames = {};
                const translatedANames = {};
                const translatedLNames = {};

                for (const e of data) {
                    translatedHNames[e.id] = config['correct-translations'][`${await translate(e.hName, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.hName, {to: 'ru'})}`] : await translate(e.hName, {to: 'ru'});
                    translatedANames[e.id] = config['correct-translations'][`${await translate(e.aName, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.aName, {to: 'ru'})}`] : await translate(e.aName, {to: 'ru'});
                    translatedLNames[e.id] = config['correct-translations'][`${await translate(e.lName, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.lName, {to: 'ru'})}`] : await translate(e.lName, {to: 'ru'});
                }

                setTranslatedHNames(translatedHNames);
                setTranslatedANames(translatedANames);
                setTranslatedLNames(translatedLNames);
            } catch (err) {
                console.log(err);
            }
        };

        // fetchData();
    }, []);

    return (
        <div className='otherBroadcasts'>
            <Helmet>
                <title>Смотреть матчи бесплатно - Трансляции матчей без фризов</title>
                <meta name="description" content="Смотрите бесплатные онлайн трансляции матчей своих любимых команд, прямые эфиры главных спортивных событий на нашем сайте." />
                <meta name="keywords" content="смотреть матч, бесплатные матчи, онлайн трансляция матчей, прямые трансляции спорта, спортивные трансляции бесплатно, смотреть онлайн, трансляции евро 2024 смотреть онлайн" />
            </Helmet>
            <h1 style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null} className="pageName">Онлайн трансляции матчей</h1>
            <div className="wrap">
                {item && item.length > 0 ? item.map(e => (
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Смотреть' key={'broadcast' + e.id}>
                        <Link to={`/broadcast/watch/${cyrillicToTranslit().transform(e && (e.id + '-' + e.hName.replace(' ', '-').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh') + '-' + e.aName.replace(' ', '-').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh') + '-' + e.lName.replace(' ', '-').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh')).replace(/\s+/g, '-').toLowerCase())}`} id={'broadcast' + e.id}>
                            <div className="col">
                                <div>
                                    <LazyLoad offset={800}>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}>
                                            <img loading="lazy" src={e.hLogo} alt={e.hName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span>{translatedHNames[e.id] || e.hName}</span>
                                </div>
                                <div className='timeLive'>
                                    <span>{translatedLNames[e.id] || e.lName}</span>
                                    {e.broadcastLink === null || e.broadcastLink === '' ? (
                                        <span>{convertGermanToclientTime(e.time)}</span>
                                    ) : (
                                        <span style={{ color: 'red', letterSpacing: '1.3px' }}>
                                            live <br />
                                            <div className="liveTime">{convertGermanToclientTime(e.time)}</div>
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span>{translatedANames[e.id] || e.aName}</span>
                                    <LazyLoad offset={800}>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}>
                                            <img loading="lazy" src={e.aLogo} alt={e.aName} />
                                        </Tippy>
                                    </LazyLoad>
                                </div>
                            </div>
                        </Link>
                    </Tippy>
                )) : <div className='noData'>Данных нет</div>}
            </div>
        </div>
    );
};

export default Broadcasts;
