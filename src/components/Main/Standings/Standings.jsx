import React, { useEffect, useState } from 'react';
import './Standings.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import rplLogo from '../../../assets/ico/rplLogo.webp';
import eplLogo from '../../../assets/ico/eplLogo.webp';
import laligaLogo from '../../../assets/ico/laligaLogo.webp';
import bundesligaLogo from '../../../assets/ico/bundesligaLogo.webp';
import serieaLogo from '../../../assets/ico/serieaLogo.webp';
import ligue1Logo from '../../../assets/ico/ligue1Logo.webp';
import axios from 'axios';

SwiperCore.use([Navigation]);

const StandingsSlider = () => {
    const [rplStandings, setRplStandings] = useState(); 
    const [eplStandings, setEplStandings] = useState(); 
    const [laligaStandings, setLaligaStandings] = useState(); 
    const [bundesligaStandings, setBundesligaStandings] = useState(); 
    const [serieaStandings, setSerieaStandings] = useState(); 
    const [ligue1Standings, setLigue1Standings] = useState(); 

    useEffect(() => { 
        axios.get('/rplStandings')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('rplStandings', JSON.stringify(response.data));
            }
            setRplStandings(JSON.parse(localStorage.getItem('rplStandings')) && JSON.parse(localStorage.getItem('rplStandings')).splice(0, 8).map((e, i) => {
                return <div id={'rplStandings' + i} key={'rplStandings' + i} className="col">
                            <div className="left">
                                <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                <Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy>
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
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/eplStandings')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('eplStandings', JSON.stringify(response.data));
            }
            setEplStandings(JSON.parse(localStorage.getItem('eplStandings')) && JSON.parse(localStorage.getItem('eplStandings')).splice(0, 8).map((e, i) => {
                return <div id={'eplStandings' + i} key={'eplStandings' + i} className="col">
                            <div className="left">
                                <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                <Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy>
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
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/laligaStandings')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('laligaStandings', JSON.stringify(response.data));
            }
            setLaligaStandings(JSON.parse(localStorage.getItem('laligaStandings')) && JSON.parse(localStorage.getItem('laligaStandings')).splice(0, 8).map((e, i) => {
                return <div id={'laligaStandings' + i} key={'laligaStandings' + i} className="col">
                            <div className="left">
                                <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                <Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy>
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
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/bundesligaStandings')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('bundesligaStandings', JSON.stringify(response.data));
            }
            setBundesligaStandings(JSON.parse(localStorage.getItem('bundesligaStandings')) && JSON.parse(localStorage.getItem('bundesligaStandings')).splice(0, 8).map((e, i) => {
                return <div id={'bundesligaStandings' + i} key={'bundesligaStandings' + i} className="col">
                            <div className="left">
                                <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                <Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy>
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
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/serieaStandings')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('serieaStandings', JSON.stringify(response.data));
            }
            setSerieaStandings(JSON.parse(localStorage.getItem('serieaStandings')) && JSON.parse(localStorage.getItem('serieaStandings')).splice(0, 8).map((e, i) => {
                return <div id={'serieaStandings' + i} key={'serieaStandings' + i} className="col">
                            <div className="left">
                                <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                <Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy>
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
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/ligue1Standings')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('ligue1Standings', JSON.stringify(response.data));
            }
            setLigue1Standings(JSON.parse(localStorage.getItem('ligue1Standings')) && JSON.parse(localStorage.getItem('ligue1Standings')).splice(0, 8).map((e, i) => {
                return <div id={'ligue1Standings' + i} key={'ligue1Standings' + i} className="col">
                        <div className="left">
                            <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                            <Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy>
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
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className='table5xn' id='standings'>
            <section>
                <h3 className="sectionName">Турнирная таблица - Чемпионаты</h3>
                <Swiper navigation spaceBetween={50} grabCursor={true} breakpoints={{280: {slidesPerView: 1}, 768: {slidesPerView: 2}, 1024: {slidesPerView: 3}}}>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='РПЛ'>
                                <img src={rplLogo} alt="РПЛ" />
                            </Tippy>
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {rplStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='АПЛ'><img src={eplLogo} alt="АПЛ" /></Tippy>
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {eplStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='Ла-лига'><img src={laligaLogo} alt="Ла-лига" /></Tippy>
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {laligaStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='Бундеслига'><img src={bundesligaLogo} alt="Бундеслига" /></Tippy>
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {bundesligaStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='Серия А'><img src={serieaLogo} alt="Серия А" /></Tippy>
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {serieaStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='Лига 1'><img src={ligue1Logo} alt="Лига 1" /></Tippy>
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {ligue1Standings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default StandingsSlider;