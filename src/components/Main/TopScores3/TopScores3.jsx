import React, { useEffect, useState } from 'react';
import './TopScores3.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import euroQualLogo from '../../../assets/ico/euroQualLogo.webp';
import unlLogo from '../../../assets/ico/unlLogo.webp';
import person from '../../../assets/ico/person.webp';

SwiperCore.use([Navigation]);

const TopScores3 = () => {
    const [euroQualTopScores, setEuroQualTopScores] = useState(); 
    const [unlTopScores, setUnlTopScores] = useState(); 

    useEffect(() => { 
        axios.get('/unlTopScores')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('unlTopScores', JSON.stringify(response.data));
            }
            setUnlTopScores(JSON.parse(localStorage.getItem('unlTopScores')) && JSON.parse(localStorage.getItem('unlTopScores')).splice(0, 8).map((e, i) => {
                return <div id={'unlTopScores' + i} key={'unlTopScores' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <Tippy content={e.player}><img src={person} alt={e.player} /></Tippy>
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
        })
    }, []);

    return (
        <div className='table6xn' id="topScores3">
            <section>
                <h3 className="sectionName">???????????????????? - ?????????????? ??????????????</h3>
                <Swiper navigation grabCursor={true} slidesPerView={1}>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='?????????????????????? ????????.'><img src={euroQualLogo} alt="?????????????????????? ????????." /></Tippy>
                        </div>
                        <div className="head">
                            <Tippy content="??????????????"><span>#</span></Tippy>
                            <Tippy content="??????????"><span>??????????</span></Tippy>
                            <Tippy content="??????????????"><span>??</span></Tippy>
                            <Tippy content="????????"><span>??</span></Tippy>
                            <Tippy content="??????????????"><span>??</span></Tippy>
                            <Tippy content="???????????????????? ??????"><span>??</span></Tippy>
                        </div>
                        {euroQualTopScores}
                        <Link to="#">??????????????????</Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="lLogo">
                            <Tippy content='????'><img src={unlLogo} alt="????" /></Tippy>
                        </div>
                        <div className="head">
                            <Tippy content="??????????????"><span>#</span></Tippy>
                            <Tippy content="??????????"><span>??????????</span></Tippy>
                            <Tippy content="??????????????"><span>??</span></Tippy>
                            <Tippy content="????????"><span>??</span></Tippy>
                            <Tippy content="??????????????"><span>??</span></Tippy>
                            <Tippy content="???????????????????? ??????"><span>??</span></Tippy>
                        </div>
                        {unlTopScores}
                        <Link to="#">??????????????????</Link>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default TopScores3;