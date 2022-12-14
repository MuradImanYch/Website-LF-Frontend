import React, { useEffect, useState } from 'react';
import './MatchesSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Pagination} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import friendly from '../../../assets/ico/friendly.webp';
import stadium from '../../../assets/ico/stadium.webp';
import location from '../../../assets/ico/location.webp';
import whistle from '../../../assets/ico/whistle.webp';
import notRecogLeague from '../../../assets/ico/notRecogLeague.webp';
import wcLogo from '../../../assets/ico/wcLogo.webp';

SwiperCore.use([Pagination]);

const MatchesSlider = () => { 
    const[matchesSlider, setMatchesSlider] = useState();

    useEffect(() => {
        axios.get('/matchesSlider')
        .then(response => {
            const uniqueIds = [];
              
            const unique = response.data.filter(element => { // del duplicate obj props/teams
                const isDuplicate = uniqueIds.includes(element.hName);
                if (!isDuplicate) {
                  uniqueIds.push(element.hName);
                  return true;
                }
              
                return false;
            });
            setMatchesSlider(unique && unique.map((e, i) => {
                return <SwiperSlide key={'matchesSlider' + i} id={'matchesSlider' + i}>
                            <div className="top">
                                <div className="lNameLogo">
                                    <Tippy content={e.stadium === '' ? 'Информация появится позже' : e.stadium}>
                                        <img src={stadium} alt="стадион" />
                                    </Tippy>
                                    <Tippy content={e.lNameRoundDateTime[0] === 'Товарищеский' ? 'Товарищеский' : e.lNameRoundDateTime[0] + ' | ' + e.lNameRoundDateTime[1] + ', ' + e.lNameRoundDateTime[2]}>
                                        <img width={'14px'} src={e.lLogo === 'https://s.scr365.net/s1/logo/13_36_14/fPHr8_16_439.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/img/ball16.png' ? notRecogLeague : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/12_250_17/a7wHB_16_438.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/22_33_11/46atU_16_742.png' ? wcLogo : e.lLogo} alt={e.lNameRoundDateTime[0]} />
                                    </Tippy>
                                    <Tippy content={e.venue === '' ? 'Информация появится позже' : e.venue}>
                                        <img src={location} alt="геолокация" />
                                    </Tippy>
                                </div>
                                <div className="teamsCoef">
                                    <div className="teams">
                                        <div className="ht">
                                            <Tippy content={e.hName}><img src={e.hLogo} alt={e.hName} /></Tippy> <span>{e.hName.slice(0, 13)}</span>
                                        </div>
                                        <div className="at">
                                            <Tippy content={e.aName}><img src={e.aLogo} alt={e.aName} /></Tippy> <span>{e.aName.slice(0, 13)}</span>
                                        </div>
                                    </div>
                                    <Tippy content={'Коэффициенты могут быть точными в день игры'}>
                                        <div className="coefs">
                                            <span>{e.w1 === '' ? '-' : e.w1 && e.hName === 'Дордой' ? '-' : e.w1 && e.aName === 'Дордой' ? '-' : e.w1 && e.hName === 'Абдыш-Ата' ? '-' : e.w1 && e.aName === 'Абдыш-Ата' ? '-' : e.w1  && e.hName === 'Кайрат' ? '-' : e.w1 && e.aName === 'Кайрат' ? '-' : e.w1 && e.lLogo === undefined ? '-' : e.w1}</span>
                                            <span>{e.d === '' ? '-' : e.d && e.hName === 'Дордой' ? '-' : e.d && e.aName === 'Дордой' ? '-' : e.d && e.hName === 'Абдыш-Ата' ? '-' : e.d && e.aName === 'Абдыш-Ата' ? '-' : e.d && e.hName === 'Кайрат' ? '-' : e.d && e.aName === 'Кайрат' ? '-' : e.d && e.lLogo === undefined ? '-' : e.d}</span>
                                            <span>{e.w2 === '' ? '-' : e.w2 && e.hName === 'Дордой' ? '-' : e.w2 && e.aName === 'Дордой' ? '-' : e.w2 && e.hName === 'Абдыш-Ата' ? '-' : e.w2 && e.aName === 'Абдыш-Ата' ? '-' : e.w2 && e.hName === 'Кайрат' ? '-' : e.w2 && e.aName === 'Кайрат' ? '-' : e.w2 && e.lLogo === undefined ? '-' : e.w2}</span>
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                            <div className="bottom">
                                <Tippy content={e.refree ? e.refree.replace('Арбитры', '') : 'Информация появится позже'}>
                                    <img src={whistle} alt="судья" />
                                </Tippy>
                                <span>{e.lNameRoundDateTime[e.lNameRoundDateTime.length - 1]}</span>
                                <Tippy content={e.weatherDescr.length < 5 ? 'Информация появится позже' : e.weatherDescr}>
                                    {e.weatherDescr.length < 5 ? <span style={{fontWeight: 'bold', color: 'blue'}}>?</span> : <img src={e.weatherIco} alt="погода" />}
                                </Tippy>
                            </div>
                        </SwiperSlide>
            }));
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div id="matchesSlider">
            <section>
                <h3 className="sectionName">Матчи избранных команд</h3>
                <div className="matchesSliderWrap">
                    <Swiper pagination={{type: "progressbar"}} spaceBetween={20} grabCursor={true} slidesPerView={1} breakpoints={{360: {slidesPerView: 2}, 540: {slidesPerView: 3}, 768: {slidesPerView: 4}, 1024: {slidesPerView: 5, spaceBetween: 30}}}>
                        {matchesSlider}
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default MatchesSlider;