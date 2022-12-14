import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import uelLogo from '../../../assets/ico/uelLogo.webp';

SwiperCore.use([Navigation]);

const Standings5 = () => {
    const [uelStandings1, setUelStandings1] = useState();
    const [uelStandings2, setUelStandings2] = useState();
    const [uelStandings3, setUelStandings3] = useState();

    let endpoints = ['/uelStandingsA', '/uelStandingsB', '/uelStandingsC', '/uelStandingsD', '/uelStandingsE', '/uelStandingsF', '/uelStandingsG', '/uelStandingsH'];

    useEffect(() => {
        function getMultipleRandom(endpoints, num) {
            const shuffled = [...endpoints].sort(() => 0.5 - Math.random());
          
            return shuffled.slice(0, num);
        }
        let selected1 = getMultipleRandom(endpoints, 3)[0];
        let selected2 = getMultipleRandom(endpoints, 3)[1];
        let selected3 = getMultipleRandom(endpoints, 3)[2];

        axios.get(selected1)
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('uelStandings1', JSON.stringify(response.data));
            }
            setUelStandings1(JSON.parse(localStorage.getItem('uelStandings1')) && JSON.parse(localStorage.getItem('uelStandings1')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'uelStandings1' + i}>
                    <div className="group">{e.group}</div>
                        <div className="col">
                            <div className="left">
                                <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                <Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy>
                                <span className='name'>{e.name}</span>
                            </div>
                            <div className="nums">
                                <span className="games">{e.games}</span>
                                <div className="forAgainst">
                                    <span className='for'>{e.goalsFor}</span>
                                    <span>:</span>
                                    <span className='against'>{e.goalsAgainst}</span>
                                </div>
                                <div className="points">{e.points}</div>
                            </div>
                        </div>
                </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get(selected2)
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('uelStandings2', JSON.stringify(response.data));
            }
            setUelStandings2(JSON.parse(localStorage.getItem('uelStandings2')) && JSON.parse(localStorage.getItem('uelStandings2')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'uelStandings2' + i}>
                    <div className="group">{e.group}</div>
                        <div className="col">
                            <div className="left">
                                <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                <Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy>
                                <span className='name'>{e.name}</span>
                            </div>
                            <div className="nums">
                                <span className="games">{e.games}</span>
                                <div className="forAgainst">
                                    <span className='for'>{e.goalsFor}</span>
                                    <span>:</span>
                                    <span className='against'>{e.goalsAgainst}</span>
                                </div>
                                <div className="points">{e.points}</div>
                            </div>
                        </div>
                </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get(selected3)
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('uelStandings3', JSON.stringify(response.data));
            }
            setUelStandings3(JSON.parse(localStorage.getItem('uelStandings3')) && JSON.parse(localStorage.getItem('uelStandings3')).map((e, i) => {
                return <div className={'id' + e.group.split(' ')[1]} key={'uelStandings3' + i}>
                    <div className="group">{e.group}</div>
                        <div className="col">
                            <div className="left">
                                <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                <Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy>
                                <span className='name'>{e.name}</span>
                            </div>
                            <div className="nums">
                                <span className="games">{e.games}</span>
                                <div className="forAgainst">
                                    <span className='for'>{e.goalsFor}</span>
                                    <span>:</span>
                                    <span className='against'>{e.goalsAgainst}</span>
                                </div>
                                <div className="points">{e.points}</div>
                            </div>
                        </div>
                </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className='table5xn standingsEurocups'>
                <section>
                    <h3 className="sectionName">?????????????????? ?????????????? - ???????? ????????????</h3>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='????'><img src={uelLogo} alt="????" /></Tippy>
                            </div>
                            <div className="head">
                                <Tippy content="??????????????"><span>#</span></Tippy>
                                <Tippy content="????????????????"><span>??????????????</span></Tippy>
                                <Tippy content="???????????????????? ??????"><span>??</span></Tippy>
                                <Tippy content="?????????????? ???????? : ?????????????????????? ????????"><span>?? : ??</span></Tippy>
                                <Tippy content="????????"><span>??</span></Tippy>
                            </div>
                            {uelStandings1}
                            <Link to="#">??????????????????</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='????'><img src={uelLogo} alt="????" /></Tippy>
                            </div>
                            <div className="head">
                                <Tippy content="??????????????"><span>#</span></Tippy>
                                <Tippy content="????????????????"><span>??????????????</span></Tippy>
                                <Tippy content="???????????????????? ??????"><span>??</span></Tippy>
                                <Tippy content="?????????????? ???????? : ?????????????????????? ????????"><span>?? : ??</span></Tippy>
                                <Tippy content="????????"><span>??</span></Tippy>
                            </div>
                            {uelStandings2}
                            <Link to="#">??????????????????</Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="lLogo">
                                <Tippy content='????'><img src={uelLogo} alt="????" /></Tippy>
                            </div>
                            <div className="head">
                                <Tippy content="??????????????"><span>#</span></Tippy>
                                <Tippy content="????????????????"><span>??????????????</span></Tippy>
                                <Tippy content="???????????????????? ??????"><span>??</span></Tippy>
                                <Tippy content="?????????????? ???????? : ?????????????????????? ????????"><span>?? : ??</span></Tippy>
                                <Tippy content="????????"><span>??</span></Tippy>
                            </div>
                            {uelStandings3}
                            <Link to="#">??????????????????</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings5;