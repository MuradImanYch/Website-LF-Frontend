import React, { useEffect, useState } from 'react';
import './Standings2.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';

import unlLogo from '../../../assets/ico/unlLogo.webp';
import Tippy from '@tippyjs/react';

SwiperCore.use([Navigation]);

const Standings4 = () => {
    const [unlStandingsA, setUnlStandingsA] = useState();
    const [unlStandingsB, setUnlStandingsB] = useState();
    const [unlStandingsC, setUnlStandingsC] = useState();
    const [unlStandingsD, setUnlStandingsD] = useState();

    let endpointsA = ['/unlStandingsA1', '/unlStandingsA2', 'unlStandingsA3', 'unlStandingsA4'];
    let endpointsB = ['/unlStandingsB1', '/unlStandingsB2', '/unlStandingsB3', '/unlStandingsB4'];
    let endpointsC = ['/unlStandingsC1', '/unlStandingsC2', '/unlStandingsC3', '/unlStandingsC4'];
    let endpointsD = ['/unlStandingsD1', '/unlStandingsD2'];

    useEffect(() => {
        axios.get(endpointsA[Math.floor(Math.random() * endpointsA.length)])
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
                </div>
            }));
        })
        .catch(err => {
            console.log(err)
        });

        axios.get(endpointsB[Math.floor(Math.random() * endpointsB.length)])
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
                </div>
            }));
        })
        .catch(err => {
            console.log(err)
        });

        axios.get(endpointsC[Math.floor(Math.random() * endpointsC.length)])
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
                </div>
            }));
        })
        .catch(err => {
            console.log(err)
        });

        axios.get(endpointsD[Math.floor(Math.random() * endpointsD.length)])
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
                </div>
            }));
        })
        .catch(err => {
            console.log(err)
        });
    }, []);

    return (
        <div className='table5xn standingsEurocups' id="standings2">
                <section>
                    <h3 className="sectionName">Турнирная таблица - Лига наций</h3>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛН'><img src={unlLogo} alt="ЛН" /></Tippy>
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {unlStandingsA}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛН'><img src={unlLogo} alt="ЛН" /></Tippy>
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {unlStandingsB}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛН'><img src={unlLogo} alt="ЛН" /></Tippy>
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {unlStandingsC}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛН'><img src={unlLogo} alt="ЛН" /></Tippy>
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
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