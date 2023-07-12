import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import logo from '../../../../assets/ico/laligaLogo.webp';
import axios from 'axios';
import Helmet from 'react-helmet';

import person from '../../../../assets/ico/person.webp';

const TopScores = () => {
    const [topScores, setTopScores] = useState(); 

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/standings/laligaTS')
            .then(response => {
                setTopScores(response.data && response.data.splice(1).map((e, i) => {
                    return <div key={'laliga' + i} className="col">
                                <div className="left">
                                    <span className="place">{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.player}><img src={person} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name'>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span className="goals">{e.goals ? e.goals : '0'}</span>
                                    <span>{e.pen === '(undefined' ? '(0)' : e.pen}</span>
                                    <span>{e.games}</span>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }

        fetchData();
    }, []);

    return (
        <div className='leagueTopScores table6xn'>
            <Helmet>
                <title>Ла лига - Список бомбардиров - на Legendary Football</title>
                <meta name="description" content="Таблица бомбардиров чемпионата испании (Ла лиги)." />
                <meta name="keywords" content="ла лига, чемпионат испании, испанский футбол, футбол, реал мадрид, атлетико мадрид, севилья, барселона, таблица бомбардиров ла лиги, список бомбардиров ла лиги" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy content='Ла Лига'><img src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 className="pageName">Бомбардиры - Ла Лига</h1>
            </div>
            <div className="head">
                <Tippy content="Позиция"><span>#</span></Tippy>
                <Tippy content="Игрок"><span>Игрок</span></Tippy>
                <Tippy content="Команда"><span>К</span></Tippy>
                <Tippy content="Голы"><span>Г</span></Tippy>
                <Tippy content="С пенальти"><span>П</span></Tippy>
                <Tippy content="Количество игр"><span>И</span></Tippy>
            </div>
            {topScores && topScores.length > 0 ? topScores : <div className='noData'>Данных нет</div>}
        </div>
    );
};

export default TopScores;