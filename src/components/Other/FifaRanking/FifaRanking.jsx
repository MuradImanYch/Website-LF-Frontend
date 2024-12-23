import React, { useEffect, useState } from 'react';
import './FifaRanking.css';
import $ from 'jquery';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import {Helmet} from 'react-helmet-async';

import fifaLogo from '../../../assets/ico/fifaLogo.webp';

const FifaRanking = () => {
    const[fifaCountryRank, setFifaCountryRank] = useState();
    const[expandToggle, setExpandToggle] = useState(50);

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/standings/fifaranking')
            .then(response => {
                setFifaCountryRank(response.data && response.data.splice(0, expandToggle).map((item, indx) => {
                    return <div className="col wrap" key={'fifaRanking' + indx} style={localStorage.getItem('darkTheme') === 'true' ? {background: 'rgb(34, 34, 34)'} : null}>
                    <div>
                        <span className='place' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.place}.<span></span></span>
                        <div className='flagName'><LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={item.name}><img loading="lazy" src={item.flag} alt={item.name} /></Tippy></LazyLoad><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.name}</span></div>
                        <span className={item.difference[0] === '=' ? 'diffEqual' : false || item.difference[0] === '↑' ? 'diffUp' : false || item.difference[0] === '↓' ? 'diffDown' : false}>{item.difference}</span>
                        <span className='total' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.points}</span>
                    </div>
                    <div>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.pointsDiff}</span>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.association}</span>
                    </div>
                </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }

        // fetchData();
    }, [expandToggle]); 

    const fifaCountryRankToggle = () => {
        setExpandToggle(expandToggle + 20);
        $('#fifaRank > section > div > div.more > a > span').text('Подробнее');
    }

    return (
        <div id='fifaRankOther'>
            <Helmet>
                <title>Онлайн рейтинг ФИФА (FIFA) - Таблица коэффициентов сборных</title>
                <meta name="description" content="Изучите таблицу коэффициентов ФИФА (FIFA) в онлайн режиме - рейтинг сборных на мировой футбольной арене." />
                <meta name="keywords" content="таблица коэффициентов фифа, рейтинг команд фифа, таблица ассоциаций фифа, рейтинговые позиции стран фифа, fifa коэффициент, рейтинг фифа" />
            </Helmet>
            <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Рейтинг ФИФА</h1>
            <section>
                <div className="uefaTable">
                    <div className="logoWrap">
                        <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='FIFA'><img loading="lazy" src={fifaLogo} alt="fifaLogo" /></Tippy></LazyLoad>
                    </div>
                    <div className="col">
                        <div>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Страна"><span>Страна</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Изменения в позиции"><span>Изменения</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Сумма очков"><span className='total'>Очки</span></Tippy>
                        </div>
                        <div>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Разница с предыдущими очками"><span>+/-</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ассоциация"><span>Ассоциация</span></Tippy>
                        </div>
                    </div>
                    {fifaCountryRank}
                    <div className="more">
                        <span onClick={fifaCountryRankToggle} style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Развернуть список</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FifaRanking;