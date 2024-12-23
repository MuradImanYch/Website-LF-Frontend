import React, { useEffect, useState } from 'react';
import './Standings3.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import $ from 'jquery';

import euroQualLogo from '../../../assets/ico/euroQualLogo.webp';

SwiperCore.use([Navigation]);

const Standings4 = () => {
    const [euroQualStandings1, setEuroQualStandings1] = useState();
    const [euroQualStandings2, setEuroQualStandings2] = useState();
    const [euroQualStandings3, setEuroQualStandings3] = useState();

    let endpoints = ['/standings/euroquala', '/standings/euroqualb', '/standings/euroqualc', '/standings/euroquald', '/standings/euroquale', '/standings/euroqualf', '/standings/euroqualg', '/standings/euroqualh', '/standings/euroquali', '/standings/euroqualj'];
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
                setEuroQualStandings1(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup} key={'euroQualStandings1' + i}>
                        <div className="group" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                    <div className="forAgainst">
                                        <span className='for' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goalsFor}</span>
                                        <span>:</span>
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
                setEuroQualStandings2(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup} key={'euroQualStandings2' + i}>
                        <div className="group" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass !== undefined ? 'Выход в финальную часть турнира' : 'Не квалифицировались'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                    <div className="forAgainst">
                                        <span className='for' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goalsFor}</span>
                                        <span>:</span>
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
    
            await axios.get(selected3)
            .then(response => {
                setEuroQualStandings3(response.data && response.data.map((e, i) => {
                    return <div className={'id' + e.standingsGroup} key={'euroQualStandings3' + i}>
                        <div className="group" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass !== undefined ? 'Выход в финальную часть турнира' : 'Не квалифицировались'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                    <div className="forAgainst">
                                        <span className='for' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goalsFor}</span>
                                        <span>:</span>
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
        }

        // fetchData();
    }, []);

    return (
        <div className='table5xn standingsEurocups' id="standings3">
                <section id='standings3QckNav'>
                    <h2 className="sectionName">Турнирная таблица - Европейская квалификация</h2>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Европейская квлф."><img loading="lazy" src={euroQualLogo} alt="Европейская квлф." /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span>Команда</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span>О</span></Tippy>
                            </div>
                            {euroQualStandings1 && euroQualStandings1.length > 0 ? euroQualStandings1 : <div className='noData'>Данных нет</div>}
                            <Link to="/league/eu-qualification/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Европейская квлф."><img loading="lazy" src={euroQualLogo} alt="Европейская квлф." /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span>Команда</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span>О</span></Tippy>
                            </div>
                            {euroQualStandings2 && euroQualStandings2.length > 0 ? euroQualStandings2 : <div className='noData'>Данных нет</div>}
                            <Link to="/league/eu-qualification/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Европейская квлф."><img loading="lazy" src={euroQualLogo} alt="Европейская квлф." /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span>Команда</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span>О</span></Tippy>
                            </div>
                            {euroQualStandings3 && euroQualStandings3.length > 0 ? euroQualStandings3 : <div className='noData'>Данных нет</div>}
                            <Link to="/league/eu-qualification/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings4;