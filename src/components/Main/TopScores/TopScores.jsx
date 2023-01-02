import React, { useEffect, useState } from 'react';
import './TopScores.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import rplLogo from '../../../assets/ico/rplLogo.webp';
import eplLogo from '../../../assets/ico/eplLogo.webp';
import laligaLogo from '../../../assets/ico/laligaLogo.webp';
import bundesligaLogo from '../../../assets/ico/bundesligaLogo.webp';
import serieaLogo from '../../../assets/ico/serieaLogo.webp';
import ligue1Logo from '../../../assets/ico/ligue1Logo.webp';
import person from '../../../assets/ico/person.webp';

SwiperCore.use([Navigation]);

const TopScoresSlider = () => {
    const [rplTopScores, setRplTopScores] = useState(); 
    const [eplTopScores, setEplTopScores] = useState(); 
    const [laligaTopScores, setLaligaTopScores] = useState(); 
    const [bundesligaTopScores, setBundesligaTopScores] = useState(); 
    const [serieaTopScores, setSerieaTopScores] = useState(); 
    const [ligue1TopScores, setLigue1TopScores] = useState(); 

    useEffect(() => { 
        axios.get('/rplTopScores')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('rplTopScores', JSON.stringify(response.data));
            }
            setRplTopScores(JSON.parse(localStorage.getItem('rplTopScores')) && JSON.parse(localStorage.getItem('rplTopScores')).splice(1, 8).map((e, i) => {
                return <div id={'rplTopScores' + i} key={'rplTopScores' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <Tippy content={e.player}><img src={e.img} alt={e.player}/></Tippy>
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy>
                            </div>
                            <div className="nums">
                                <span className="goals">{e.goals ? e.goals : '0'}</span>
                                <span>{e.assists === '(undefined' ? '(0)' : e.assists}</span>
                                <span>{e.games}</span>
                            </div>
                        </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/eplTopScores')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('eplTopScores', JSON.stringify(response.data));
            }
            setEplTopScores(JSON.parse(localStorage.getItem('eplTopScores')) && JSON.parse(localStorage.getItem('eplTopScores')).splice(1, 8).map((e, i) => {
                return <div id={'eplTopScores' + i} key={'eplTopScores' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <Tippy content={e.player}><img src={person} alt={e.player}/></Tippy>
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy>
                            </div>
                            <div className="nums">
                                <span className="goals">{e.goals ? e.goals : '0'}</span>
                                <span>{e.assists === '(undefined' ? '(0)' : e.assists}</span>
                                <span>{e.games}</span>
                            </div>
                        </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/laligaTopScores')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('laligaTopScores', JSON.stringify(response.data));
            }
            setLaligaTopScores(JSON.parse(localStorage.getItem('laligaTopScores')) && JSON.parse(localStorage.getItem('laligaTopScores')).splice(1, 8).map((e, i) => {
                return <div id={'laligaTopScores' + i} key={'laligaTopScores' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <Tippy content={e.player}><img src={person} alt={e.player}/></Tippy>
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy>
                            </div>
                            <div className="nums">
                                <span className="goals">{e.goals ? e.goals : '0'}</span>
                                <span>{e.assists === '(undefined' ? '(0)' : e.assists}</span>
                                <span>{e.games}</span>
                            </div>
                        </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/bundesligaTopScores')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('bundesligaTopScores', JSON.stringify(response.data));
            }
            setBundesligaTopScores(JSON.parse(localStorage.getItem('bundesligaTopScores')) && JSON.parse(localStorage.getItem('bundesligaTopScores')).splice(1, 8).map((e, i) => {
                return <div id={'bundesligaTopScores' + i} key={'bundesligaTopScores' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <Tippy content={e.player}><img src={person} alt={e.player}/></Tippy>
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy>
                            </div>
                            <div className="nums">
                                <span className="goals">{e.goals ? e.goals : '0'}</span>
                                <span>{e.assists === '(undefined' ? '(0)' : e.assists}</span>
                                <span>{e.games}</span>
                            </div>
                        </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/serieaTopScores')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('serieaTopScores', JSON.stringify(response.data));
            }
            setSerieaTopScores(JSON.parse(localStorage.getItem('serieaTopScores')) && JSON.parse(localStorage.getItem('serieaTopScores')).splice(1, 8).map((e, i) => {
                return <div id={'serieaTopScores' + i} key={'serieaTopScores' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <Tippy content={e.player}><img src={person} alt={e.player}/></Tippy>
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy>
                            </div>
                            <div className="nums">
                                <span className="goals">{e.goals ? e.goals : '0'}</span>
                                <span>{e.assists === '(undefined' ? '(0)' : e.assists}</span>
                                <span>{e.games}</span>
                            </div>
                        </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/ligue1TopScores')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('ligue1TopScores', JSON.stringify(response.data));
            }
            setLigue1TopScores(JSON.parse(localStorage.getItem('ligue1TopScores')) && JSON.parse(localStorage.getItem('ligue1TopScores')).splice(1, 8).map((e, i) => {
                return <div id={'ligue1TopScores' + i} key={'ligue1TopScores' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <Tippy content={e.player}><img src={person} alt={e.player}/></Tippy>
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy>
                            </div>
                            <div className="nums">
                                <span className="goals">{e.goals ? e.goals : '0'}</span>
                                <span>{e.assists === '(undefined' ? '(0)' : e.assists}</span>
                                <span>{e.games}</span>
                            </div>
                        </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className='table6xn'>
            <section>
                <h3 className="sectionName">Бомбардиры - Чемпионаты</h3>
                <Swiper navigation spaceBetween={50} grabCursor={true} breakpoints={{280: {slidesPerView: 1}, 768: {slidesPerView: 2}, 1024: {slidesPerView: 3}}}>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='РПЛ'><img src={rplLogo} alt="РПЛ" /></Tippy>
                        </div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="Ассисты"><span>А</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {rplTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='АПЛ'><img src={eplLogo} alt="АПЛ" /></Tippy>
                        </div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="Ассисты"><span>А</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {eplTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='Ла лига'><img src={laligaLogo} alt="Ла лига" /></Tippy>
                        </div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="Ассисты"><span>А</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {laligaTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='Бундеслига'><img src={bundesligaLogo} alt="Бундеслига" /></Tippy>
                        </div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="Ассисты"><span>А</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {bundesligaTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='Серия А'><img src={serieaLogo} alt="Серия А" /></Tippy>
                        </div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="Ассисты"><span>А</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {serieaTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='Лига 1'><img src={ligue1Logo} alt="Лига 1" /></Tippy>
                        </div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="Ассисты"><span>А</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {ligue1TopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default TopScoresSlider;