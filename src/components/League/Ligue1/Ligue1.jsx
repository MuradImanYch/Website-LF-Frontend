import React, { useEffect, useState }  from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import LazyLoad from 'react-lazy-load';
import {Helmet} from 'react-helmet-async';
import translate from 'translate';

import logo from '../../../assets/ico/ligue1Logo.webp';
import fifaLogo from '../../../assets/ico/fifaLogo.webp';
import uefaLogo from '../../../assets/ico/uefaLogo.webp';

import VideoNews from '../../Main/VideoNews/VideoNews';
import Blogs from '../../Main/Blogs/Blogs';

import config from '../../../conf.json';

const Ligue1 = () => {
    const[lastWinner, setLastWinner] = useState();
    const[mostWinner, setMostWinner] = useState();
    const[standings, setStandings] = useState();
    const[topScores, setTopScores] = useState();
    const[news, setNews] = useState();
    const[results, setResults] = useState();
    const[news2, setNews2] = useState();
    const[news3, setNews3] = useState();
    const[fixtures, setFixtures] = useState();
    const[news4, setNews4] = useState();
    const[transferList, setTransferList] = useState();
    const[liveMatches, setLiveMatches] = useState();
    const[uefaCurrentSeason, setUefaCurrentSeason] = useState();
    const[uefaRankName, setUefaRankName] = useState();
    const[fifaRankName, setFifaRankName] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
                params: {
                  season: `${config['ligue-1-season'].split('/')[0]}`,
                  league: '61'
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
                    const translatedStandings = await Promise.all(standingsData.splice(0, 8).map(async (e, i) => {
                        const description = await translate(e.description, { to: 'ru' });
                        const teamName = config['correct-translations'][`${await translate(e.team.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.team.name, {to: 'ru'})}`] : await translate(e.team.name, {to: 'ru'});

                        return <div key={'standings' + i}>
                        <div className="col">
                                <div className="left">
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={description}><span style={{...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null), ...(e.description?.includes('Champions League') ? {background: 'linear-gradient(135deg,#0d0d7b 35%,#bf00ff)', color: '#fff'} : null), ...(e.description?.includes('Europa League') ? {background: 'linear-gradient(135deg,#ff5700 35%,#000)', color: '#fff'} : null), ...(e.description?.includes('Europa Conference') ? {background: 'linear-gradient(135deg,#19c761 35%,#000)', color: '#fff'} : null)}} className={`place`}>{e.rank}</span></Tippy>
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

            await axios.get('/leagueinfo/ligue1')
            .then(response => {
                setLastWinner(response.data[0].lastWinner);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/leagueinfo/ligue1')
            .then(response => {
                setMostWinner(response.data[0].mostWinner.split('(')[0]);
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/uefacountryrankseason')
            .then(response => {
                setUefaCurrentSeason(response.data[0].seasonCurrent);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/uefacountryrank')
            .then(response => {
                setUefaRankName(response.data && response.data.filter(e => {
                    return e.name === 'Франция';
                }));
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/fifaranking')
            .then(response => {
                setFifaRankName(response.data && response.data.filter(e => {
                    return e.name === 'Франция';
                }));  
            })
            .catch(err => {
                console.log(err);
            });

            const optionsTS = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
                params: {
                  league: '61',
                  season: `${config['ligue-1-season'].split('/')[0]}`
                },
                headers: {
                  'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
            };
            
            try {
                const response = await axios.request(optionsTS);
                const tsData = response.data && response.data.response;

                if (tsData) {
                    const translatedTS = await Promise.all(tsData.splice(0, 8).map(async (e, i) => {
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
    
            await axios.get('/news/ligue1News')
            .then(response => {
                setNews(response.data && response.data.reverse().splice(0, 2).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth() + 1).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img"><LazyLoad offset={800}><img loading="lazy" alt={e.title} src={e.img} /></LazyLoad></div>
                                    <h3>{e.title}</h3>
                                    <span className='date'>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes} <span className='views'>👁 {`${e && e.views?.split(',').length > 0 ? e.views?.split(',').length : '0'}`}</span></span>
                                    <span className='category'><span className="likes">❤ {`${e && e.likes?.split(',').length > 0 ? e.likes?.split(',').length : '0'}`}</span> {`#${e.category}`}</span>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/news/ligue1News')
            .then(response => {
                setNews2(response.data && response.data.reverse().splice(2, 2).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth() + 1).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img"><LazyLoad offset={800}><img loading="lazy" alt={e.title} src={e.img} /></LazyLoad></div>
                                    <h3>{e.title}</h3>
                                    <span className='date'>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes} <span className='views'>👁 {`${e && e.views?.split(',').length > 0 ? e.views?.split(',').length : '0'}`}</span></span>
                                    <span className='category'><span className="likes">❤ {`${e && e.likes?.split(',').length > 0 ? e.likes?.split(',').length : '0'}`}</span> {`#${e.category}`}</span>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/news/ligue1News')
            .then(response => {
                setNews3(response.data && response.data.reverse().splice(4, 2).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth() + 1).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img"><LazyLoad offset={800}><img loading="lazy" alt={e.title} src={e.img} /></LazyLoad></div>
                                    <h3>{e.title}</h3>
                                    <span className='date'>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes} <span className='views'>👁 {`${e && e.views?.split(',').length > 0 ? e.views?.split(',').length : '0'}`}</span></span>
                                    <span className='category'><span className="likes">❤ {`${e && e.likes?.split(',').length > 0 ? e.likes?.split(',').length : '0'}`}</span> {`#${e.category}`}</span>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });

            const optionsFixtures = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                params: {
                    league: '61',
                    season: `${config['ligue-1-season'].split('/')[0]}`,
                    status: 'NS'
                },
                headers: {
                  'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
              };
              
              try {
                const response = await axios.request(optionsFixtures);
                const sortedFixtures = response.data.response.sort((a, b) => {
                  return new Date(a.fixture.date) - new Date(b.fixture.date);
                });

                let filtered = sortedFixtures.filter(e => {
                    return e.league.round === response.data.response[0].league.round;
                });

                if (sortedFixtures) {
                  const translatedFixtures = await Promise.all(filtered.splice(0, 8).map(async (e, i) => {
                    const hName = config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] : await translate(e.teams.home.name, {to: 'ru'});
                    const aName = config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] : await translate(e.teams.away.name, {to: 'ru'});
                    const round = await translate(e.league.round, {to: 'ru'});
                    const date = new Date(e.fixture.timestamp * 1000);

                    return (
                        <div className="col" key={'fixture' + i}>
                            <div className="round"><span>{round}</span></div>
                            <div className="center">
                                <span className='hName' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{hName}</span>
                                <LazyLoad offset={800}>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={hName}>
                                        <img loading="lazy" src={e.teams.home.logo} alt={hName} />
                                    </Tippy>
                                </LazyLoad>
                                <span className="hScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>
                                {e.goals.home ? e.goals.home : '-'}
                                </span>
                                <span className="aScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>
                                {e.goals.away ? e.goals.away : '-'}
                                </span>
                                <span></span>
                                <LazyLoad offset={800}>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={aName}>
                                        <img loading="lazy" src={e.teams.away.logo} alt={aName} />
                                    </Tippy>
                                </LazyLoad>
                                <span className='aName' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{aName}</span>
                            </div>
                            <div className="dateTime">
                                <span>{String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear()} | {String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')}</span>
                            </div>
                        </div>
                    )
                  }));

                  setFixtures(translatedFixtures);
                }
            } catch (error) {
                console.error(error);
            }
    
            await axios.get('/news/ligue1News')
            .then(response => {
                setNews4(response.data && response.data.reverse().splice(6, 2).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth() + 1).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img"><LazyLoad offset={800}><img loading="lazy" alt={e.title} src={e.img} /></LazyLoad></div>
                                    <h3>{e.title}</h3>
                                    <span className='date'>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes} <span className='views'>👁 {`${e && e.views?.split(',').length > 0 ? e.views?.split(',').length : '0'}`}</span></span>
                                    <span className='category'><span className="likes">❤ {`${e && e.likes?.split(',').length > 0 ? e.likes?.split(',').length : '0'}`}</span> {`#${e.category}`}</span>
                                </Link>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/transfers/ligue1')
            .then(response => {
                setTransferList(response.data && response.data.splice(0, 10).map((e, i) => {
                    return <div className="col" key={'transferList' + i}>
                    <div className="player">
                        <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} offset={[0, 10]} content={e.name}><img loading="lazy" src={e.img} alt={e.name} /></Tippy></LazyLoad>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                    </div>
                    <div className="outIn">
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.clubOutName}><img loading="lazy" className='out' src={e.clubOut} alt={e.clubOutName} /></Tippy>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>→</span>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.clubInName}><img loading="lazy" className='in' src={e.clubIn} alt={e.clubInName} /></Tippy>
                    </div>
                    <div className="price">{e.price}</div>
                </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });

            const optionsLive = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                params: {
                  live: 'all',
                  league: '61'
                },
                headers: {
                  'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
              };
              
              try {
                const response = await axios.request(optionsLive);
                const liveData = response.data && response.data.response;

                if (liveData) {
                  const translatedMatches = await Promise.all(liveData.map(async (e, i) => {
                    const hName = config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] : await translate(e.teams.home.name, {to: 'ru'});
                    const aName = config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] : await translate(e.teams.away.name, {to: 'ru'});
                    const round = await translate(e.league.round, {to: 'ru'});
                    const statusTxt = await translate(e.fixture.status.long, {to: 'ru'});

                    return (
                      <React.Fragment key={'live' + i}>
                        <div className="col live">
                          <div style={{background: '#f02d54'}} className="round">
                            <span style={{color: '#fff'}}>{round}</span>
                          </div>
                          <div className="center">
                            <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{hName}</span>
                            <LazyLoad offset={800}>
                              <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={hName}>
                                <img style={{maxWidth: '20px', maxHeight: '20px', width: 'auto', height: 'auto'}} loading="lazy" src={e.teams.home.logo} alt={hName} />
                              </Tippy>
                            </LazyLoad>
                            <span className="hScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff', background: '#f02d54'} : {color: '#fff', background: '#f02d54'}}>
                              {e.goals.home ? e.goals.home : '0'}
                            </span>
                            <span className="aScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff', background: '#f02d54'} : {color: '#fff', background: '#f02d54'}}>
                              {e.goals.away ? e.goals.away : '0'}
                            </span>
                            <span></span>
                            <LazyLoad offset={800}>
                              <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={aName}>
                                <img style={{maxWidth: '20px', maxHeight: '20px', width: 'auto', height: 'auto'}} loading="lazy" src={e.teams.away.logo} alt={aName} />
                              </Tippy>
                            </LazyLoad>
                            <span className="aName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{aName}</span>
                          </div>
                          <div style={{background: '#f02d54'}} className="dateTime">
                            <span style={{color: '#fff'}}>{e.fixture.status.elapsed}' {e.fixture.status.short !== 'FT' ? ' | ' + statusTxt : statusTxt}</span>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  }));

                  setLiveMatches(translatedMatches);
                }
              } catch (error) {
                console.error(error);
              }

              const optionsResults = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                params: {
                    league: '61',
                    season: `${config['ligue-1-season'].split('/')[0]}`,
                    status: 'FT'
                },
                headers: {
                  'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
              };
              
              try {
                const response = await axios.request(optionsResults);
                const sortedFixtures = response.data.response.sort((a, b) => {
                  return new Date(a.fixture.date) - new Date(b.fixture.date);
                });

                let filtered = sortedFixtures.reverse().filter(e => {
                    return e.league.round === response.data.response[0].league.round;
                });

                if (filtered) {
                  const translatedFixtures = await Promise.all(filtered.splice(0, 8).map(async (e, i) => {
                    const hName = config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] : await translate(e.teams.home.name, {to: 'ru'});
                    const aName = config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] : await translate(e.teams.away.name, {to: 'ru'});
                    const round = await translate(e.league.round, {to: 'ru'});
                    const date = new Date(e.fixture.timestamp * 1000);

                    return (
                        <React.Fragment key={'result' + i}>
                            <div className="col">
                                <div className="round">
                                    <span>{round}</span>
                                </div>
                                <div className="center">
                                    <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{hName}</span>
                                    <LazyLoad offset={800}>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={hName}>
                                        <img style={{maxWidth: '20px', maxHeight: '20px', width: 'auto', height: 'auto'}} loading="lazy" src={e.teams.home.logo} alt={hName} />
                                    </Tippy>
                                    </LazyLoad>
                                    <span className="hScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>
                                    {e.goals.home ? e.goals.home : '0'}
                                    </span>
                                    <span className="aScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>
                                    {e.goals.away ? e.goals.away : '0'}
                                    </span>
                                    <span></span>
                                    <LazyLoad offset={800}>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={aName}>
                                        <img style={{maxWidth: '20px', maxHeight: '20px', width: 'auto', height: 'auto'}} loading="lazy" src={e.teams.away.logo} alt={aName} />
                                    </Tippy>
                                    </LazyLoad>
                                    <span className="aName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{aName}</span>
                                </div>
                                <div className="dateTime">
                                    <span>{String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear()} | {String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                  }));

                  setResults(translatedFixtures);
                }
              } catch (error) {
                console.error(error);
              }
        }

        // fetchData();
    }, []);

    return (
        <div id='leagueEuQual'>
            <Helmet>
                <title>Чемпионат Франции (Лига 1) - новости, результаты, расписание матчей, турнирная таблица</title>
                <meta name="description" content="Изучайте последние новости, результаты и турнирную таблицу Лиги 1 на нашем сайте." />
                <meta name="keywords" content="лига 1, liga 1, новости чемпионата франции, результаты лиги 1, турнирная таблица чемпионата франции, лига 1 трансферы, французский футбол, чемпионат франции, псж, олимпик марсель, олимпик лион, монако, бомбардиры лиги 1, ближайшие матчи лиги 1, последние результаты лиги 1" />
            </Helmet>
            <div className="logoPageName">
                <div className="info">
                    <div className='left'>
                        <div>
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={`Лига 1 ${config['ligue-1-season']}`}><img loading="lazy" src={logo} alt={`Лига 1 ${config['ligue-1-season']}`} /></Tippy></LazyLoad>
                        </div>
                        <div>
                            <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Лига 1 {config['ligue-1-season']}</h1>
                            <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Место проведения: <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Франция</span></span>
                        </div>
                    </div>
                    <div className="right">
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Действующий победитель: <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{lastWinner}</span></span>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Наиболее титулован: <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{mostWinner}</span></span>
                    </div>
                </div>
            </div>
            <div className="standingsTopScores">
                <div className="standingsWrap">
                    <h2 className="sectionName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Турнирная таблица</h2>
                    <div className="table5xn standings">
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span>Команда</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span>О</span></Tippy>
                        </div>
                        {standings && standings.length > 0 ? standings : <div className='noData'>Данных нет</div>}
                        <Link style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} to="/league/ligue1/standings">Подробнее</Link>
                    </div>
                </div>
                <div className="newsWrap newsVr leagueNews">
                    {news}
                </div>
                <div className="topScoresWrap">
                    <h2 className="sectionName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Бомбардиры</h2>
                    <div className="table6xn topScores">
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Команда"><span>К</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Голы"><span>Г</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ассисты"><span>А</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {topScores && topScores.length > 0 ? topScores : <div className='noData'>Данных нет</div>}
                        <Link style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} to="/league/ligue1/topscores">Подробнее</Link>
                    </div>
                </div>
            </div>
            <div className="matchesResultNews">
                <div className="resultsWrap">
                    <h2 className="sectionName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Ближайшие матчи</h2>
                    <div className="wrap">
                        {liveMatches}
                        {fixtures && fixtures.length > 0 ? fixtures : <div className='noData'>Данных нет</div>}
                        <Link style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} to={'/league/ligue1/fixtures'}>Подробнее</Link>
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
                    <h2 className="sectionName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Последние результаты</h2>
                    <div className="wrap">
                        {liveMatches?.length > 0 && liveMatches}
                        {results && results.length > 0 ? results : <div className='noData'>Данных нет</div>}
                        <Link style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} to={'/league/ligue1/results'}>Подробнее</Link>
                    </div>
                </div>
            </div>
            <div className="ranksNewsTransfers">
                <div className="ranksWrap">
                <div className="ranks">
                        <h2 className="sectionName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Рейтинг в УЕФА</h2>
                        <div className="wrap">
                            <div className="logoWrap">
                                <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='UEFA'><img loading="lazy" src={uefaLogo} alt="uefaLogo" /></Tippy></LazyLoad>
                            </div>
                            <div className="flagPlace">
                                <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={uefaRankName && uefaRankName[0].name}><img loading="lazy" src={uefaRankName && 'https://terrikon.com' + uefaRankName[0].flag} alt={uefaRankName && uefaRankName[0].name} /></Tippy></LazyLoad>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Позиция'><span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>#<span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{uefaRankName && uefaRankName[0].place}</span></span></Tippy>
                            </div>
                            <div className="head">
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Сумма очков за текущий сезон"><span className='current'>{uefaCurrentSeason}</span></Tippy>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Сумма очков"><span className='total'>Сумма</span></Tippy>
                            </div>
                            <div className='currentTotal'>
                                <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{uefaRankName && uefaRankName[0].totalCurrent}</span>
                                <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{uefaRankName && uefaRankName[0].total}</span>
                            </div>
                            <Link to="/other/uefa-country-ranking" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                        </div>
                    </div>
                    <div className="ranks">
                        <h2 className="sectionName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Рейтинг в ФИФА</h2>
                        <div className="wrap">
                            <div className="logoWrap">
                                <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='FIFA'><img loading="lazy" src={fifaLogo} alt="fifaLogo" /></Tippy></LazyLoad>
                            </div>
                            <div className="flagPlace">
                                <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={fifaRankName && fifaRankName[0].name}><img loading="lazy" src={fifaRankName && fifaRankName[0].flag} alt={fifaRankName && fifaRankName[0].name} /></Tippy></LazyLoad>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Позиция'><span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>#<span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{fifaRankName && fifaRankName[0].place}</span></span></Tippy>
                            </div>
                            <div className="head">
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Сумма очков"><span className='total'>Сумма</span></Tippy>
                            </div>
                            <div className='currentTotal'>
                                <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{fifaRankName && fifaRankName[0].points}</span>
                            </div>
                            <Link to="/other/fifa-ranking" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                        </div>
                    </div>
                </div>
                <div className="newsWrap newsVr leagueNews">
                    {news4}
                </div>
                <div id='transferList'>
                    <h2 className="sectionName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Список популярных трансферов</h2>
                    <div className="listWrap">
                        {transferList && transferList.length > 0 ? transferList : <div className='noData'>Данных нет</div>}
                    </div>
                    <Link style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} to="/transfers/list">Подробнее</Link>
                </div>
            </div>
            <div id="videoBlogs">
                <VideoNews />
                <Blogs />
            </div>
        </div>
    );
};

export default Ligue1;