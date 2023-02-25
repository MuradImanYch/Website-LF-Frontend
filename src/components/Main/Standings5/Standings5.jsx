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

    let endpoints = ['https://legfootball.herokuapp.com/uelStandingsA', 'https://legfootball.herokuapp.com/uelStandingsB', 'https://legfootball.herokuapp.com/uelStandingsC', 'https://legfootball.herokuapp.com/uelStandingsD', 'https://legfootball.herokuapp.com/uelStandingsE', 'https://legfootball.herokuapp.com/uelStandingsF', 'https://legfootball.herokuapp.com/uelStandingsG', 'https://legfootball.herokuapp.com/uelStandingsH'];

    useEffect(() => {
        const fetchData = async () => {
            function getMultipleRandom(endpoints, num) {
                const shuffled = [...endpoints].sort(() => 0.5 - Math.random());
              
                return shuffled.slice(0, num);
            }
            let selected1 = getMultipleRandom(endpoints, 3)[0];
            let selected2 = getMultipleRandom(endpoints, 3)[1];
            let selected3 = getMultipleRandom(endpoints, 3)[2];
    
            await axios.get(selected1)
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('uelStandings1', JSON.stringify(response.data));
                }
                setUelStandings1(JSON.parse(localStorage.getItem('uelStandings1')) && JSON.parse(localStorage.getItem('uelStandings1')).map((e, i) => {
                    return <div className={'id' + e.group.split(' ')[1]} key={'uelStandings1' + i}>
                        <div className="group">{e.group}</div>
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
                if(response.data.length > 0) {
                    localStorage.setItem('uelStandings2', JSON.stringify(response.data));
                }
                setUelStandings2(JSON.parse(localStorage.getItem('uelStandings2')) && JSON.parse(localStorage.getItem('uelStandings2')).map((e, i) => {
                    return <div className={'id' + e.group.split(' ')[1]} key={'uelStandings2' + i}>
                        <div className="group">{e.group}</div>
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
                if(response.data.length > 0) {
                    localStorage.setItem('uelStandings3', JSON.stringify(response.data));
                }
                setUelStandings3(JSON.parse(localStorage.getItem('uelStandings3')) && JSON.parse(localStorage.getItem('uelStandings3')).map((e, i) => {
                    return <div className={'id' + e.group.split(' ')[1]} key={'uelStandings3' + i}>
                        <div className="group">{e.group}</div>
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
                <section>
                    <h3 className="sectionName">Турнирная таблица - Лига европы</h3>
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