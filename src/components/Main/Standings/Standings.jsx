import React, { useEffect, useState } from 'react';
import './Standings.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import rplLogo from '../../../assets/ico/rplLogo.webp';
import eplLogo from '../../../assets/ico/eplLogo.webp';
import laligaLogo from '../../../assets/ico/laligaLogo.webp';
import bundesligaLogo from '../../../assets/ico/bundesligaLogo.webp';
import serieaLogo from '../../../assets/ico/serieaLogo.webp';
import ligue1Logo from '../../../assets/ico/ligue1Logo.webp';

SwiperCore.use([Navigation]);

const StandingsSlider = () => {
    const [rplStandings, setRplStandings] = useState(); 
    const [eplStandings, setEplStandings] = useState(); 
    const [laligaStandings, setLaligaStandings] = useState(); 
    const [bundesligaStandings, setBundesligaStandings] = useState(); 
    const [serieaStandings, setSerieaStandings] = useState(); 
    const [ligue1Standings, setLigue1Standings] = useState(); 

    useEffect(() => { 
        $.ajax({
            type: 'GET',
            url: '/rplStandings'
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('rplStandings', JSON.stringify(response));
            }
            setRplStandings(JSON.parse(localStorage.getItem('rplStandings')) && JSON.parse(localStorage.getItem('rplStandings')).splice(0, 8).map((e, i) => {
                return <div id={'id' + i} key={'key' + i} className="col">
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
            }));
        });

        $.ajax({
            type: 'GET',
            url: '/eplStandings'
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('eplStandings', JSON.stringify(response));
            }
            setEplStandings(JSON.parse(localStorage.getItem('eplStandings')) && JSON.parse(localStorage.getItem('eplStandings')).splice(0, 8).map((e, i) => {
                return <div id={'id' + i} key={'key' + i} className="col">
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
            }));
        });

        $.ajax({
            type: 'GET',
            url: '/laligaStandings'
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('laligaStandings', JSON.stringify(response));
            }
            setLaligaStandings(JSON.parse(localStorage.getItem('laligaStandings')) && JSON.parse(localStorage.getItem('laligaStandings')).splice(0, 8).map((e, i) => {
                return <div id={'id' + i} key={'key' + i} className="col">
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
            }));
        });

        $.ajax({
            type: 'GET',
            url: '/bundesligaStandings'
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('bundesligaStandings', JSON.stringify(response));
            }
            setBundesligaStandings(JSON.parse(localStorage.getItem('bundesligaStandings')) && JSON.parse(localStorage.getItem('bundesligaStandings')).splice(0, 8).map((e, i) => {
                return <div id={'id' + i} key={'key' + i} className="col">
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
            }));
        });

        $.ajax({
            type: 'GET',
            url: '/serieaStandings'
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('serieaStandings', JSON.stringify(response));
            }
            setSerieaStandings(JSON.parse(localStorage.getItem('serieaStandings')) && JSON.parse(localStorage.getItem('serieaStandings')).splice(0, 8).map((e, i) => {
                return <div id={'id' + i} key={'key' + i} className="col">
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
            }));
        });

        $.ajax({
            type: 'GET',
            url: '/ligue1Standings'
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('ligue1Standings', JSON.stringify(response));
            }
            setLigue1Standings(JSON.parse(localStorage.getItem('ligue1Standings')) && JSON.parse(localStorage.getItem('ligue1Standings')).splice(0, 8).map((e, i) => {
                return <div id={'id' + i} key={'key' + i} className="col">
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
            }));
        });
    }, []);

    return (
        <div id="standings">
            <section>
                <h3 className="sectionName">Турнирная таблица - Чемпионаты</h3>
                <Swiper navigation spaceBetween={50} grabCursor={true} breakpoints={{280: {slidesPerView: 1}, 768: {slidesPerView: 2}, 1024: {slidesPerView: 3}}}>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={rplLogo} alt="РПЛ" title='РПЛ' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {rplStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={eplLogo} alt="АПЛ" title='АПЛ' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {eplStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={laligaLogo} alt="Ла-лига" title='Ла-лига' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {laligaStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={bundesligaLogo} alt="Бундеслига" title='Бундеслига' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {bundesligaStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={serieaLogo} alt="Серия А" title='Серия А' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {serieaStandings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={ligue1Logo} alt="Лига 1" title='Лига 1' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Команда</span>
                            <span>И</span>
                            <span>З : П</span>
                            <span>О</span>
                        </div>
                        {ligue1Standings}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default StandingsSlider;