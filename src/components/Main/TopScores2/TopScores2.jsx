import React, { useEffect, useState } from 'react';
import './TopScores2.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';

import uclLogo from '../../../assets/ico/uclLogo.webp';
import uelLogo from '../../../assets/ico/uelLogo.webp';
import ueclLogo from '../../../assets/ico/ueclLogo.webp';

SwiperCore.use([Navigation]);

const TopScores = () => {
    const [uclTopScores, setUclTopScores] = useState(); 
    const [uelTopScores, setUelTopScores] = useState(); 
    const [ueclTopScores, setUeclTopScores] = useState(); 

    useEffect(() => { 
        const fetchData = async () => {
            await axios.get('/uclTopScores')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('uclTopScores', JSON.stringify(response.data));
                }
                setUclTopScores(JSON.parse(localStorage.getItem('uclTopScores')) && JSON.parse(localStorage.getItem('uclTopScores')).splice(0, 8).map((e, i) => {
                    return <div key={'uclTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place">{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.player}><img src={e.img} alt={e.player} /></Tippy></LazyLoad>
                                    <span className='name'>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
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
    
            await axios.get('/uelTopScores')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('uelTopScores', JSON.stringify(response.data));
                }
                setUelTopScores(JSON.parse(localStorage.getItem('uelTopScores')) && JSON.parse(localStorage.getItem('uelTopScores')).splice(0, 8).map((e, i) => {
                    return <div key={'uelTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place">{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.player}><img src={e.img} alt={e.player} /></Tippy></LazyLoad>
                                    <span className='name'>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
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
    
            await axios.get('/ueclTopScores')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('ueclTopScores', JSON.stringify(response.data));
                }
                setUeclTopScores(JSON.parse(localStorage.getItem('ueclTopScores')) && JSON.parse(localStorage.getItem('ueclTopScores')).splice(0, 8).map((e, i) => {
                    return <div key={'ueclTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place">{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.player}><img src={e.img} alt={e.player} /></Tippy></LazyLoad>
                                    <span className='name'>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
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
        }
        
        fetchData();
    }, []);

    return (
        <div className='table6xn' id='topScores2'>
            <section>
                <h3 className="sectionName">Бомбардиры - Еврокубки</h3>
                <Swiper navigation grabCursor={true} slidesPerView={1}>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy content={'ЛЧ'}><img src={uclLogo} alt="ЛЧ" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="С пенальти"><span>П</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {uclTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy content={'ЛЕ'}><img src={uelLogo} alt="ЛЕ" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="С пенальти"><span>П</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {uelTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <LazyLoad offset={800}><Tippy content={'ЛК'}><img src={ueclLogo} alt="ЛК" /></Tippy></LazyLoad>
                        </div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="С пенальти"><span>П</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {ueclTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default TopScores;