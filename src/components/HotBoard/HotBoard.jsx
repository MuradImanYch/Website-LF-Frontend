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

function HotBoard(props) {
    const[liveMatches, setLiveMatches] = useState();
    const[matchesQuant, setMatchesQuant] = useState('0');

    useEffect(() => {
        const update = () => {
            axios.get('/liveMatches')
            .then(response => {
                setLiveMatches(response.data && response.data.map((e, i) => {
                    return  <SwiperSlide key={'key' + i} id={'id' + i}>
                                <div className='slideWrap'>
                                    <progress value={e.time === 'Перерыв' ? '45' : e.time.match(/\d+/)} max={'90'}></progress>
                                    <span className="hName">{e.hName.slice(0, 10)}</span>
                                    <Tippy placement='bottom' content={e.hName}>
                                        <img width={'13px'} src={e.hLogo === undefined ? undefTeam : e.hLogo} alt={e.hName} />
                                    </Tippy>
                                    <span className='hScore'>{e.hScore}</span>
                                    <div className="lLogoTime">
                                        <Tippy placement='bottom' content={e.lNameRoundDateTime[0] === 'Товарищеский' ? 'Товарищеский' : e.lNameRoundDateTime[0] + ' | ' + e.lNameRoundDateTime[1] + ', ' + e.lNameRoundDateTime[2]}>
                                            <img width={'14px'} src={e.lLogo === 'https://s.scr365.net/s1/logo/13_36_14/fPHr8_16_439.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/img/ball16.png' ? notRecogLeague : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/12_250_17/a7wHB_16_438.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/22_33_11/46atU_16_742.png' ? wcLogo : e.lLogo} alt={e.lNameRoundDateTime[0]} />
                                        </Tippy>
                                        <span className="time">{e.time === 'Перерыв' ? 'Пер.' : e.time}</span>
                                    </div>
                                    <span className='aScore'>{e.aScore}</span>
                                    <Tippy placement='bottom' content={e.aName}>
                                        <img width={'13px'} src={e.aLogo === undefined ? undefTeam : e.aLogo} alt={e.aName} />
                                    </Tippy>
                                    <span className="aName">{e.aName.slice(0, 10)}</span>
                                </div>
                            </SwiperSlide>
                })); 
                setMatchesQuant(response.data.length);
                if(response.data.length > 0) document.querySelector('#hotBoard .liveWrap span').style.color = 'red';
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        update();
        setInterval(() => {
            update();
        }, 30000);
    }, []);

    return (
        <div id="hotBoard">
            <Swiper centeredSlides={true} grabCursor={true} speed={5000} autoplay={{delay: 1, disableOnInteraction: false}} slidesPerView={2} breakpoints={{280: {slidesPerView: 1}, 540: {slidesPerView: 2}, 768: {slidesPerView: 3}, 1200: {slidesPerView: 5},  1920: {slidesPerView: 6}}} freeMode={true}>
                {liveMatches}
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