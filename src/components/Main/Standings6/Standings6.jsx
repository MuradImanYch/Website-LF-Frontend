import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import $ from 'jquery';

import ueclLogo from '../../../assets/ico/ueclLogo.webp';

SwiperCore.use([Navigation]);

const Standings6 = () => {
    const [ueclStandings1, setUeclStandings1] = useState();
    const [ueclStandings2, setUeclStandings2] = useState();
    const [ueclStandings3, setUeclStandings3] = useState();

    let endpoints = ['/standings/uecla', '/standings/ueclb', '/standings/ueclc', '/standings/uecld', '/standings/uecle', '/standings/ueclf', '/standings/ueclg', '/standings/ueclh'];
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
                setUeclStandings1(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup.split(' ')[1]} key={'ueclStandings1' + i}>
                        <div className="group" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                    <div className="forAgainst">
                                        <span className='for' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goalsFor}</span>
                                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>:</span>
                                        <span className='against' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goalsAgainst}</span>
                                    </div>
                                    <div className="points" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.points}</div>
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
                setUeclStandings2(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup.split(' ')[1]} key={'ueclStandings2' + i}>
                        <div className="group" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                    <div className="forAgainst">
                                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='for'>{e.goalsFor}</span>
                                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>:</span>
                                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='against'>{e.goalsAgainst}</span>
                                    </div>
                                    <div className="points" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.points}</div>
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
                setUeclStandings3(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup.split(' ')[1]} key={'ueclStandings3' + i}>
                        <div className="group" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                    <div className="forAgainst">
                                        <span className='for' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goalsFor}</span>
                                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>:</span>
                                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='against'>{e.goalsAgainst}</span>
                                    </div>
                                    <div className="points" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.points}</div>
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
        <div className='table5xn standingsEurocups'>
                <section id='standings6QckNav'>
                    <h2 className="sectionName">Турнирная таблица - Лига конференции</h2>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='ЛК'><img loading="lazy" src={ueclLogo} alt="ЛК" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                            </div>
                            {ueclStandings1 && ueclStandings1.length > 0 ? ueclStandings1 : <div className='noData'>Данных нет</div>}
                            <Link to="/league/uecl/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='ЛК'><img loading="lazy" src={ueclLogo} alt="ЛК" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                            </div>
                            {ueclStandings2 && ueclStandings2.length > 0 ? ueclStandings2 : <div className='noData'>Данных нет</div>}
                            <Link to="/league/uecl/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='ЛК'><img loading="lazy" src={ueclLogo} alt="ЛК" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                            </div>
                            {ueclStandings3 && ueclStandings3.length > 0 ? ueclStandings3 : <div className='noData'>Данных нет</div>}
                            <Link to="/league/uecl/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings6;