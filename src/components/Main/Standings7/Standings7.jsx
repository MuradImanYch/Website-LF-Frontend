import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation} from "swiper";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import $ from 'jquery';
import './Standings7.css';
import translate from 'translate';

import logo from '../../../assets/ico/ecLogo.webp';

import config from '../../../conf.json';

SwiperCore.use([Navigation]);

const Standings6 = () => {
    const[standings, setStandings] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
                params: {
                  season: `${config['european-championship-season']}`,
                  league: '4'
                },
                headers: {
                  'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
            };
              
            try {
                const response = await axios.request(options);
                const standingsData = response.data && response.data.response[0].league.standings[Math.floor(Math.random() * response.data.response[0].league.standings.length)];

                if(standingsData) {
                    const translatedStandings = await Promise.all(standingsData.map(async (e, i) => {
                        const group = e.group.includes('Group') ? await translate(e.group.split(' ')[0], {to: 'ru'}) + ' ' + e.group.split(' ')[1] : await translate(e.group, {to: 'ru'});

                        const description = await translate(e.description, { to: 'ru' });
                        const teamName = await translate(e.team.name, { to: 'ru' });

                        return <div key={'ec' + i}>
                                    <div className="group" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{group}</div>
                                        <div className="col">
                                            <div className="left">
                                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={description}><span style={{...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null), ...(e.description?.includes('Promotion') ? {background: '#e90812', color: '#fff'} : null), ...(e.description?.includes('third-placed') ? {background: '#19c778', color: '#fff'} : null)}} className={`place`}>{e.rank}</span></Tippy>
                                                <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={teamName}><img loading="lazy" src={e.team.logo} alt={teamName} /></Tippy></LazyLoad>
                                                <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{teamName}</span>
                                            </div>
                                            <div className="nums">
                                                <span className="games" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.all.played}</span>
                                                <div className="forAgainst">
                                                    <span className='for' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.all.goals.for}</span>
                                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>:</span>
                                                    <span className='against' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.all.goals.against}</span>
                                                </div>
                                                <div className="points" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.points}</div>
                                            </div>
                                        </div>
                                </div>
                    }));

                    setStandings(translatedStandings);
                }
            } catch (error) {
                console.error(error);
            }
        }
        
        // fetchData();
    }, []);

    return (
        <div className='table5xn standingsEurocups standings7'>
                <section id='standings7QckNav'>
                    <h2 className="sectionName">Турнирная таблица - ЧЕ 2024</h2>
                    <Swiper navigation grabCursor={true} slidesPerView={1}>
                        <SwiperSlide>
                            <div className="lLogo">
                                <LazyLoad offset={800} height={40}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='ЧЕ 2024'><img loading="lazy" src={logo} alt="ЧЕ 2024" /></Tippy></LazyLoad>
                            </div>
                            <div className="head">
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>#</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>Команда</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>И</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>З : П</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#000'} : null}>О</span></Tippy>
                            </div>
                            {standings ? standings : <div className='noData'>Данных нет</div>}
                            <Link to="/league/ec/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                        </SwiperSlide>
                    </Swiper>
                </section>
        </div>
    );
};

export default Standings6;