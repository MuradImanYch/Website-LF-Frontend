import React, { useEffect, useState } from 'react';
import './TopScores.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import $ from 'jquery';

import rplLogo from '../../../assets/ico/rplLogo.webp';
import eplLogo from '../../../assets/ico/eplLogo.webp';
import laligaLogo from '../../../assets/ico/laligaLogo.webp';
import bundesligaLogo from '../../../assets/ico/bundesligaLogo.webp';
import serieaLogo from '../../../assets/ico/serieaLogo.webp';
import ligue1Logo from '../../../assets/ico/ligue1Logo.webp';
import person from '../../../assets/ico/person.webp';

SwiperCore.use([Navigation]);

const TopScoresSlider = () => {
    const [rplTopScores, setRplTopScores] = useState(); 
    const [eplTopScores, setEplTopScores] = useState(); 
    const [laligaTopScores, setLaligaTopScores] = useState(); 
    const [bundesligaTopScores, setBundesligaTopScores] = useState(); 
    const [serieaTopScores, setSerieaTopScores] = useState(); 
    const [ligue1TopScores, setLigue1TopScores] = useState(); 

    useEffect(() => { 
        const fetchData = async () => {
            await axios.get('/standings/rplTS')
            .then(response => {
                setRplTopScores(response.data && response.data.splice(1, 8).map((e, i) => {
                    return <div key={'rplTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={e.img} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.tName}><img loading="lazy" src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span className="goals" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goals ? e.goals : '0'}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.pen === '(undefined' ? '(0)' : e.pen}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/eplTS')
            .then(response => {
                setEplTopScores(response.data && response.data.splice(1, 8).map((e, i) => {
                    return <div key={'eplTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={person} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.tName}><img loading="lazy" src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span className="goals" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goals ? e.goals : '0'}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.pen === '(undefined' ? '(0)' : e.pen}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/laligaTS')
            .then(response => {
                setLaligaTopScores(response.data && response.data.splice(1, 8).map((e, i) => {
                    return <div key={'laligaTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={person} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.tName}><img loading="lazy" src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="goals">{e.goals ? e.goals : '0'}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.pen === '(undefined' ? '(0)' : e.pen}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/bundesligaTS')
            .then(response => {
                setBundesligaTopScores(response.data && response.data.splice(1, 8).map((e, i) => {
                    return <div key={'bundesligaTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={person} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.tName}><img loading="lazy" src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="goals">{e.goals ? e.goals : '0'}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.pen === '(undefined' ? '(0)' : e.pen}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/serieaTS')
            .then(response => {
                setSerieaTopScores(response.data && response.data.splice(1, 8).map((e, i) => {
                    return <div key={'serieaTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={person} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.tName}><img loading="lazy" src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="goals">{e.goals ? e.goals : '0'}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.pen === '(undefined' ? '(0)' : e.pen}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/ligue1TS')
            .then(response => {
                setLigue1TopScores(response.data && response.data.splice(1, 8).map((e, i) => {
                    return <div key={'ligue1TopScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={person} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.tName}><img loading="lazy" src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="goals">{e.goals ? e.goals : '0'}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.pen === '(undefined' ? '(0)' : e.pen}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
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
        <div className='table6xn'>
            <section id='topScoresQckNav'>
                <h2 className="sectionName">Бомбардиры - Чемпионаты</h2>
                <Swiper navigation spaceBetween={50} grabCursor={true} breakpoints={{280: {slidesPerView: 1}, 768: {slidesPerView: 2}, 1024: {slidesPerView: 3}}}>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='РПЛ'><img loading="lazy" src={rplLogo} alt="РПЛ" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {rplTopScores && rplTopScores.length > 0 ? rplTopScores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/rpl/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='АПЛ'><img loading="lazy" src={eplLogo} alt="АПЛ" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {eplTopScores && eplTopScores.length > 0 ? eplTopScores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/epl/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Ла лига'><img loading="lazy" src={laligaLogo} alt="Ла лига" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {laligaTopScores && laligaTopScores.length > 0 ? laligaTopScores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/laliga/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Серия А'><img loading="lazy" src={serieaLogo} alt="Серия А" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {serieaTopScores && serieaTopScores.length > 0 ? serieaTopScores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/seriea/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Бундеслига'><img loading="lazy" src={bundesligaLogo} alt="Бундеслига" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {bundesligaTopScores && bundesligaTopScores.length > 0 ? bundesligaTopScores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/bundesliga/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Лига 1'><img loading="lazy" src={ligue1Logo} alt="Лига 1" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {ligue1TopScores && ligue1TopScores.length > 0 ? ligue1TopScores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/ligue1/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default TopScoresSlider;