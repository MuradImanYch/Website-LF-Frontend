import React, { useEffect, useState } from 'react';
import './TopScores3.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";

import euroQualLogo from '../../../assets/ico/euroQualLogo.webp';
import unlLogo from '../../../assets/ico/unlLogo.webp';
import person from '../../../assets/ico/person.webp';

SwiperCore.use([Navigation]);

const TopScores3 = () => {
    const [euroQualTopScores, setEuroQualTopScores] = useState(); 
    const [unlTopScores, setUnlTopScores] = useState(); 

    useEffect(() => { 
        $.ajax({
            type: 'GET',
            url: '/euroQualTopScores'
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('euroQualTopScores', JSON.stringify(response));
            }
            setEuroQualTopScores(JSON.parse(localStorage.getItem('euroQualTopScores')) && JSON.parse(localStorage.getItem('euroQualTopScores')).splice(1, 8).map((e, i) => {
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
        });

        $.ajax({
            type: 'GET',
            url: '/unlTopScores'
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('unlTopScores', JSON.stringify(response));
            }
            setUnlTopScores(JSON.parse(localStorage.getItem('unlTopScores')) && JSON.parse(localStorage.getItem('unlTopScores')).splice(0, 8).map((e, i) => {
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
        });
    }, []);

    return (
        <div className='table6xn' id="topScores3">
            <section>
                <h3 className="sectionName">Бомбардиры - Турниры сборных</h3>
                <Swiper navigation grabCursor={true} slidesPerView={1}>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={euroQualLogo} alt="Европейская Квлф." title='Европейская Квлф.' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Игрок</span>
                            <span>К</span>
                            <span>Г</span>
                            <span>А</span>
                            <span>И</span>
                        </div>
                        {euroQualTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <img src={unlLogo} alt="ЛН" title='ЛН' />
                        </div>
                        <div className="head">
                            <span>#</span>
                            <span>Игрок</span>
                            <span>К</span>
                            <span>Г</span>
                            <span>А</span>
                            <span>И</span>
                        </div>
                        {unlTopScores}
                        <Link to="#">Подробнее</Link>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default TopScores3;