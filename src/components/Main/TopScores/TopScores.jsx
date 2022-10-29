import React, { useEffect, useState } from 'react';
import './TopScores.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';

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
                return <div id={'id' + i} key={'key' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <img src={e.img} alt={e.player} title={e.player} />
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <img src={e.tLogo} alt={e.tName} title={e.tName} />
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
                return <div id={'id' + i} key={'key' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <img src={person} alt={e.player} title={e.player} />
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <img src={e.tLogo} alt={e.tName} title={e.tName} />
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
                return <div id={'id' + i} key={'key' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <img src={person} alt={e.player} title={e.player} />
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <img src={e.tLogo} alt={e.tName} title={e.tName} />
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
                return <div id={'id' + i} key={'key' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <img src={person} alt={e.player} title={e.player} />
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <img src={e.tLogo} alt={e.tName} title={e.tName} />
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
                return <div id={'id' + i} key={'key' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <img src={person} alt={e.player} title={e.player} />
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <img src={e.tLogo} alt={e.tName} title={e.tName} />
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
                return <div id={'id' + i} key={'key' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <img src={person} alt={e.player} title={e.player} />
                                <span className='name'>{e.player}</span>
                            </div>
                            <div className="tLogoName">
                                <img src={e.tLogo} alt={e.tName} title={e.tName} />
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
                            <img src={rplLogo} alt="РПЛ" title='РПЛ' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Игрок</span>
                            <span>К</span>
                            <span>Г</span>
                            <span>А</span>
                            <span>И</span>
                        </div>
                        {rplTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={eplLogo} alt="АПЛ" title='АПЛ' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Игрок</span>
                            <span>К</span>
                            <span>Г</span>
                            <span>А</span>
                            <span>И</span>
                        </div>
                        {eplTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={laligaLogo} alt="Ла лига" title='Ла лига' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Игрок</span>
                            <span>К</span>
                            <span>Г</span>
                            <span>А</span>
                            <span>И</span>
                        </div>
                        {laligaTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={bundesligaLogo} alt="Бундеслига" title='Бундеслига' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Игрок</span>
                            <span>К</span>
                            <span>Г</span>
                            <span>А</span>
                            <span>И</span>
                        </div>
                        {bundesligaTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={serieaLogo} alt="Серия А" title='Серия А' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Игрок</span>
                            <span>К</span>
                            <span>Г</span>
                            <span>А</span>
                            <span>И</span>
                        </div>
                        {serieaTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={ligue1Logo} alt="Лига 1" title='Лига 1' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Игрок</span>
                            <span>К</span>
                            <span>Г</span>
                            <span>А</span>
                            <span>И</span>
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