import React, { useEffect, useState } from 'react';
import './HotBoard.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import $ from 'jquery';
import Sparkle from 'react-sparkle';
import config from '../../conf.json';

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
                                    <progress value={e.time.includes('Доп.') ? String(e.time).split('. ')[1].replace('\'', '') :  String(e.time).replace('\'', '') && e.time === 'Перерыв' ? '45' : String(e.time).replace('\'', '')} max={e.time.includes('Доп.') ? '120' : '90'}>
                                        <style>
                                            {`
                                            .hotBoard progress::-webkit-progress-value {
                                                background: ${localStorage.getItem('darkTheme') === 'true' ? 'linear-gradient(to right, rgba(107, 194, 74, 0.5), rgba(84, 150, 59, 0.6), rgba(47, 168, 0, 0.8)) !important;' : null}
                                            }
                                            `}
                                        </style>
                                    </progress>
                                    <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.hName.slice(0, 10)}</span>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='bottom' content={e.hName}>
                                        <img loading="lazy" width={'13px'} src={e.hLogo === null ? undefTeam : e.hLogo} alt={e.hName} />
                                    </Tippy>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='hScore'>{e.hScore}</span>
                                    <div className="lLogoTime">
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='bottom' content={e.lName + ' | ' + String(e.round).replace('null', '') + ', ' + String(e.roundInfo).replace('null', '')}>
                                            <img loading="lazy" width={'14px'} src={e.lLogo === 'https://s.scr365.net/s1/logo/13_36_14/fPHr8_16_439.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/img/ball16.png' ? notRecogLeague : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/12_250_17/a7wHB_16_438.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/22_33_11/46atU_16_742.png' ? wcLogo : e.lLogo} alt={e.lName} />
                                        </Tippy>
                                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="time">{e.time === 'Перерыв' ? 'Пер.' : e.time && e.time.includes('Доп.') ? `${'ДВ' + e.time.split('.')[1]}` : e.time}</span>
                                    </div>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='aScore'>{e.aScore}</span>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='bottom' content={e.aName}>
                                        <img loading="lazy" width={'13px'} src={e.aLogo === null ? undefTeam : e.aLogo} alt={e.aName} />
                                    </Tippy>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="aName">{e.aName.slice(0, 10)}</span>
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
        }, 60000);
    }, []);

    return (
        <div className="hotBoard">
            {config['ny-christmass-theme'] && <Sparkle count={50} color={'gold'} fadeOutSpeed={30} minSize={10} />}
            <Swiper centeredSlides={true} grabCursor={true} speed={5000} autoplay={{delay: 1, disableOnInteraction: false}} slidesPerView={2} breakpoints={{280: {slidesPerView: 1}, 540: {slidesPerView: 2}, 768: {slidesPerView: 3}, 1200: {slidesPerView: 5},  1920: {slidesPerView: 6}}} freeMode={true}>
                {liveMatches && liveMatches.length > 0 ? liveMatches : <div className='noData'>Данных нет</div>}
            </Swiper>
            <div className="liveWrap">
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='bottom' content='Количество матчей'>
                    <span>{matchesQuant}</span>
                </Tippy>
            </div>
        </div>
    );
}

export default HotBoard;