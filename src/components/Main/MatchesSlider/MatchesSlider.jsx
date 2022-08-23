import React, { useEffect, useState } from 'react';
import './MatchesSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import $ from 'jquery';
import { Swiper, SwiperSlide } from "swiper/react";
import friendly from '../../../assets/ico/friendly.webp';
import stadium from '../../../assets/ico/stadium.webp';
import location from '../../../assets/ico/location.webp';
import whistle from '../../../assets/ico/whistle.webp';

const MatchesSlider = () => { 
    const[matchesSlider, setMatchesSlider] = useState();

    useEffect(() => {
        $.ajax({
            type: "GET",
            url: '/matchesSlider'
        }).done(function (response) {
              const uniqueIds = [];
              
              const unique = response.filter(element => { // del duplicate obj props/teams
                const isDuplicate = uniqueIds.includes(element.hName);
                if (!isDuplicate) {
                  uniqueIds.push(element.hName);
                  return true;
                }
              
                return false;
              });
            setMatchesSlider(unique && unique.map((e, i) => {
                return <SwiperSlide key={'key' + i} id={'id' + i}>
                            <div className="top">
                                <div className="lNameLogo">
                                    <img src={stadium} alt="стадион" title={e.stadium === '' ? 'Информация появится позже' : e.stadium} />
                                    {e.lLogo === undefined ? <img src={friendly} alt={e.lNameRoundDateTime[0]} title='Товарищеский' width={'18px'} height={'18px'} /> : <img src={e.lLogo} alt={e.lNameRoundDateTime[0]} title={e.lNameRoundDateTime[0] + ' | ' + e.lNameRoundDateTime[1]} />}
                                    <img src={location} alt="геолокация" title={e.venue === '' ? 'Информация появится позже' : e.venue} />
                                </div>
                                <div className="teamsCoef">
                                    <div className="teams">
                                        <div className="ht">
                                            <img src={e.hLogo} alt={e.hName} title={e.hName} /> <span>{e.hName.slice(0, 13)}</span>
                                        </div>
                                        <div className="at">
                                            <img src={e.aLogo} alt={e.aName} title={e.aName} /> <span>{e.aName.slice(0, 13)}</span>
                                        </div>
                                    </div>
                                    <div className="coefs" title='Коэффициенты могут быть точными в день игры'>
                                        <span>{e.w1 === '' ? '-' : e.w1 && e.hName === 'Дордой' ? '-' : e.w1 && e.aName === 'Дордой' ? '-' : e.w1 && e.hName === 'Абдыш-Ата' ? '-' : e.w1 && e.aName === 'Абдыш-Ата' ? '-' : e.w1  && e.hName === 'Кайрат' ? '-' : e.w1 && e.aName === 'Кайрат' ? '-' : e.w1 && e.lLogo === undefined ? '-' : e.w1}</span>
                                        <span>{e.d === '' ? '-' : e.d && e.hName === 'Дордой' ? '-' : e.d && e.aName === 'Дордой' ? '-' : e.d && e.hName === 'Абдыш-Ата' ? '-' : e.d && e.aName === 'Абдыш-Ата' ? '-' : e.d && e.hName === 'Кайрат' ? '-' : e.d && e.aName === 'Кайрат' ? '-' : e.d && e.lLogo === undefined ? '-' : e.d}</span>
                                        <span>{e.w2 === '' ? '-' : e.w2 && e.hName === 'Дордой' ? '-' : e.w2 && e.aName === 'Дордой' ? '-' : e.w2 && e.hName === 'Абдыш-Ата' ? '-' : e.w2 && e.aName === 'Абдыш-Ата' ? '-' : e.w2 && e.hName === 'Кайрат' ? '-' : e.w2 && e.aName === 'Кайрат' ? '-' : e.w2 && e.lLogo === undefined ? '-' : e.w2}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom">
                                <img src={whistle} alt="судья"  title={e.refree.split(' ').join('').split(':')[0] === 'Арбитры' ? e.refree.split(' ').join('').replaceAll('|', ` | `).replace(':', ': ') : 'Информация появится позже'} />
                                <span>{e.lNameRoundDateTime[e.lNameRoundDateTime.length - 1]}</span>
                                {e.weatherDescr === '' ? <span style={{fontWeight: 'bold', color: 'blue'}} title="Информация появится позже">?</span> : <img src={e.weatherIco} alt="погода" title={e.weatherDescr} />}
                            </div>
                        </SwiperSlide>
            }));
        });
    }, []);

    return (
        <div id="matchesSlider">
            <section>
                <h3 className="sectionName">Предстоящие матчи</h3>
                <div className="matchesSliderWrap">
                    <Swiper spaceBetween={20} grabCursor={true} slidesPerView={1} breakpoints={{360: {slidesPerView: 2}, 540: {slidesPerView: 3}, 768: {slidesPerView: 4}, 1024: {slidesPerView: 5, spaceBetween: 30}}}>
                        {matchesSlider}
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default MatchesSlider;