import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Standings4.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import uclLogo from '../../../assets/ico/uclLogo.webp';

SwiperCore.use([Navigation]);

const Standings4 = () => {
    const [uclStandings1, setUclStandings1] = useState();
    const [uclStandings2, setUclStandings2] = useState();
    const [uclStandings3, setUclStandings3] = useState();

    let endpoints = ['/uclStandingsA', '/uclStandingsB', '/uclStandingsC', '/uclStandingsD', '/uclStandingsE', '/uclStandingsF', '/uclStandingsG', '/uclStandingsH'];

    useEffect(() => {
        function getMultipleRandom(endpoints, num) {
            const shuffled = [...endpoints].sort(() => 0.5 - Math.random());
          
            return shuffled.slice(0, num);
        }
        let selected1 = getMultipleRandom(endpoints, 3)[0];
        let selected2 = getMultipleRandom(endpoints, 3)[1];
        let selected3 = getMultipleRandom(endpoints, 3)[2];

        axios.get(selected1)
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('uclStandings1', JSON.stringify(response.data));
            }
            setUclStandings1(JSON.parse(localStorage.getItem('uclStandings1')) && JSON.parse(localStorage.getItem('uclStandings1')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'uclStandings1' + i}>
                    <div className="group">{e.group}</div>
                        <div className="col">
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
                </div>
            }));
        })
        .catch(err => {
            console.log(err);
        }); 

        axios.get(selected2)
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('uclStandings2', JSON.stringify(response.data));
            }
            setUclStandings2(JSON.parse(localStorage.getItem('uclStandings2')) && JSON.parse(localStorage.getItem('uclStandings2')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'uclStandings2' + i}>
                    <div className="group">{e.group}</div>
                        <div className="col">
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
                </div>
            }));
        })
        .catch(err => {
            console.log(err);
        }); 

        axios.get(selected3)
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('uclStandings3', JSON.stringify(response.data));
            }
            setUclStandings3(JSON.parse(localStorage.getItem('uclStandings3')) && JSON.parse(localStorage.getItem('uclStandings3')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'uclStandings3' + i}>
                    <div className="group">{e.group}</div>
                        <div className="col">
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
                </div>
            }));
        })
        .catch(err => {
            console.log(err);
        }); 
    }, []);

    return (
        <div className='table5xn standingsEurocups' id="standings4">
                <section>
                    <h3 className="sectionName">Турнирная таблица - Лига чемпионов</h3>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛЧ'><img src={uclLogo} alt="ЛЧ" /></Tippy>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {uclStandings1}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛЧ'><img src={uclLogo} alt="ЛЧ" /></Tippy>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {uclStandings2}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛЧ'><img src={uclLogo} alt="ЛЧ" /></Tippy>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {uclStandings3}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings4;