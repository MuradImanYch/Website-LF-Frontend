import React, { useEffect, useState }  from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import LazyLoad from 'react-lazy-load';
import Helmet from 'react-helmet';

import logo from '../../../assets/ico/uelLogo.webp';
import person from '../../../assets/ico/person.webp';

import VideoNews from '../../Main/VideoNews/VideoNews';
import Blogs from '../../Main/Blogs/Blogs';

const Uel = () => {
    const[season, setSeason] = useState();
    const[lastWinner, setLastWinner] = useState();
    const[mostWinner, setmostWinner] = useState();
    const[standings, setStandings] = useState();
    const[topScrores, settopScrores] = useState();
    const[news, setNews] = useState();
    const[results, setresults] = useState();
    const[news2, setNews2] = useState();
    const[news3, setNews3] = useState();
    const[fixtures, setfixtures] = useState();
    const[news4, setNews4] = useState();
    const[transferList, setTransferList] = useState();
    const[group, setGroup] = useState();

    const[uefaRank, setUefaRank] = useState();
    const[fifaRank, setFifaRank] = useState();

    let endpoints = ['/standings/uela', '/standings/uelb', '/standings/uelc', '/standings/ueld', '/standings/uele', '/standings/uelf', '/standings/uelg', '/standings/uelh'];
    let selected = endpoints[Math.floor(Math.random() * endpoints.length)];

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/standings/uefacountryrank')
            .then(response => {
                setUefaRank(response.data && response.data.splice(1, 5).map(e => {
                    return <div className='inner'>
                                <div className='place'>
                                    <span>{e.place}</span>
                                </div>
                                <div className='countries'>
                                    <span><LazyLoad offset={800}><Tippy content={e.name}><img src={'https://terrikon.com' + e.flag} alt={e.name} /></Tippy></LazyLoad></span><span className='name'>{e.name.slice(0, 3)}...</span>
                                </div>
                                <div className='points'>
                                    <span className='points'>{e.total}</span>
                                </div>
                    </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/fifaranking')
            .then(response => {
                setFifaRank(response.data && response.data.splice(1, 5).map(e => {
                    return <div className='inner'>
                                <div className='place'>
                                    <span>{e.place}</span>
                                </div>
                                <div className='countries'>
                                    <span><LazyLoad offset={800}><Tippy content={e.name}><img src={e.flag} alt={e.name} /></Tippy></LazyLoad></span><span className='name'>{e.name.slice(0, 3)}...</span>
                                </div>
                                <div className='points'>
                                    <span className='points'>{e.points}</span>
                                </div>
                    </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/leagueinfo/uel')
            .then(response => {
                setSeason(response.data[0].seasonInfo);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/leagueinfo/uel')
            .then(response => {
                setLastWinner(response.data[0].lastWinner);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/leagueinfo/uel')
            .then(response => {
                setmostWinner(response.data[0].mostWinner.split('(')[0]);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get(selected)
            .then(response => {
                setGroup(response.data[0].standingsGroup);
                setStandings(response.data && response.data?.splice(1).map((e, i) => {
                    return <div key={'standings' + i}>
                        <div className="col">
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
                    </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/uelTS')
            .then(response => {
                settopScrores(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'topScrores' + i} className="col">
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
    
            await axios.get('/news/uelNews')
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img"><LazyLoad offset={800}><img alt={e.title} src={e.img} /></LazyLoad></div>
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
    
            await axios.get('/results/uel')
            .then(response => {
                let filtered = response.data.splice(0, 8).filter(e => {
                    return e.round === response.data[0].round;
                });
                setresults(filtered && filtered.map((e, i) => {
                    return <div className="col" key={'uel' + i}>
                                <div className="round" style={e.dateTime.includes('Завершен') ? null : {background: '#f02d54'} && e.dateTime.includes(',') ? null : {background: '#f02d54'}}><span style={e.dateTime.includes('Завершен') ? null : {color: '#fff'} && e.dateTime.includes(',') ? null : {color: '#fff'}}>{e.round}</span></div>
                                <div className="center">
                                    <span className='hName'>{e.hName}</span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.hName}>
                                            <img src={e.hLogo} alt={e.hName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='hScore' style={e.dateTime.includes('Завершен') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'} && e.dateTime.includes(',') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}}>{e.hScore}</span>
                                    -
                                    <span className='aScore' style={e.dateTime.includes('Завершен') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'} && e.dateTime.includes(',') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}}>{e.aScore}</span>
                                    <span></span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.aName}>
                                            <img src={e.aLogo} alt={e.aName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='aName'>{e.aName}</span>
                                </div>
                                <div style={e.dateTime.includes('Завершен') ? null : {background: '#f02d54'} && e.dateTime.includes(',') ? null : {background: '#f02d54'}} className="dateTime"><span style={e.dateTime.includes('Завершен') ? null : {color: '#fff'} && e.dateTime.includes(',') ? {color: '#000'} : {color: '#fff'}}>{e.dateTime.includes(':') ? e.dateTime.includes(',') ? e.dateTime : 'Сегодня, ' + e.dateTime : e.dateTime}</span></div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/news/uelNews')
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img"><LazyLoad offset={800}><img alt={e.title} src={e.img} /></LazyLoad></div>
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
    
            await axios.get('/news/uelNews')
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img"><LazyLoad offset={800}><img alt={e.title} src={e.img} /></LazyLoad></div>
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
    
            await axios.get('/fixtures/uel')
            .then(response => {
                let filtered = response.data.splice(0, 8).filter(e => {
                    return e.round === response.data[0].round;
                });
                setfixtures(filtered && filtered.map((e, i) => {
                    return <div className="col" key={'uel' + i}>
                                <div style={e.dateTime.includes(':') ? null : {background: '#f02d54'}} className="round"><span style={e.dateTime.includes(':') ? null : {color: '#fff'}}>{e.round}</span></div>
                                <div className="center">
                                    <span className='hName'>{e.hName}</span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.hName}>
                                            <img src={e.hLogo} alt={e.hName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='hScore' style={e.dateTime.includes(':') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}}>{e.hScore}</span>
                                    -
                                    <span className='aScore' style={e.dateTime.includes(':') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}}>{e.aScore}</span>
                                    <span></span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.aName}>
                                            <img src={e.aLogo} alt={e.aName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='aName'>{e.aName}</span>
                                </div>
                                <div style={e.dateTime.includes(':') ? null : {background: '#f02d54'}} className="dateTime"><span style={e.dateTime.includes(':') ? null : {color: '#fff'}}>{e.dateTime.includes(':') ? e.dateTime.includes(',') ? e.dateTime : 'Сегодня, ' + e.dateTime : e.dateTime}</span></div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/news/uelNews')
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="img"><LazyLoad offset={800}><img alt={e.title} src={e.img} /></LazyLoad></div>
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
    
            await axios.get('/transfers/all')
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
        <div id='leagueUel'>
            <Helmet>
                <title>Лига Европы (ЛЕ) - новости, результаты, расписание матчей, турнирная таблица и много чего - на Legendary Football</title>
                <meta name="description" content="Изучайте последние новости, результаты и турнирную таблицу ЛЕ на нашем сайте. У нас вы найдете все необходимые материалы о лиги европы." />
                <meta name="keywords" content="ле, новости, результаты, турнирная таблица, футбол, европейский футбол, лига европы, севилья, вильяреал, ливерпуль, айнтрахт франкфурт, список бомбардиров" />
            </Helmet>
            <div className="logoPageName">
                <div className="info">
                    <div className='left'>
                        <div>
                            <LazyLoad offset={800}><Tippy content='ЛЕ'><img src={logo} alt="logo" /></Tippy></LazyLoad>
                        </div>
                        <div>
                            <h1 className="pageName">Лига Европы <span>Сезон: {season}</span></h1>
                            <span>Место проведения: <span>Европа</span></span>
                        </div>
                    </div>
                    <div className="right">
                        <span>Действующий победитель: <span>{lastWinner}</span></span>
                        <span>Наиболее титулован: <span>{mostWinner}</span></span>
                    </div>
                </div>
            </div>
            <div className="standingsTopScores">
                <div className="standingsWrap">
                    <h2 className="sectionName">Турнирная таблица</h2>
                    <div className="table5xn standings">
                        <div className='standGroup'>{group && group}</div>
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Название"><span>Команда</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                            <Tippy content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                            <Tippy content="Очки"><span>О</span></Tippy>
                        </div>
                        {standings && standings.length > 0 ? standings : <div className='noData'>Данных нет</div>}
                        <Link to="/league/uel/standings">Подробнее</Link>
                    </div>
                </div>
                <div className="newsWrap newsVr leagueNews">
                    {news}
                </div>
                <div className="topScoresWrap">
                    <h2 className="sectionName">Бомбардиры</h2>
                    <div className="table6xn topScores">
                        <div className="head">
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Игрок"><span>Игрок</span></Tippy>
                            <Tippy content="Команда"><span>К</span></Tippy>
                            <Tippy content="Голы"><span>Г</span></Tippy>
                            <Tippy content="Ассисты"><span>А</span></Tippy>
                            <Tippy content="Количество игр"><span>И</span></Tippy>
                        </div>
                        {topScrores && topScrores.length > 0 ? topScrores : <div className='noData'>Данных нет</div>}
                        <Link to="/league/uel/topscores">Подробнее</Link>
                    </div>
                </div>
            </div>
            <div className="matchesResultNews">
                <div className="resultsWrap">
                    <h2 className="sectionName">Ближайшие матчи</h2>
                    <div className="wrap">
                        {fixtures && fixtures.length > 0 ? fixtures : <div className='noData'>Данных нет</div>}
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
                    <h2 className="sectionName">Последние результаты</h2>
                    <div className="wrap">
                        {results && results.length > 0 ? results : <div className='noData'>Данных нет</div>}
                    </div>
                </div>
            </div>
            <div className="ranksNewsTransfers">
                <div className="ranksWrap">
                    <div className="ranks">
                        <h2 className="sectionName">Рейтинг ассоциаций УЕФА</h2>
                        <div className="wrap">
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Страна"><span>Страна</span></Tippy>
                                <Tippy content="Сумма очков"><span className='summ'>Сумма</span></Tippy>
                            </div>
                            {uefaRank && uefaRank.length > 0 ? uefaRank : <div className='noData'>Данных нет</div>}
                            <Link to="/other/uefa-country-ranking">Подробнее</Link>
                        </div>
                    </div>
                    <div className="ranks">
                        <h2 className="sectionName">Рейтинг ассоциаций ФИФА</h2>
                        <div className="wrap">
                            <div className="head">
                                <Tippy content="Позиция"><span>#</span></Tippy>
                                <Tippy content="Страна"><span>Страна</span></Tippy>
                                <Tippy content="Сумма очков"><span className='summ'>Очки</span></Tippy>
                            </div>
                            {fifaRank && fifaRank.length > 0 ? fifaRank : <div className='noData'>Данных нет</div>}
                            <Link to="/other/fifa-ranking">Подробнее</Link>
                        </div>
                    </div>
                </div>
                <div className="newsWrap newsVr leagueNews">
                    {news4}
                </div>
                <div id='transferList'>
                    <h2 className="sectionName">Список популярных трансферов</h2>
                    <div className="listWrap">
                        {transferList && transferList.length > 0 ? transferList : <div className='noData'>Данных нет</div>}
                    </div>
                    <Link to="/transfers/list">Подробнее</Link>
                </div>
            </div>
            <div id="videoBlogs">
                <VideoNews />
                <Blogs />
            </div> 
        </div>
    );
};

export default Uel;