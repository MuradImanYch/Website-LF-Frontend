import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Standings4.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';

import uclLogo from '../../../assets/ico/uclLogo.webp';

SwiperCore.use([Navigation]);

const Standings4 = () => {
    const [uclStandings1, setUclStandings1] = useState();
    const [uclStandings2, setUclStandings2] = useState();
    const [uclStandings3, setUclStandings3] = useState();

    let endpoints = ['/standings/ucla', '/standings/uclb', '/standings/uclc', '/standings/ucld', '/standings/ucle', '/standings/uclf', '/standings/uclg', '/standings/uclh'];
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
                setUclStandings1(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup.split(' ')[1]} key={'uclStandings1' + i}>
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
                setUclStandings2(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup.split(' ')[1]} key={'uclStandings2' + i}>
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
                setUclStandings3(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup.split(' ')[1]} key={'uclStandings3' + i}>
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
        <div className='table5xn standingsEurocups' id="standings4">
                <section>
                    <h3 className="sectionName">Турнирная таблица - Лига чемпионов</h3>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛЧ'><img src={uclLogo} alt="ЛЧ" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {uclStandings1}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛЧ'><img src={uclLogo} alt="ЛЧ" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {uclStandings2}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛЧ'><img src={uclLogo} alt="ЛЧ" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {uclStandings3}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings4;