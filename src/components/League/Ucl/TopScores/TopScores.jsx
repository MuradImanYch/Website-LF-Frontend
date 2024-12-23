import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import logo from '../../../../assets/ico/uclLogo.webp';
import axios from 'axios';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';

import person from '../../../../assets/ico/person.webp';

const TopScores = () => {
    const [topScores, setTopScores] = useState(); 

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/standings/uclTS')
            .then(response => {
                setTopScores(response.data && response.data.map((e, i) => {
                    return <div key={'ucl' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={person} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.tName}><img loading="lazy" src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="goals">{e.goals ? e.goals : '0'}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.pen === '(undefined' ? '(0)' : e.pen}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }

        // fetchData();
    }, []);

    return (
        <div className='leagueTopScores table6xn'>
            <Helmet>
                <title>Лига Чемпионов (ЛЧ) - Список бомбардиров</title>
                <meta name="description" content="Таблица бомбардиров Лиги Чемпионов (ЛЧ)." />
                <meta name="keywords" content="лч бомбардиры, таблица бомбардиров лига чемпионов, бомбардиры европейский футбол, список бомбардиров лч, бомбардиры лч, реал мадрид бомбардиры, манчестер юнайтед бомбардиры, манчестер сити бомбардиры, ливерпуль бомбардиры, таблица бомбардиров лч" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='ЛЧ'><img loading="lazy" src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Бомбардиры - Лига Чемпионов</h1>
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