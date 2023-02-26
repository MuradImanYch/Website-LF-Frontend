import React, { useEffect, useState } from 'react';
import './Standings3.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';

import euroQualLogo from '../../../assets/ico/euroQualLogo.webp';

SwiperCore.use([Navigation]);

const Standings4 = () => {
    const [euroQualStandings1, setEuroQualStandings1] = useState();
    const [euroQualStandings2, setEuroQualStandings2] = useState();
    const [euroQualStandings3, setEuroQualStandings3] = useState();

    let endpoints = ['/euroQualStandingsA', '/euroQualStandingsB', '/euroQualStandingsC', '/euroQualStandingsD', '/euroQualStandingsE', '/euroQualStandingsF', '/euroQualStandingsG', '/euroQualStandingsH', '/euroQualStandingsI', '/euroQualStandingsJ'];

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
                    localStorage.setItem('euroQualStandings1', JSON.stringify(response.data));
                }
                setEuroQualStandings1(JSON.parse(localStorage.getItem('euroQualStandings1')) && JSON.parse(localStorage.getItem('euroQualStandings1')).map((e, i) => {
                    return <div className={'id' + e.group} key={'euroQualStandings1' + i}>
                        <div className="group">{e.group}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy content={e.descrClass !== undefined ? 'Выход в финальную часть турнира' : 'Не квалифицировались'}><span className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
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
                    localStorage.setItem('euroQualStandings2', JSON.stringify(response.data));
                }
                setEuroQualStandings2(JSON.parse(localStorage.getItem('euroQualStandings2')) && JSON.parse(localStorage.getItem('euroQualStandings2')).map((e, i) => {
                    return <div className={'id' + e.group} key={'euroQualStandings2' + i}>
                        <div className="group">{e.group}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy content={e.descrClass !== undefined ? 'Выход в финальную часть турнира' : 'Не квалифицировались'}><span className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
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
                    localStorage.setItem('euroQualStandings3', JSON.stringify(response.data));
                }
                setEuroQualStandings3(JSON.parse(localStorage.getItem('euroQualStandings3')) && JSON.parse(localStorage.getItem('euroQualStandings3')).map((e, i) => {
                    return <div className={'id' + e.group} key={'euroQualStandings3' + i}>
                        <div className="group">{e.group}</div>
                            <div className="col">
                                <div className="left">
                                    <Tippy content={e.descrClass !== undefined ? 'Выход в финальную часть турнира' : 'Не квалифицировались'}><span className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
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
        <div className='table5xn standingsEurocups' id="standings3">
                <section>
                    <h3 className="sectionName">Турнирная таблица - Европейская квалификация</h3>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content="Европейская квлф."><img src={euroQualLogo} alt="Европейская квлф." /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {euroQualStandings1}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content="Европейская квлф."><img src={euroQualLogo} alt="Европейская квлф." /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {euroQualStandings2}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy content="Европейская квлф."><img src={euroQualLogo} alt="Европейская квлф." /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Название"><span>Команда</span></Tippy>
                                <Tippy content="Количество игр"><span>И</span></Tippy>
                                <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                                <Tippy content="Очки"><span>О</span></Tippy>
                            </div>
                            {euroQualStandings3}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings4;