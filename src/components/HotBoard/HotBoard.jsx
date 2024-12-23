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
import { Link } from 'react-router-dom';
import translate from 'translate';

SwiperCore.use([Autoplay]);

function HotBoard() {
    const [liveMatches, setLiveMatches] = useState();
    const [matchesQuant, setMatchesQuant] = useState('0');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                    params: {live: 'all'},
                    headers: {
                      'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                };

                const response = await axios.request(options);
                const liveMatchesData = response.data && response.data.response;

                if (liveMatchesData) {
                    const translatedMatches = await Promise.all(liveMatchesData.map(async (e) => {
                        const translatedHomeName = await translate(e.teams.home.name, { to: 'ru' });
                        const translatedAwayName = await translate(e.teams.away.name, { to: 'ru' });
                        const translatedLeagueName = await translate(e.league.country + ' | ' + e.league.name + ' | ' + e.league.round, { to: 'ru' });

                        return (
                            <SwiperSlide key={'live' + e.fixture.id} id={'live' + e.fixture.id}>
                                <Link to={`#`} className='slideWrap'> {/* <Link to={`/match/${e.fixture.id}`} className='slideWrap'> */}
                                    <Tippy content={e.fixture.status.long}><span className='status' style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null}>{e.fixture.status.short}</span></Tippy>
                                    <progress value={e.fixture.status.elapsed} max={90}></progress>
                                    <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null}>{String(translatedHomeName).slice(0, 10)}</span>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='bottom' content={String(translatedHomeName)}>
                                        <img loading="lazy" width={'13px'} src={e.teams.home.logo} alt={`${String(translatedHomeName)}`} />
                                    </Tippy>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null} className='hScore'>{e.events[e.events.length - 1]?.type === 'Goal' && e.teams.home.name === e.events[e.events.length - 1]?.team.name && e.fixture.status.elapsed - e.events[e.events.length - 1]?.time.elapsed <= 3 ? <span className="goal-event">{e.goals.home}</span> : e.goals.home}</span>
                                    <div className="lLogoTime">
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='bottom' content={translatedLeagueName}>
                                            <img loading="lazy" width={'14px'} src={e.league.logo} alt={`${e.league.name}`} />
                                        </Tippy>
                                        <span style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null} className="time">{e.fixture.status.elapsed}'</span>
                                    </div>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null} className='aScore'>{e.events[e.events.length - 1]?.type === 'Goal' && e.teams.away.name === e.events[e.events.length - 1]?.team.name && e.fixture.status.elapsed - e.events[e.events.length - 1]?.time.elapsed <= 3 ? <span className="goal-event">{e.goals.away}</span> : e.goals.away}</span>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='bottom' content={String(translatedAwayName)}>
                                        <img loading="lazy" width={'13px'} src={e.teams.away.logo} alt={`${String(translatedAwayName)}`} />
                                    </Tippy>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null} className="aName">{String(translatedAwayName).slice(0, 10)}</span>
                                </Link>
                            </SwiperSlide>
                        );
                    }));

                    setLiveMatches(translatedMatches);
                    setMatchesQuant(liveMatchesData.length);

                    if (liveMatchesData.length > 0) {
                        document.querySelector('.hotBoard .liveWrap span').style.color = 'red';
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        /* // fetchData();
        setInterval(() => {
            // fetchData();
        }, 60000); */
    }, []);

    return (
        <div className="hotBoard">
            {config['ny-christmass-theme'] && <Sparkle count={50} color={'gold'} fadeOutSpeed={30} minSize={10} />}
            <Swiper spaceBetween={100} centeredSlides={true} speed={5000} autoplay={{ delay: 1, disableOnInteraction: false }} slidesPerView={2} breakpoints={{ 280: { slidesPerView: 1.3 }, 540: { slidesPerView: 2 }, 768: { slidesPerView: 2.5 }, 1000: { slidesPerView: 3.5 }, 1200: { slidesPerView: 4.5 }, 1920: { slidesPerView: 6 } }} freeMode={true}>
                {liveMatches && liveMatches.length > 0 ? liveMatches : <div className='noData'>Данных нет</div>}
            </Swiper>
            <div className="liveWrap">
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='bottom' content='Количество матчей'>
                    <span style={localStorage.getItem('darkTheme') === 'true' ? { borderColor: '#fff' } : null}>{matchesQuant}</span>
                </Tippy>
            </div>
        </div>
    );
}

export default HotBoard;