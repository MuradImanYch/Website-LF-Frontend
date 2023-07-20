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

    let endpointsA = ['/standings/unla1', '/standings/unla2', '/standings/unla3', '/standings/unla4'];
    let endpointsB = ['/standings/unlb1', '/standings/unlb2', '/standings/unlb3', '/standings/unlb4'];
    let endpointsC = ['/standings/unlc1', '/standings/unlc2', '/standings/unlc3', '/standings/unlc4'];
    let endpointsD = ['/standings/unld1', '/standings/unld2'];

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(endpointsA[Math.floor(Math.random() * endpointsA.length)])
            .then(response => {
                setUnlStandingsA(response.data && response.data.map((e, i) => {
                    return <div className={'unlStandingsA' + e.standingsGroup?.split(' ')[1]} key={'unlStandingsA' + i}>
                        <div className="group">{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
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
                setUnlStandingsB(response.data && response.data.map((e, i) => {
                    return <div className={'unlStandingsB' + e.standingsGroup?.split(' ')[1]} key={'unlStandingsB' + i}>
                        <div className="group">{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
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
                setUnlStandingsC(response.data && response.data.map((e, i) => {
                    return <div className={'unlStandingsC' + e.standingsGroup?.split(' ')[1]} key={'unlStandingsC' + i}>
                        <div className="group">{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
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
                setUnlStandingsD(response.data && response.data.map((e, i) => {
                    return <div className={'unlStandingsD' + e.standingsGroup?.split(' ')[1]} key={'unlStandingsD' + i}>
                        <div className="group">{e.standingsGroup}</div>
                            <div className="col">
                                <div className="left">
                                    <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
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
                <section id='standings2QckNav'>
                    <h2 className="sectionName">Турнирная таблица - Лига наций</h2>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛН'><img loading="lazy" src={unlLogo} alt="ЛН" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {unlStandingsA && unlStandingsA.length > 0 ? unlStandingsA : <div className='noData'>Данных нет</div>}
                            <Link to="/league/unl/standings">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛН'><img loading="lazy" src={unlLogo} alt="ЛН" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {unlStandingsB && unlStandingsB.length > 0 ? unlStandingsB : <div className='noData'>Данных нет</div>}
                            <Link to="/league/unl/standings">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛН'><img loading="lazy" src={unlLogo} alt="ЛН" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {unlStandingsC && unlStandingsC.length > 0 ? unlStandingsC : <div className='noData'>Данных нет</div>}
                            <Link to="/league/unl/standings">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content='ЛН'><img loading="lazy" src={unlLogo} alt="ЛН" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {unlStandingsD && unlStandingsD.length > 0 ? unlStandingsD : <div className='noData'>Данных нет</div>}
                            <Link to="/league/unl/standings">Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings4;