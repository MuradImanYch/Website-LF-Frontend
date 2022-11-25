import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import ueclLogo from '../../../assets/ico/ueclLogo.webp';

SwiperCore.use([Navigation]);

const Standings6 = () => {
    const [ueclStandings1, setUeclStandings1] = useState();
    const [ueclStandings2, setUeclStandings2] = useState();
    const [ueclStandings3, setUeclStandings3] = useState();

    let endpoints = ['/ueclStandingsA', '/ueclStandingsB', '/ueclStandingsC', '/ueclStandingsD', '/ueclStandingsE', '/ueclStandingsF', '/ueclStandingsG', '/ueclStandingsH'];

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
                localStorage.setItem('ueclStandings1', JSON.stringify(response.data));
            }
            setUeclStandings1(JSON.parse(localStorage.getItem('ueclStandings1')) && JSON.parse(localStorage.getItem('ueclStandings1')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'ueclStandings1' + i}>
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
                localStorage.setItem('ueclStandings2', JSON.stringify(response.data));
            }
            setUeclStandings2(JSON.parse(localStorage.getItem('ueclStandings2')) && JSON.parse(localStorage.getItem('ueclStandings2')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'ueclStandings2' + i}>
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
                localStorage.setItem('ueclStandings3', JSON.stringify(response.data));
            }
            setUeclStandings3(JSON.parse(localStorage.getItem('ueclStandings3')) && JSON.parse(localStorage.getItem('ueclStandings3')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'ueclStandings3' + i}>
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
        <div className='table5xn standingsEurocups'>
                <section>
                    <h3 className="sectionName">Турнирная таблица - Лига конференции</h3>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛК'><img src={ueclLogo} alt="ЛК" /></Tippy>
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {ueclStandings1}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛК'><img src={ueclLogo} alt="ЛК" /></Tippy>
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {ueclStandings2}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='ЛК'><img src={ueclLogo} alt="ЛК" /></Tippy>
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {ueclStandings3}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings6;