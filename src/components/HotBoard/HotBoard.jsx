import React, { useEffect, useState } from 'react';
import './HotBoard.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import friendly from '../../assets/ico/friendly.webp';
import notRecogLeague from '../../assets/ico/notRecogLeague.webp';
import undefTeam from '../../assets/ico/undefTeam.webp';
import wcLogo from '../../assets/ico/wcLogo.webp';

SwiperCore.use([Autoplay]);

function HotBoard() {
    const[liveMatches, setLiveMatches] = useState();
    const[matchesQuant, setMatchesQuant] = useState('0');

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/matches/live')
            .then(response => {
                setLiveMatches(response.data && response.data.map((e, i) => {
                    return  <SwiperSlide key={'live' + i}>
                                <div className='slideWrap'>
                                    <progress value={e.time.includes('Доп.') ? String(e.time).split('. ')[1].replace('\'', '') :  String(e.time).replace('\'', '') && e.time === 'Перерыв' ? '45' : String(e.time).replace('\'', '')} max={e.time.includes('Доп.') ? '120' : '90'}></progress>
                                    <span className="hName">{e.hName.slice(0, 10)}</span>
                                    <Tippy placement='bottom' content={e.hName}>
                                        <img width={'13px'} src={e.hLogo === null ? undefTeam : e.hLogo} alt={e.hName} />
                                    </Tippy>
                                    <span className='hScore'>{e.hScore}</span>
                                    <div className="lLogoTime">
                                        <Tippy placement='bottom' content={e.lName + ' | ' + String(e.round).replace('null', '') + ', ' + String(e.roundInfo).replace('null', '')}>
                                            <img width={'14px'} src={e.lLogo === 'https://s.scr365.net/s1/logo/13_36_14/fPHr8_16_439.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/img/ball16.png' ? notRecogLeague : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/12_250_17/a7wHB_16_438.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/22_33_11/46atU_16_742.png' ? wcLogo : e.lLogo} alt={e.lName} />
                                        </Tippy>
                                        <span className="time">{e.time === 'Перерыв' ? 'Пер.' : e.time && e.time.includes('Доп.') ? `${'ДВ' + e.time.split('.')[1]}` : e.time}</span>
                                    </div>
                                    <span className='aScore'>{e.aScore}</span>
                                    <Tippy placement='bottom' content={e.aName}>
                                        <img width={'13px'} src={e.aLogo === null ? undefTeam : e.aLogo} alt={e.aName} />
                                    </Tippy>
                                    <span className="aName">{e.aName.slice(0, 10)}</span>
                                </div>
                            </SwiperSlide>
                })); 
                setMatchesQuant(response.data.length);
                if(response.data.length > 0) document.querySelector('.hotBoard .liveWrap span').style.color = 'red';
            })
            .catch(err => {
                console.log(err);
            });
        }

        fetchData();
        setInterval(() => {
            fetchData();
        }, 30000);
    }, []);

    return (
        <div className="hotBoard">
            <Swiper centeredSlides={true} grabCursor={true} speed={5000} autoplay={{delay: 1, disableOnInteraction: false}} slidesPerView={2} breakpoints={{280: {slidesPerView: 1}, 540: {slidesPerView: 2}, 768: {slidesPerView: 3}, 1200: {slidesPerView: 5},  1920: {slidesPerView: 6}}} freeMode={true}>
                {liveMatches && liveMatches.length > 0 ? liveMatches : <div className='noData'>Данных нет</div>}
            </Swiper>
            <div className="liveWrap">
                <Tippy placement='bottom' content='Количество матчей'>
                    <span>{matchesQuant}</span>
                </Tippy>
            </div>
        </div>
    );
}

export default HotBoard;