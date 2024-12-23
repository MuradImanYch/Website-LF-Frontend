import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import logo from '../../../../assets/ico/rplLogo.webp';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';
import translate from 'translate';
import './Standings.css';

import config from '../../../../conf.json';

const Standings = () => {
    const[standings, setStandings] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
                params: {
                  season: `${config['russian-premier-league-season'].split('/')[0]}`,
                  league: '235'
                },
                headers: {
                  'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
              };
              
              try {
                const response = await axios.request(options);
                const standingsData = response.data && response.data.response[0].league.standings;

                if (standingsData) {
                    const translatedStandings = await Promise.all(standingsData.map(async (e, i) => {
                        const translatedPlace = await Promise.all(e.map(async (i, j) => {
                            const description = await translate(i.description, { to: 'ru' });
                                return <Tippy key={'table' + j} trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={description}>
                                    <span style={{...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null), ...(i.description?.includes('Promotion') ? {background: '#e90812', color: '#fff'} : null), ...(i.description?.includes('Relegation') ? {background: '#e70000', color: '#fff'} : null), ...(i.description?.includes('(Relegation)') ? {background: '#ff3535', color: '#fff'} : null), ...(i.description?.includes('Play Offs:') ? {background: '#ff3535', color: '#fff'} : null)}} className={`place`}>{i.rank}</span>
                                </Tippy>
                        }));
                        const translatedTeam = await Promise.all(e.map(async (i, j) => {
                                const teamName = config['correct-translations'][`${await translate(i.team.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(i.team.name, {to: 'ru'})}`] : await translate(i.team.name, {to: 'ru'});
                                return <div key={'logoName' + j} className='logoName'>
                                <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={teamName}><img loading="lazy" src={i.team.logo} alt={teamName} /></Tippy></LazyLoad>
                                <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{teamName}</span>
                            </div>
                        }));

                        return (
                            <div className="wrap" key={'group' + i}>
                                <div className='col'>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                                    {translatedPlace}
                                </div>
                                <div className='col'>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                                    {translatedTeam}
                                </div>
                                <div className="scroll">
                                    <div className='col'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                                        {e.map((e, i) => {
                                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                                        })}
                                    </div>
                                    <div className='col'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                                        {e.map((e, i) => {
                                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.all.played}</span>
                                        })}
                                    </div>
                                    <div className='col'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                                        {e.map((e, i) => {
                                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.all.win}</span>
                                        })}
                                    </div>
                                    <div className='col'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                                        {e.map((e, i) => {
                                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.all.draw}</span>
                                        })}
                                    </div>
                                    <div className='col'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                                        {e.map((e, i) => {
                                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.all.lose}</span>
                                        })}
                                    </div>
                                    <div className='col'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                                        {e.map((e, i) => {
                                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.all.goals.for}</span>
                                        })}
                                    </div>
                                    <div className='col'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                                        {e.map((e, i) => {
                                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.all.goals.against}</span>
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
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
        <div className='leagueStandings eurocups'>
            <Helmet>
                <title>Российская Премьер Лига (РПЛ) - Турнирная таблица</title>
                <meta name="description" content="Турнирная таблица чемпионата России (РПЛ)." />
                <meta name="keywords" content="рпл таблица, таблица рпл, турнирная таблица чемпионата россии, российская премьер-лига турнирная таблица, рпл турнирная таблица, таблица rpl, rpl таблица, зенит таблица, спартак таблица, краснодар таблица, турнирная таблица рпл" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={`РПЛ ${config['russian-premier-league-season']}`}><img loading="lazy" src={logo} alt={`РПЛ ${config['russian-premier-league-season']}`} /></Tippy>
                </LazyLoad>
                <h1 className="pageName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Турнирная таблица - Российская Премьер-Лига {config['russian-premier-league-season']}</h1>
            </div>
            {standings ? standings : <div className='noData'>Данных нет</div>}
        </div>
    );
};

export default Standings;