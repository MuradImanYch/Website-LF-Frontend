import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import logo from '../../../../assets/ico/ueclLogo.webp';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';

const Standings = () => {
    const[standingsA, setStandingsA] = useState();
    const[standingsB, setStandingsB] = useState();
    const[standingsC, setStandingsC] = useState();
    const[standingsD, setStandingsD] = useState();
    const[standingsE, setStandingsE] = useState();
    const[standingsF, setStandingsF] = useState();
    const[standingsG, setStandingsG] = useState();
    const[standingsH, setStandingsH] = useState();
    
    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/standings/uecla')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsA(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/ueclb')
            .then(response => {
                response.data && response.data.splice(0, 1).map((e) => {
                    setStandingsB(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });
            
            await axios.get('/standings/ueclc')
            .then(response => {
                response.data && response.data.splice(0, 1).map((e) => {
                    setStandingsC(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/uecld')
            .then(response => {
                response.data && response.data.splice(0, 1).map((e) => {
                    setStandingsD(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/uecle')
            .then(response => {
                response.data && response.data.splice(0, 1).map((e) => {
                    setStandingsE(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/ueclf')
            .then(response => {
                response.data && response.data.splice(0, 1).map((e) => {
                    setStandingsF(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/ueclg')
            .then(response => {
                response.data && response.data.splice(0, 1).map((e) => {
                    setStandingsG(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/ueclh')
            .then(response => {
                response.data && response.data.splice(0, 1).map((e) => {
                    setStandingsH(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });
        }

        // fetchData();
    }, []);

    return (
        <div className='leagueStandings eurocups'>
            <Helmet>
                <title>Лига Конференции (ЛК) - Турнирная таблица</title>
                <meta name="description" content="Турнирная таблица Лиги Конференции (ЛК)." />
                <meta name="keywords" content="лига конференции турнирная таблица, лига конференции таблица, таблица лк, европейский футбол турнирная таблица, карабах таблица, вест хэм таблица, паок таблица, фиорентина таблица, турнирная таблица лк, таблица лиги конференции" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='ЛК'><img loading="lazy" src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 className="pageName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Турнирная таблица - Лига Конференции</h1>
            </div>
            {standingsA && standingsA.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа А</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsA && standingsA.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'place' + i} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsA && standingsA.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsA && standingsA.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsA && standingsA.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsA && standingsA.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsA && standingsA.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsA && standingsA.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsA && standingsA.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsA && standingsA.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : <div className='noData'>Данных нет</div>}
            {standingsB && standingsB.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа B</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsB && standingsB.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'place' + i} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsB && standingsB.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsB && standingsB.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsB && standingsB.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsB && standingsB.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsB && standingsB.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsB && standingsB.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsB && standingsB.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsB && standingsB.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsC && standingsC.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа C</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsC && standingsC.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'place' + i} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsC && standingsC.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsC && standingsC.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsC && standingsC.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsC && standingsC.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsC && standingsC.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsC && standingsC.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsC && standingsC.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsC && standingsC.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsD && standingsD.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа D</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsD && standingsD.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'place' + i} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsD && standingsD.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsD && standingsD.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsD && standingsD.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsD && standingsD.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsD && standingsD.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsD && standingsD.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsD && standingsD.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsD && standingsD.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsE && standingsE.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа E</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsE && standingsE.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'place' + i} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsE && standingsE.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsE && standingsE.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsE && standingsE.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsE && standingsE.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsE && standingsE.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsE && standingsE.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsE && standingsE.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsE && standingsE.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsF && standingsF.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа F</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsF && standingsF.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'place' + i} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsF && standingsF.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsF && standingsF.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsF && standingsF.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsF && standingsF.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsF && standingsF.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsF && standingsF.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsF && standingsF.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsF && standingsF.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsG && standingsG.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа G</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsG && standingsG.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'place' + i} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsG && standingsG.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsG && standingsG.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsG && standingsG.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsG && standingsG.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsG && standingsG.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsG && standingsG.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsG && standingsG.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsG && standingsG.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsH && standingsH.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа H</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsH && standingsH.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'place' + i} content={e.description}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsH && standingsH.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsH && standingsH.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsH && standingsH.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsH && standingsH.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsH && standingsH.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsH && standingsH.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsH && standingsH.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsH && standingsH.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
        </div>
    );
};

export default Standings;