import React, { useEffect, useState }  from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './Rpl.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import LazyLoad from 'react-lazy-load';

import rplLogo from '../../../assets/ico/rplLogo.webp';
import uefaLogo from '../../../assets/ico/uefaLogo.webp';
import fifaLogo from '../../../assets/ico/fifaLogo.webp';

const Rpl = () => {
    const[season, setSeason] = useState();
    const[rplLastWinner, setRplLastWinner] = useState();
    const[rplMostWinner, setRplMostWinner] = useState();
    const[rplStandings, setRplStandings] = useState();
    const[rplTopScores, setRplTopScores] = useState();
    const[news, setNews] = useState();
    const[rplResults, setRplResults] = useState();
    const[news2, setNews2] = useState();
    const[news3, setNews3] = useState();
    const[rplFixtures, setRplFixtures] = useState();
    const[uefaCurrentSeason, setUefaCurrentSeason] = useState();
    const[uefaRankName, setUefaRankName] = useState();
    const[fifaRankName, setFifaRankName] = useState();
    const[news4, setNews4] = useState();
    const[transferList, setTransferList] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://legfootball.herokuapp.com/rplSeasonInfo')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('rplSeasonInfo', JSON.stringify(response.data));
                }
                setSeason(JSON.parse(localStorage.getItem('rplSeasonInfo')).split('-')[1].split(':')[0]);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/rplLastWinner')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('rplLastWinner', JSON.stringify(response.data));
                }
                setRplLastWinner(JSON.parse(localStorage.getItem('rplLastWinner')));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/rplMostWinner')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('rplMostWinner', JSON.stringify(response.data));
                }
                setRplMostWinner(JSON.parse(localStorage.getItem('rplMostWinner')).split('(')[0]);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/rplStandings')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('rplStandings', JSON.stringify(response.data));
                }
                setRplStandings(JSON.parse(localStorage.getItem('rplStandings')) && JSON.parse(localStorage.getItem('rplStandings')).splice(0, 8).map((e, i) => {
                    return <div key={'rplStandings' + i} className="col">
                                <div className="left">
                                    <Tippy content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy></LazyLoad>
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
    
            await axios.get('https://legfootball.herokuapp.com/rplTopScores')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('rplTopScores', JSON.stringify(response.data));
                }
                setRplTopScores(JSON.parse(localStorage.getItem('rplTopScores')) && JSON.parse(localStorage.getItem('rplTopScores')).splice(1, 8).map((e, i) => {
                    return <div key={'rplTopScores' + i} className="col">
                                <div className="left">
                                    <span className="place">{e.place}</span>
                                    <LazyLoad offset={800}><Tippy content={e.player}><img src={e.img} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name'>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy content={e.tName}><img src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
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
    
            await axios.get('https://legfootball.herokuapp.com/news/rplNews')
            .then(response => {
                setNews(response.data && response.data.reverse().splice(0, 2).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
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
                    return  <div key={'news' + e.id} className="cart" id={'id' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <Link to={`/news/read/${e.id}`}>
                                    <div className="img"><LazyLoad offset={800}><img alt={e.title} src={e.img} /></LazyLoad></div>
                                    <h3>{e.title}</h3>
                                    <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                                    <span className='category'>{`#${e.category}`}</span>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/rplResults')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('rplResults', JSON.stringify(response.data));
                }
                let filtered = JSON.parse(localStorage.getItem('rplResults')).filter(e => {
                    return e.round === JSON.parse(localStorage.getItem('rplResults'))[0].round;
                });
                setRplResults(filtered && filtered.map((e, i) => {
                    return <div className="col" key={'rpl' + i}>
                                <div className="round"><span>{e.round}</span></div>
                                <div className="center">
                                    <span className='hName'>{e.hName}</span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.hName}>
                                            <img src={e.hLogo} alt={e.hName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='hScore'>{e.hScore}</span>
                                    -
                                    <span className='aScore'>{e.aScore}</span>
                                    <span></span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.aName}>
                                            <img src={e.aLogo} alt={e.aName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='aName'>{e.aName}</span>
                                </div>
                                <div className="dateTime"><span>{e.dateTime}</span></div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/news/rplNews')
            .then(response => {
                setNews2(response.data && response.data.reverse().splice(2, 2).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
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
                    return  <div key={'news' + e.id} className="cart" id={'id' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <Link to={`/news/read/${e.id}`}>
                                    <div className="img"><LazyLoad offset={800}><img alt={e.title} src={e.img} /></LazyLoad></div>
                                    <h3>{e.title}</h3>
                                    <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                                    <span className='category'>{`#${e.category}`}</span>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/news/rplNews')
            .then(response => {
                setNews3(response.data && response.data.reverse().splice(4, 2).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
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
                    return  <div key={'news' + e.id} className="cart" id={'id' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <Link to={`/news/read/${e.id}`}>
                                    <div className="img"><LazyLoad offset={800}><img alt={e.title} src={e.img} /></LazyLoad></div>
                                    <h3>{e.title}</h3>
                                    <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                                    <span className='category'>{`#${e.category}`}</span>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/rplFixtures')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('rplFixtures', JSON.stringify(response.data));
                }
                let filtered = JSON.parse(localStorage.getItem('rplFixtures')).filter(e => {
                    return e.round === JSON.parse(localStorage.getItem('rplFixtures'))[0].round;
                });
                setRplFixtures(filtered && filtered.map((e, i) => {
                    return <div className="col" key={'rpl' + i}>
                                <div className="round"><span>{e.round}</span></div>
                                <div className="center">
                                    <span className='hName'>{e.hName}</span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.hName}>
                                            <img src={e.hLogo} alt={e.hName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='hScore'>{e.hScore}</span>
                                    -
                                    <span className='aScore'>{e.aScore}</span>
                                    <span></span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.aName}>
                                            <img src={e.aLogo} alt={e.aName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='aName'>{e.aName}</span>
                                </div>
                                <div className="dateTime"><span>{e.dateTime}</span></div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/uefaCountryRankSeason')
            .then(response => {
                setUefaCurrentSeason(response.data[0].seasonCurrent);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/uefaCountryRank')
            .then(response => {
                setUefaRankName(response.data && response.data.filter(e => {
                    return e.name === 'Россия';
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            setFifaRankName(JSON.parse(localStorage.getItem('fifaRanking')) && JSON.parse(localStorage.getItem('fifaRanking')).filter(e => {
                return e.name === 'Россия';
            }));  
    
            await axios.get('https://legfootball.herokuapp.com/news/rplNews')
            .then(response => {
                setNews4(response.data && response.data.reverse().splice(6, 2).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
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
                    return  <div key={'news' + e.id} className="cart" id={'id' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <Link to={`/news/read/${e.id}`}>
                                    <div className="img"><LazyLoad offset={800}><img alt={e.title} src={e.img} /></LazyLoad></div>
                                    <h3>{e.title}</h3>
                                    <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                                    <span className='category'>{`#${e.category}`}</span>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('https://legfootball.herokuapp.com/transferListRpl')
            .then(response => {
                setTransferList(response.data && response.data.splice(0, 10).map((e, i) => {
                    return <div className="col" key={'transferList' + i}>
                    <div className="player">
                        <LazyLoad offset={800}><Tippy offset={[0, 10]} content={e.name}><img src={e.img} alt={e.name} /></Tippy></LazyLoad>
                        <span>{e.name}</span>
                    </div>
                    <div className="outIn">
                        <Tippy content={e.clubOutName}><img className='out' src={e.clubOut} alt={e.clubOutName} /></Tippy>
                        <span>→</span>
                        <Tippy content={e.clubInName}><img className='in' src={e.clubIn} alt={e.clubInName} /></Tippy>
                    </div>
                    <div className="price">{e.price}</div>
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
        <div id='leagueRpl'>
            <div className="logoPageName">
                <div className="info">
                    <div className='left'>
                        <div>
                            <LazyLoad offset={800}><Tippy content='РПЛ'><img src={rplLogo} alt="rplLogo" /></Tippy></LazyLoad>
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
            <div className="matchesResultNews">
                <div className="resultsWrap">
                    <h3 className="sectionName">Ближайшие матчи</h3>
                    <div className="wrap">
                        {rplFixtures}
                    </div>
                </div>
                <div className="newsWrap newsVr leagueNews">
                    {news2}
                </div>
            </div>
            <div className="newsFixtures">
                <div className="newsWrap newsVr leagueNews">
                    {news3}
                </div>
                <div className="resultsWrap">
                    <h3 className="sectionName">Последние результаты</h3>
                    <div className="wrap">
                        {rplResults}
                    </div>
                </div>
            </div>
            <div className="ranksNewsTransfers">
                <div className="ranksWrap">
                    <div className="ranks">
                        <h3 className="sectionName">Рейтинг в УЕФА</h3>
                        <div className="wrap">
                            <div className="logoWrap">
                                <LazyLoad offset={800}><Tippy content='UEFA'><img src={uefaLogo} alt="uefaLogo" /></Tippy></LazyLoad>
                            </div>
                            <div className="flagPlace">
                                <LazyLoad offset={800}><Tippy content={uefaRankName && uefaRankName[0].name}><img src={uefaRankName && 'https://terrikon.com' + uefaRankName[0].flag} alt={uefaRankName && uefaRankName[0].name} /></Tippy></LazyLoad>
                                <Tippy content='Позиция'><span className="place">#<span>{uefaRankName && uefaRankName[0].place}</span></span></Tippy>
                            </div>
                            <div className="head">
                                <Tippy content="Сумма очков за текущий сезон"><span className='current'>{uefaCurrentSeason}</span></Tippy>
                                <Tippy content="Сумма очков"><span className='total'>Сумма</span></Tippy>
                            </div>
                            <div className='currentTotal'>
                                <span>{uefaRankName && uefaRankName[0].totalCurrent}</span>
                                <span>{uefaRankName && uefaRankName[0].total}</span>
                            </div>
                            <Link to="/other/uefa-country-ranking">Подробнее</Link>
                        </div>
                    </div>
                    <div className="ranks">
                        <h3 className="sectionName">Рейтинг в ФИФА</h3>
                        <div className="wrap">
                            <div className="logoWrap">
                                <LazyLoad offset={800}><Tippy content='FIFA'><img src={fifaLogo} alt="fifaLogo" /></Tippy></LazyLoad>
                            </div>
                            <div className="flagPlace">
                                <LazyLoad offset={800}><Tippy content={fifaRankName && fifaRankName[0].name}><img src={fifaRankName && fifaRankName[0].flag} alt={fifaRankName && fifaRankName[0].name} /></Tippy></LazyLoad>
                                <Tippy content='Позиция'><span className="place">#<span>{fifaRankName && fifaRankName[0].place}</span></span></Tippy>
                            </div>
                            <div className="head">
                                <Tippy content="Сумма очков"><span className='total'>Сумма</span></Tippy>
                            </div>
                            <div className='currentTotal'>
                                <span>{fifaRankName && fifaRankName[0].points}</span>
                            </div>
                            <Link to="/other/fifa-ranking">Подробнее</Link>
                        </div>
                    </div>
                </div>
                <div className="newsWrap newsVr leagueNews">
                    {news4}
                </div>
                <div id='transferList'>
                    <h3 className="sectionName">Список популярных трансферов</h3>
                    <div className="listWrap">
                        {transferList}
                    </div>
                    <Link to="/transfers/list">Подробнее</Link>
                </div>
            </div>
        </div>
    );
};

export default Rpl;