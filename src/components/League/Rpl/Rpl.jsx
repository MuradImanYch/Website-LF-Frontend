import React, { useEffect, useState }  from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './Rpl.css';
import axios from 'axios';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import LazyLoad from 'react-lazy-load';
import Helmet from 'react-helmet';

import logo from '../../../assets/ico/rplLogo.webp';
import uefaLogo from '../../../assets/ico/uefaLogo.webp';
import fifaLogo from '../../../assets/ico/fifaLogo.webp';

import VideoNews from '../../Main/VideoNews/VideoNews';
import Blogs from '../../Main/Blogs/Blogs';

const Rpl = () => {
    const[season, setSeason] = useState();
    const[lastWinner, setLastWinner] = useState();
    const[mostWinner, setMostWinner] = useState();
    const[standings, setStandings] = useState();
    const[topScores, setTopScores] = useState();
    const[news, setNews] = useState();
    const[results, setResults] = useState();
    const[news2, setNews2] = useState();
    const[news3, setNews3] = useState();
    const[fixtures, setFixtures] = useState();
    const[uefaCurrentSeason, setUefaCurrentSeason] = useState();
    const[uefaRankName, setUefaRankName] = useState();
    const[fifaRankName, setFifaRankName] = useState();
    const[news4, setNews4] = useState();
    const[transferList, setTransferList] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        function convertGermanToclientTime(germanTime) {
            // Разбиваем строку времени на часы и минуты
            const [hours, minutes] = germanTime.split(':').map(Number);
          
            // Создаем объект Date с текущей датой и временем в немецкой временной зоне
            const germanDate = new Date();
            germanDate.setHours(hours);
            germanDate.setMinutes(minutes);

            const clientUTCOffset = new Date();
          
            // Добавляем разницу между немецким и иранским временем (2.5 часа)
            const clientDate = new Date(germanDate.getTime() + ((-clientUTCOffset.getTimezoneOffset() / 60) - 2) * 60 * 60 * 1000);
          
            // Получаем иранское время в формате "чч:мм"
            const clientTime = `${clientDate.getHours()}:${clientDate.getMinutes().toString().padStart(2, '0')}`;
          
            return clientTime;
          }
          
        const fetchData = async () => {
            await axios.get('/leagueinfo/rpl')
            .then(response => {
                setSeason(response.data[0].seasonInfo);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/leagueinfo/rpl')
            .then(response => {
                setLastWinner(response.data[0].lastWinner);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/leagueinfo/rpl')
            .then(response => {
                setMostWinner(response.data[0].mostWinner.split('(')[0]);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/rpl')
            .then(response => {
                setStandings(response.data && response.data.splice(0, 8).map((e, i) => {
                    return <div key={'standings' + i} className="col">
                                <div className="left">
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.description && e.description.includes('Лиги') ? e.description + ' (?)*' : e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat && e.descrLat.includes('Ligi') ? null : e.descrLat}`}>{e.place}</span></Tippy>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                                <div className="nums">
                                    <span className="games" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                    <div className="forAgainst">
                                        <span className='for' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goalsFor}</span>
                                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>:</span>
                                        <span className='against' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goalsAgainst}</span>
                                    </div>
                                    <div className="points" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.points}</div>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/rplTS')
            .then(response => {
                setTopScores(response.data && response.data.splice(1, 8).map((e, i) => {
                    return <div key={'topScores' + i} className="col">
                                <div className="left">
                                    <span className="place" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.place}</span>
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.player}><img loading="lazy" src={e.img} alt={e.player}/></Tippy></LazyLoad>
                                    <span className='name' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.player}</span>
                                </div>
                                <div className="tLogoName">
                                    <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.tName}><img loading="lazy" src={e.tLogo} alt={e.tName} /></Tippy></LazyLoad>
                                </div>
                                <div className="nums">
                                    <span className="goals" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.goals ? e.goals : '0'}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.pen === '(undefined' ? '(0)' : e.pen}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.games}</span>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/news/rplNews')
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
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
    
            await axios.get('/results/rpl')
            .then(response => {
                let filtered = response.data.filter(e => {
                    return e.round === response.data[0].round;
                });
                setResults(filtered && filtered.map((e, i) => {
                    return <div className="col" key={'rpl' + i}>
                                <div className="round" style={e.dateTime.includes('Завершен') ? null : {background: '#f02d54'} && e.dateTime.includes(',') ? null : {background: '#f02d54'}}><span style={e.dateTime.includes('Завершен') ? null : {color: '#fff'} && e.dateTime.includes(',') ? null : {color: '#fff'}}>{e.round}</span></div>
                                <div className="center">
                                    <span className='hName' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.hName}</span>
                                    <LazyLoad offset={800}>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}>
                                            <img loading="lazy" src={e.hLogo} alt={e.hName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='hScore' style={{...(e.dateTime.includes('Завершен') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'} && e.dateTime.includes(',') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}), ...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null)}}>{e.hScore}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>-</span>
                                    <span className='aScore' style={{...(e.dateTime.includes('Завершен') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'} && e.dateTime.includes(',') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}), ...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null)}}>{e.aScore}</span>
                                    <span></span>
                                    <LazyLoad offset={800}>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}>
                                            <img loading="lazy" src={e.aLogo} alt={e.aName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='aName' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.aName}</span>
                                </div>
                                <div style={e.dateTime.includes(':') ? null : {background: '#f02d54'}} className="dateTime"><span style={e.dateTime.includes(':') ? null : {color: '#fff'}}>{e.dateTime.includes(':') ? e.dateTime.includes(',') ? e.dateTime.split(',')[0] + ', ' + convertGermanToclientTime(e.dateTime.split(',')[1]) : 'Сегодня, ' + convertGermanToclientTime(e.dateTime.split(',')[1]) : e.dateTime}</span></div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/news/rplNews')
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
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
    
            await axios.get('/news/rplNews')
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
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
    
            await axios.get('/fixtures/rpl')
            .then(response => {
                let filtered = response.data.filter(e => {
                    return e.round === response.data[0].round;
                });
                setFixtures(filtered && filtered.map((e, i) => {
                    return <div className="col" key={'rpl' + i}>
                                <div style={e.dateTime.includes(':') ? null : {background: '#f02d54'}} className="round"><span style={e.dateTime.includes(':') ? null : {color: '#fff'}}>{e.round}</span></div>
                                <div className="center">
                                    <span className='hName' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.hName}</span>
                                    <LazyLoad offset={800}>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}>
                                            <img loading="lazy" src={e.hLogo} alt={e.hName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='hScore' style={{...(e.dateTime.includes(':') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}), ...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null)}}>{e.hScore}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>-</span>
                                    <span className='aScore' style={{...(e.dateTime.includes(':') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}), ...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null)}}>{e.aScore}</span>
                                    <span></span>
                                    <LazyLoad offset={800}>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}>
                                            <img loading="lazy" src={e.aLogo} alt={e.aName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='aName' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.aName}</span>
                                </div>
                                <div style={e.dateTime.includes(':') ? null : {background: '#f02d54'}} className="dateTime"><span style={e.dateTime.includes(':') ? null : {color: '#fff'}}>{e.dateTime.includes('.') ? e.dateTime.split(',')[0] + ', ' + convertGermanToclientTime(e.dateTime.split(',')[1]) : 'Сегодня, ' + convertGermanToclientTime(e.dateTime) && e.dateTime.includes('\'') && e.dateTime}</span></div>
                            </div>
                }));
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
                    return e.name === 'Россия';
                }));
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/fifaranking')
            .then(response => {
                setFifaRankName(response.data && response.data.filter(e => {
                    return e.name === 'Россия';
                }));  
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/news/rplNews')
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
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
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
    
            await axios.get('/transfers/rpl')
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
        }

        fetchData();
    }, []);

    return (
        <div id='leagueRpl'>
            <Helmet>
                <title>Российская Премьер Лига (РПЛ) - новости, результаты, расписание матчей, турнирная таблица и много чего - на Legendary Football</title>
                <meta name="description" content="Изучайте последние новости, результаты и турнирную таблицу РПЛ на нашем сайте. У нас вы найдете все необходимые материалы о главном российском футбольном чемпионате и в целом о российском футболе." />
                <meta name="keywords" content="рпл, новости, результаты, турнирная таблица, футбол, российский футбол, чемпионат россии, зенит, спартак москва, цска, краснодар, список трансферов, бомбардиры, ближайшие матчи, последние результаты, рейтинг в уефа, рейтинг в фифа, список популярных трансферов, видео, блоги" />
            </Helmet>
            <div className="logoPageName">
                <div className="info">
                    <div className='left'>
                        <div>
                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='РПЛ'><img loading="lazy" src={logo} alt="logo" /></Tippy></LazyLoad>
                        </div>
                        <div>
                            <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Российская Премьер-Лига <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Сезон: {season}</span></h1>
                            <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Место проведения: <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Россия</span></span>
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
                    <h2 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="sectionName">Турнирная таблица</h2>
                    <div className="table5xn standings">
                        <div className="head">
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span>Команда</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span>И</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы : Пропущенные голы"><span>З : П</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span>О</span></Tippy>
                        </div>
                        {standings && standings.length > 0 ? standings : <div className='noData'>Данных нет</div>}
                        <Link to="/league/rpl/standings" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </div>
                </div>
                <div className="newsWrap newsVr leagueNews">
                    {news}
                </div>
                <div className="topScoresWrap">
                    <h2 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="sectionName">Бомбардиры</h2>
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
                        <Link to="/league/rpl/topscores" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                    </div>
                </div>
            </div>
            <div className="matchesResultNews">
                <div className="resultsWrap">
                    <h2 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="sectionName">Ближайшие матчи</h2>
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
                    <h2 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="sectionName">Последние результаты</h2>
                    <div className="wrap">
                        {results && results.length > 0 ? results : <div className='noData'>Данных нет</div>}
                    </div>
                </div>
            </div>
            <div className="ranksNewsTransfers">
                <div className="ranksWrap">
                    <div className="ranks">
                        <h2 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="sectionName">Рейтинг в УЕФА</h2>
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
                        <h2 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="sectionName">Рейтинг в ФИФА</h2>
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
                    <h2 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="sectionName">Список популярных трансферов</h2>
                    <div className="listWrap">
                        {transferList && transferList.length > 0 ? transferList : <div className='noData'>Данных нет</div>}
                    </div>
                    <Link to="/transfers/list" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Подробнее</Link>
                </div>
            </div>
            <div id="videoBlogs">
                <VideoNews />
                <Blogs />
            </div>
        </div>
    );
};

export default Rpl;