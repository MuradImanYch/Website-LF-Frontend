import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import logo from '../../../../assets/ico/unlLogo.webp';
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
            await axios.get('/standings/unlTS')
            .then(response => {
                setTopScores(response.data && response.data.map((e, i) => {
                    return <div key={'unlTS' + i} className="col">
                                <div className="left">
                                    <span className="place">{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.player}><img loading="lazy" src={person} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name'>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy content={e.tName}><img loading="lazy" src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
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
                <title>Лига Наций (ЛН) - Список бомбардиров - на Legendary Football</title>
                <meta name="description" content="Таблица бомбардиров отборочного турнира Лиги Наций (ЛН)." />
                <meta name="keywords" content="лн, лига наций, европейский футбол, футбол, сборная германии, сборная англии, сборная португалии, сборная испании, таблица бомбардиров лн, список бомбардиров лн" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy content='Лига наций'><img loading="lazy" src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 className="pageName">Бомбардиры - Лига наций</h1>
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