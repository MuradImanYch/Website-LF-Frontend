import React, { useEffect, useState } from 'react';
import './TopScores2.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import $ from 'jquery';

import uclLogo from '../../../assets/ico/uclLogo.webp';
import uelLogo from '../../../assets/ico/uelLogo.webp';
import ueclLogo from '../../../assets/ico/ueclLogo.webp';

SwiperCore.use([Navigation]);

const TopScores = () => {
    const [uclTopScores, setUclTopScores] = useState(); 
    const [uelTopScores, setUelTopScores] = useState(); 
    const [ueclTopScores, setUeclTopScores] = useState(); 

    useEffect(() => { 
        const fetchData = async () => {
            await axios.get('/standings/uclTS')
            .then(response => {
                setUclTopScores(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'uclTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={e.img} alt={e.player} /></Tippy></LazyLoad>
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
    
            await axios.get('/standings/uelTS')
            .then(response => {
                setUelTopScores(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'uelTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={e.img} alt={e.player} /></Tippy></LazyLoad>
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
    
            await axios.get('/standings/ueclTS')
            .then(response => {
                setUeclTopScores(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'ueclTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={e.img} alt={e.player} /></Tippy></LazyLoad>
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
        <div className='table6xn' id='topScores2'>
            <section id='topScores2QckNav'>
                <h2 className="sectionName">Бомбардиры - Еврокубки</h2>
                <Swiper navigation grabCursor={true} slidesPerView={1}>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={'ЛЧ'}><img loading="lazy" src={uclLogo} alt="ЛЧ" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {uclTopScores && uclTopScores.length > 0 ? uclTopScores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/ucl/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={'ЛЕ'}><img loading="lazy" src={uelLogo} alt="ЛЕ" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {uelTopScores && uelTopScores.length > 0 ? uelTopScores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/ucl/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={'ЛК'}><img loading="lazy" src={ueclLogo} alt="ЛК" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {ueclTopScores && ueclTopScores.length > 0 ? ueclTopScores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/ucl/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default TopScores;