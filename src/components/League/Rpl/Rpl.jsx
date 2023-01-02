import React, { useEffect, useState }  from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './Rpl.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import rplLogo from '../../../assets/ico/rplLogo.webp';

const Rpl = () => {
    const[season, setSeason] = useState();
    const[rplLastWinner, setRplLastWinner] = useState();
    const[rplMostWinner, setRplMostWinner] = useState();
    const[rplStandings, setRplStandings] = useState();
    const[rplTopScores, setRplTopScores] = useState();
    const[news, setNews] = useState();

    useEffect(() => {
        axios.get('/rplSeasonInfo')
        .then(response => {
            setSeason(response.data.split('-')[1].split(':')[0]);
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/rplLastWinner')
        .then(response => {
            setRplLastWinner(response.data);
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/rplMostWinner')
        .then(response => {
            setRplMostWinner(response.data.split('(')[0]);
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/rplStandings')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('rplStandings', JSON.stringify(response.data));
            }
            setRplStandings(JSON.parse(localStorage.getItem('rplStandings')) && JSON.parse(localStorage.getItem('rplStandings')).splice(0, 8).map((e, i) => {
                return <div id={'rplStandings' + i} key={'rplStandings' + i} className="col">
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
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/rplTopScores')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('rplTopScores', JSON.stringify(response.data));
            }
            setRplTopScores(JSON.parse(localStorage.getItem('rplTopScores')) && JSON.parse(localStorage.getItem('rplTopScores')).splice(1, 8).map((e, i) => {
                return <div id={'rplTopScores' + i} key={'rplTopScores' + i} className="col">
                            <div className="left">
                                <span className="place">{e.place}</span>
                                <Tippy content={e.player}><img src={e.img} alt={e.player}/></Tippy>
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
        });

        axios.get('/rplNews')
        .then(response => {
            setNews(response.data && response.data.reverse().splice(0, 2).map((e) => {
                let date = new Date(e.date);
                let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                let year = date.getFullYear();
                let hours = String(date.getHours()).length < 2 ? '0newsVr' + String(date.getHours()) : String(date.getHours());
                let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());

                const animIn = () => { // anim mouse in
                    $(`.newsVr #${'id' + e.id} .img img`).css({'transform': 'scale(1.04)'});
                    $(`.newsVr #${'id' + e.id}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                    $(`.newsVr #${'id' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                    $(`.newsVr #${'id' + e.id} .img img`).css({'opacity': '1'});
                }
                const animOut = () => { // anim mouse out
                    $(`.newsVr #${'id' + e.id} .img img`).css({'transform': 'scale(1)'});
                    $(`.newsVr #${'id' + e.id}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                    $(`.newsVr #${'id' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                    $(`.newsVr #${'id' + e.id} .img img`).css({'opacity': '0.8'});
                }
                return  <div key={'key' + e.id} className="cart" id={'id' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                            <Link to={`/news/read/${e.id}`}>
                                <div className="img"><img alt={e.title} src={e.img} /></div>
                                <h3>{e.title}</h3>
                                <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                            </Link>
                        </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div id='leagueRpl'>
            <div className="logoPageName">
                <div className="info">
                    <div className='left'>
                        <div>
                            <Tippy content='РПЛ'><img src={rplLogo} alt="rplLogo" /></Tippy>
                        </div>
                        <div>
                            <h1 className="pageName">Российская Премьер-Лига <span>Сезон: {season}</span></h1>
                            <span>Место проведения: <span>Россия</span></span>
                        </div>
                    </div>
                    <div className="right">
                        <span>Действующий победитель: <span>{rplLastWinner}</span></span>
                        <span>Наиболее титулован: <span>{rplMostWinner}</span></span>
                    </div>
                </div>
            </div>
            <div className="standingsTopScores">
                <div className="standingsWrap">
                    <h3 className="sectionName">Турнирная таблица</h3>
                    <div className="table5xn standings">
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Название"><span>Команда</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                            <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                            <Tippy content="Очки"><span>О</span></Tippy>
                        </div>
                        {rplStandings}
                        <Link to="#">Подробнее</Link>
                    </div>
                </div>
                <div className="newsWrap newsVr leagueNews">
                    {news}
                </div>
                <div className="topScoresWrap">
                    <h3 className="sectionName">Бомбардиры</h3>
                    <div className="table6xn topScores">
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="Ассисты"><span>А</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {rplTopScores}
                        <Link to="#">Подробнее</Link>
                    </div>
                </div>
            </div>
            <div className="matchesResultCalendar">
                edwd
            </div>
        </div>
    );
};

export default Rpl;