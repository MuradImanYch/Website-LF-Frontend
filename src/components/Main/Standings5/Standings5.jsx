import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';

import uelLogo from '../../../assets/ico/uelLogo.webp';

SwiperCore.use([Navigation]);

const Standings5 = () => {
    const [uelStandings1, setUelStandings1] = useState();
    const [uelStandings2, setUelStandings2] = useState();
    const [uelStandings3, setUelStandings3] = useState();

    let endpoints = ['/standings/uela', '/standings/uelb', '/standings/uelc', '/standings/ueld', '/standings/uele', '/standings/uelf', '/standings/uelg', '/standings/uelh'];
    let endpoints2 = [];
    let endpoints3 = [];
    let endpoints4 = [];

    let selected1 = endpoints[Math.floor(Math.random() * endpoints.length)];
    endpoints.splice(endpoints.indexOf(selected1), 1);
    endpoints.map((e) => {
        endpoints2.push(e);
    });
        
    let selected2 = endpoints2[Math.floor(Math.random() * endpoints2.length)];
    endpoints2.splice(endpoints2.indexOf(selected2), 1);
    endpoints2.map((e) => {
        endpoints3.push(e);
    });

    let selected3 = endpoints3[Math.floor(Math.random() * endpoints3.length)];
    endpoints3.splice(endpoints3.indexOf(selected2), 1);
    endpoints3.map((e) => {
        endpoints4.push(e);
    });

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(selected1)
            .then(response => {
                setUelStandings1(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup.split(' ')[1]} key={'uelStandings1' + i}>
                        <div className="group">{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name'>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games">{e.games}</span>
                                    <div className="forAgainst">
                                        <span className='for'>{e.goalsFor}</span>
                                        <span>:</span>
                                        <span className='against'>{e.goalsAgainst}</span>
                                    </div>
                                    <div className="points">{e.points}</div>
                                </div>
                            </div>
                    </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get(selected2)
            .then(response => {
                setUelStandings2(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup.split(' ')[1]} key={'uelStandings2' + i}>
                        <div className="group">{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name'>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games">{e.games}</span>
                                    <div className="forAgainst">
                                        <span className='for'>{e.goalsFor}</span>
                                        <span>:</span>
                                        <span className='against'>{e.goalsAgainst}</span>
                                    </div>
                                    <div className="points">{e.points}</div>
                                </div>
                            </div>
                    </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get(selected3)
            .then(response => {
                setUelStandings3(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup.split(' ')[1]} key={'uelStandings3' + i}>
                        <div className="group">{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name'>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games">{e.games}</span>
                                    <div className="forAgainst">
                                        <span className='for'>{e.goalsFor}</span>
                                        <span>:</span>
                                        <span className='against'>{e.goalsAgainst}</span>
                                    </div>
                                    <div className="points">{e.points}</div>
                                </div>
                            </div>
                    </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        fetchData();
    }, []);

    return (
        <div className='table5xn standingsEurocups'>
                <section id='standings5QckNav'>
                    <h2 className="sectionName">Турнирная таблица - Лига европы</h2>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛЕ'><img src={uelLogo} alt="ЛЕ" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {uelStandings1}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛЕ'><img src={uelLogo} alt="ЛЕ" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {uelStandings2}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛЕ'><img src={uelLogo} alt="ЛЕ" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {uelStandings3}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings5;