import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import './Standings4.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
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

        $.ajax({
            type: 'GET',
            url: selected1
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('uclStandings1', JSON.stringify(response));
            }
            setUclStandings1(JSON.parse(localStorage.getItem('uclStandings1')) && JSON.parse(localStorage.getItem('uclStandings1')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'key' + i}>
                    <div className="group">{e.group}</div>
                        <div className="col">
                            <div className="left">
                                <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
                                <img src={e.logo} alt={e.name} title={e.name} />
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
        });

        $.ajax({
            type: 'GET',
            url: selected2
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('uclStandings2', JSON.stringify(response));
            }
            setUclStandings2(JSON.parse(localStorage.getItem('uclStandings2')) && JSON.parse(localStorage.getItem('uclStandings2')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'key' + i}>
                    <div className="group">{e.group}</div>
                        <div className="col">
                            <div className="left">
                                <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
                                <img src={e.logo} alt={e.name} title={e.name} />
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
        });

        $.ajax({
            type: 'GET',
            url: selected3
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('uclStandings3', JSON.stringify(response));
            }
            setUclStandings3(JSON.parse(localStorage.getItem('uclStandings3')) && JSON.parse(localStorage.getItem('uclStandings3')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'key' + i}>
                    <div className="group">{e.group}</div>
                        <div className="col">
                            <div className="left">
                                <span className={`place ${e.descrLat}`} title={e.description}>{e.place}</span>
                                <img src={e.logo} alt={e.name} title={e.name} />
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
        });
    }, []);

    return (
        <div id="standings4">
                <section>
                    <h3 className="sectionName">Турнирная таблица - Лига чемпионов</h3>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <img src={uclLogo} alt="ЛЧ" title='ЛЧ' />
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {uclStandings1}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <img src={uclLogo} alt="ЛЧ" title='ЛЧ' />
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {uclStandings2}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <img src={uclLogo} alt="ЛЧ" title='ЛЧ' />
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
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