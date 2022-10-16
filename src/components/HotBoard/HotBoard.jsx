import React, { useEffect, useState } from 'react';
import './HotBoard.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import $ from 'jquery';

import friendly from '../../assets/ico/friendly.webp';
import undefTeam from '../../assets/ico/undefTeam.webp';

SwiperCore.use([Autoplay]);

function HotBoard(props) {
    const[liveMatches, setLiveMatches] = useState();
    const[matchesQuant, setMatchesQuant] = useState('0');

    useEffect(() => {
        const update = () => {
            $.ajax({
                type: "GET",
                url: '/liveMatches',
            }).done(function (response) {
                setLiveMatches(response && response.map((e, i) => {
                    return  <SwiperSlide key={'key' + i} id={'id' + i} title={e.lName.length > 70 ? 'Товарищеский' : e.lNameRoundDateTime[0] + ' | ' + e.lNameRoundDateTime[1] + ', ' + e.lNameRoundDateTime[2]}>
                                <div className='slideWrap'>
                                    <progress value={e.time === 'Перерыв' ? '45' : e.time.match(/\d+/)} max={'90'}></progress>
                                    <span className="hName">{e.hName.slice(0, 10)}</span>
                                    {e.hLogo === undefined ? <img width={'13px'} src={undefTeam} alt={e.hName} title={e.hName} /> : <img src={e.hLogo} alt={e.hName} title={e.hName} />}
                                    <span className='hScore'>{e.hScore}</span>
                                    <div className="lLogoTime">
                                        {e.lLogo === undefined ? <img src={friendly} alt={e.lNameRoundDateTime[0]} width={'14px'} /> : <img width={'14px'} src={e.lLogo} alt={e.lNameRoundDateTime[0]} />}
                                        <span className="time">{e.time === 'Перерыв' ? 'Пер.' : e.time}</span>
                                    </div>
                                    <span className='aScore'>{e.aScore}</span>
                                    {e.aLogo === undefined ? <img width={'13px'} src={undefTeam} alt={e.aName} title={e.aName} /> : <img src={e.aLogo} alt={e.aName} title={e.aName} />}
                                    <span className="aName">{e.aName.slice(0, 10)}</span>
                                </div>
                            </SwiperSlide>
                })); 
                setMatchesQuant(response.length);
                if(response.length > 0) document.querySelector('#hotBoard .liveWrap span').style.color = 'red';
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
                <span title='Live'>{matchesQuant}</span>
            </div>
        </div>
    );
}

export default HotBoard;