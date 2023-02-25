import React, { useEffect, useState } from 'react';
import './Standings2.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import LazyLoad from 'react-lazy-load';

import unlLogo from '../../../assets/ico/unlLogo.webp';
import Tippy from '@tippyjs/react';

SwiperCore.use([Navigation]);

const Standings4 = () => {
    const [unlStandingsA, setUnlStandingsA] = useState();
    const [unlStandingsB, setUnlStandingsB] = useState();
    const [unlStandingsC, setUnlStandingsC] = useState();
    const [unlStandingsD, setUnlStandingsD] = useState();

    let endpointsA = ['https://legfootball.herokuapp.com/unlStandingsA1', 'https://legfootball.herokuapp.com/unlStandingsA2', 'https://legfootball.herokuapp.com/unlStandingsA3', 'https://legfootball.herokuapp.com/unlStandingsA4'];
    let endpointsB = ['https://legfootball.herokuapp.com/unlStandingsB1', 'https://legfootball.herokuapp.com/unlStandingsB2', 'https://legfootball.herokuapp.com/unlStandingsB3', 'https://legfootball.herokuapp.com/unlStandingsB4'];
    let endpointsC = ['https://legfootball.herokuapp.com/unlStandingsC1', 'https://legfootball.herokuapp.com/unlStandingsC2', 'https://legfootball.herokuapp.com/unlStandingsC3', 'https://legfootball.herokuapp.com/unlStandingsC4'];
    let endpointsD = ['https://legfootball.herokuapp.com/unlStandingsD1', 'https://legfootball.herokuapp.com/unlStandingsD2'];

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(endpointsA[Math.floor(Math.random() * endpointsA.length)])
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('unlStandingsA', JSON.stringify(response.data));
                }
                setUnlStandingsA(JSON.parse(localStorage.getItem('unlStandingsA')) && JSON.parse(localStorage.getItem('unlStandingsA')).map((e, i) => {
                    return <div className={'unlStandingsA' + e.group.split(' ')[1]} key={'unlStandingsA' + i}>
                        <div className="group">{e.group}</div>
                            <div className="col">
                                <div className="left">
                                    <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
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
                console.log(err)
            });
    
            await axios.get(endpointsB[Math.floor(Math.random() * endpointsB.length)])
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('unlStandingsB', JSON.stringify(response.data));
                }
                setUnlStandingsB(JSON.parse(localStorage.getItem('unlStandingsB')) && JSON.parse(localStorage.getItem('unlStandingsB')).map((e, i) => {
                    return <div className={'unlStandingsB' + e.group.split(' ')[1]} key={'unlStandingsB' + i}>
                        <div className="group">{e.group}</div>
                            <div className="col">
                                <div className="left">
                                    <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
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
                console.log(err)
            });
    
            await axios.get(endpointsC[Math.floor(Math.random() * endpointsC.length)])
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('unlStandingsC', JSON.stringify(response.data));
                }
                setUnlStandingsC(JSON.parse(localStorage.getItem('unlStandingsC')) && JSON.parse(localStorage.getItem('unlStandingsC')).map((e, i) => {
                    return <div className={'unlStandingsC' + e.group.split(' ')[1]} key={'unlStandingsC' + i}>
                        <div className="group">{e.group}</div>
                            <div className="col">
                                <div className="left">
                                    <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
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
                console.log(err)
            });
    
            await axios.get(endpointsD[Math.floor(Math.random() * endpointsD.length)])
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('unlStandingsD', JSON.stringify(response.data));
                }
                setUnlStandingsD(JSON.parse(localStorage.getItem('unlStandingsD')) && JSON.parse(localStorage.getItem('unlStandingsD')).map((e, i) => {
                    return <div className={'unlStandingsD' + e.group.split(' ')[1]} key={'unlStandingsD' + i}>
                        <div className="group">{e.group}</div>
                            <div className="col">
                                <div className="left">
                                    <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
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
                console.log(err)
            });
        }
        
        fetchData();
    }, []);

    return (
        <div className='table5xn standingsEurocups' id="standings2">
                <section>
                    <h3 className="sectionName">Турнирная таблица - Лига наций</h3>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛН'><img src={unlLogo} alt="ЛН" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {unlStandingsA}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛН'><img src={unlLogo} alt="ЛН" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {unlStandingsB}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛН'><img src={unlLogo} alt="ЛН" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {unlStandingsC}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛН'><img src={unlLogo} alt="ЛН" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {unlStandingsD}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings4;