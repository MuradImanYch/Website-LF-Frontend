import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import logo from '../../../../assets/ico/rplLogo.webp';
import axios from 'axios';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';
import translate from 'translate';
import './TopScores.css';

import config from '../../../../conf.json';

const TopScores = () => {
    const [topScores, setTopScores] = useState(); 

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
                params: {
                  league: '235',
                  season: `${config['russian-premier-league-season'].split('/')[0]}`
                },
                headers: {
                  'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
            };
            
            try {
                const response = await axios.request(options);
                const tsData = response.data && response.data.response;

                if (tsData) {
                    const translatedTS = await Promise.all(tsData.map(async (e, i) => {
                        const player = await translate(e.player.name, {to: 'ru'});
                        const playerFN = await translate(e.player.firstname + ' ' + e.player.lastname, {to: 'ru'});
                        const team = config['correct-translations'][`${await translate(e.statistics[0].team.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.statistics[0].team.name, {to: 'ru'})}`] : await translate(e.statistics[0].team.name, {to: 'ru'});

                        return (
                            <div key={'ts' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{i + 1}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={playerFN}><img loading="lazy" src={e.player.photo} alt={player}/></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={team}><img loading="lazy" src={e.statistics[0].team.logo} alt={team} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="goals">{e.statistics[0].goals.total}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.statistics[0].penalty.scored}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.statistics[0].games.appearences}</span>
                                </div>
                            </div>
                        )
                    }));

                    setTopScores(translatedTS);
                }
            }
            catch (error) {
                console.error(error);
            }
        }

        // fetchData();
    }, []);

    return (
        <div className='leagueTopScores table6xn'>
            <Helmet>
                <title>Российская Премьер Лига (РПЛ) - Список бомбардиров</title>
                <meta name="description" content="Таблица бомбардиров чемпионата России (РПЛ)." />
                <meta name="keywords" content="рпл бомбардиры, бомбардиры рпл, чемпионат россии бомбардиры, бомбардиры зенит, бомбардиры цска, бомбардиры краснодар, бомбардиры спартак москва, таблица бомбардиров рпл, список бомбардиров рпл" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={`РПЛ ${config['russian-premier-league-season']}`}><img loading="lazy" src={logo} alt={`РПЛ ${config['russian-premier-league-season']}`} /></Tippy>
                </LazyLoad>
                <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Российская Премьер-Лига {config['russian-premier-league-season']}</h1>
            </div>
            <div className="head">
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="С пенальти"><span>П</span></Tippy>
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
            </div>
            {topScores && topScores.length > 0 ? topScores : <div className='noData'>Данных нет</div>}
        </div>
    );
};

export default TopScores;