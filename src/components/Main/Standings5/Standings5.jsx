import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import './Standings5.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import uelLogo from '../../../assets/ico/uelLogo.webp';

SwiperCore.use([Navigation]);

const Standings5 = () => {
    const [uelStandings1, setUelStandings1] = useState();
    const [uelStandings2, setUelStandings2] = useState();
    const [uelStandings3, setUelStandings3] = useState();

    let endpoints = ['/uelStandingsA', '/uelStandingsB', '/uelStandingsC', '/uelStandingsD', '/uelStandingsE', '/uelStandingsF', '/uelStandingsG', '/uelStandingsH'];

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
                localStorage.setItem('uelStandings1', JSON.stringify(response));
            }
            setUelStandings1(JSON.parse(localStorage.getItem('uelStandings1')) && JSON.parse(localStorage.getItem('uelStandings1')).map((e, i) => {
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
                localStorage.setItem('uelStandings2', JSON.stringify(response));
            }
            setUelStandings2(JSON.parse(localStorage.getItem('uelStandings2')) && JSON.parse(localStorage.getItem('uelStandings2')).map((e, i) => {
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
                localStorage.setItem('uelStandings3', JSON.stringify(response));
            }
            setUelStandings3(JSON.parse(localStorage.getItem('uelStandings3')) && JSON.parse(localStorage.getItem('uelStandings3')).map((e, i) => {
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
        <div id="standings5">
                <section>
                    <h3 className="sectionName">Турнирная таблица - Лига европы</h3>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <img src={uelLogo} alt="ЛЕ" title='ЛЕ' />
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {uelStandings1}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <img src={uelLogo} alt="ЛЕ" title='ЛЕ' />
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                            {uelStandings2}
                            <Link to="#">Подробнее</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <img src={uelLogo} alt="ЛЕ" title='ЛЕ' />
                            </div>
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
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