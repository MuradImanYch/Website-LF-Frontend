import React, { useEffect, useState } from 'react';
import './Standings.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
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
        const fetchData = async () => {
            await axios.get('/standings/rpl')
            .then(response => {
                setRplStandings(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'rplStandings' + i} className="col">
                                <div className="left">
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.description && e.description.includes('Лиги') ? e.description + ' (?)*' : e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat && e.descrLat.includes('Ligi') ? null : e.descrLat}`}>{e.place}</span></Tippy>
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
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/epl')
            .then(response => {
                setEplStandings(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'eplStandings' + i} className="col">
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
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/laliga')
            .then(response => {
                setLaligaStandings(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'laligaStandings' + i} className="col">
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
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/bundesliga')
            .then(response => {
                setBundesligaStandings(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'bundesligaStandings' + i} className="col">
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
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/seriea')
            .then(response => {
                setSerieaStandings(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'serieaStandings' + i} className="col">
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
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/ligue1')
            .then(response => {
                setLigue1Standings(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'ligue1Standings' + i} className="col">
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
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }

        // fetchData();
    }, []);

    return (
        <div className='table5xn' id='standings'>
            <section id='standingsQckNav'>
                <h2 className="sectionName">Турнирная таблица - Чемпионаты</h2>
                <Swiper navigation spaceBetween={50} grabCursor={true} breakpoints={{280: {slidesPerView: 1}, 768: {slidesPerView: 2}, 1024: {slidesPerView: 3}}}>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800} height={40}>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='РПЛ'>
                                    <img loading="lazy" src={rplLogo} alt="РПЛ" />
                                </Tippy>
                            </LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                        </div>
                        {rplStandings && rplStandings.length > 0 ? rplStandings : <div className='noData'>Данных нет</div>}
                        <Link to="/league/rpl/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='АПЛ'><img loading="lazy" src={eplLogo} alt="АПЛ" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                        </div>
                        {eplStandings && eplStandings.length > 0 ? eplStandings : <div className='noData'>Данных нет</div>}
                        <Link to="/league/epl/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Ла-лига'><img loading="lazy" src={laligaLogo} alt="Ла-лига" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                        </div>
                        {laligaStandings && laligaStandings.length > 0 ? laligaStandings : <div className='noData'>Данных нет</div>}
                        <Link to="/league/laliga/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Серия А'><img loading="lazy" src={serieaLogo} alt="Серия А" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                        </div>
                        {serieaStandings && serieaStandings.length > 0 ? serieaStandings : <div className='noData'>Данных нет</div>}
                        <Link to="/league/seriea/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Бундеслига'><img loading="lazy" src={bundesligaLogo} alt="Бундеслига" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                        </div>
                        {bundesligaStandings && bundesligaStandings.length > 0 ? bundesligaStandings : <div className='noData'>Данных нет</div>}
                        <Link to="/league/bundesliga/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Лига 1'><img loading="lazy" src={ligue1Logo} alt="Лига 1" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                        </div>
                        {ligue1Standings && ligue1Standings.length > 0 ? ligue1Standings : <div className='noData'>Данных нет</div>}
                        <Link to="/league/ligue1/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default StandingsSlider;