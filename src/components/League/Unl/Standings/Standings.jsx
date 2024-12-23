import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import logo from '../../../../assets/ico/unlLogo.webp';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';

const Standings = () => {
    const[standingsA1, setStandingsA1] = useState();
    const[standingsA2, setStandingsA2] = useState();
    const[standingsA3, setStandingsA3] = useState();
    const[standingsD4, setStandingsD4] = useState();
    const[standingsB1, setStandingsB1] = useState();
    const[standingsB2, setStandingsB2] = useState();
    const[standingsB3, setStandingsB3] = useState();
    const[standingsB4, setStandingsB4] = useState();
    const[standingsC1, setStandingsC1] = useState();
    const[standingsC2, setStandingsC2] = useState();
    const[standingsC3, setStandingsC3] = useState();
    const[standingsC4, setStandingsC4] = useState();
    const[standingsD1, setStandingsD1] = useState();
    const[standingsD2, setStandingsD2] = useState();
    
    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/standings/unla1')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsA1(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unla2')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsA2(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });
            
            await axios.get('/standings/unla3')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsA3(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unla4')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsD4(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unlb1')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsB1(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unlb2')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsB2(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unlb3')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsB3(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unlb4')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsB4(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unlc1')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsC1(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unlc2')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsC2(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unlc3')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsC3(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unlc4')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsC4(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unld1')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsD1(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });

            await axios.get('/standings/unld2')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandingsD2(response.data);
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
                <title>Лига Наций УЕФА (ЛН) - Турнирная таблица</title>
                <meta name="description" content="Турнирная таблица Лиги Наций (ЛН)." />
                <meta name="keywords" content="лига наций таблица, таблица лиги наций, турнирная таблица лиги наций, лига наций турнирная таблица, сборная португалии турнирная таблица, сборная франции турнирная таблица, сборная испании турнирная таблица, сборная англии турнирная таблица, таблица лиги наций уефа, турнирная таблица лига наций уефа" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Лига наций'><img loading="lazy" src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Турнирная таблица - Лига наций УЕФА</h1>
            </div>
            {standingsA1 && standingsA1.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа А</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsA1 && standingsA1.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsA1 && standingsA1.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsA1 && standingsA1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsA1 && standingsA1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsA1 && standingsA1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsA1 && standingsA1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsA1 && standingsA1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsA1 && standingsA1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsA1 && standingsA1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : <div className='noData'>Данных нет</div>}
            {standingsA2 && standingsA2.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа B</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsA2 && standingsA2.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsA2 && standingsA2.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsA2 && standingsA2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsA2 && standingsA2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsA2 && standingsA2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsA2 && standingsA2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsA2 && standingsA2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsA2 && standingsA2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsA2 && standingsA2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsA3 && standingsA3.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа C</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsA3 && standingsA3.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsA3 && standingsA3.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsA3 && standingsA3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsA3 && standingsA3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsA3 && standingsA3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsA3 && standingsA3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsA3 && standingsA3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsA3 && standingsA3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsA3 && standingsA3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsD4 && standingsD4.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа D</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsD4 && standingsD4.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsD4 && standingsD4.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsD4 && standingsD4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsD4 && standingsD4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsD4 && standingsD4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsD4 && standingsD4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsD4 && standingsD4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsD4 && standingsD4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsD4 && standingsD4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsB1 && standingsB1.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа E</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsB1 && standingsB1.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsB1 && standingsB1.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsB1 && standingsB1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsB1 && standingsB1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsB1 && standingsB1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsB1 && standingsB1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsB1 && standingsB1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsB1 && standingsB1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsB1 && standingsB1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsB2 && standingsB2.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа F</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsB2 && standingsB2.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsB2 && standingsB2.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsB2 && standingsB2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsB2 && standingsB2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsB2 && standingsB2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsB2 && standingsB2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsB2 && standingsB2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsB2 && standingsB2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsB2 && standingsB2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsB3 && standingsB3.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа G</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsB3 && standingsB3.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsB3 && standingsB3.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsB3 && standingsB3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsB3 && standingsB3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsB3 && standingsB3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsB3 && standingsB3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsB3 && standingsB3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsB3 && standingsB3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsB3 && standingsB3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsB4 && standingsB4.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа H</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsB4 && standingsB4.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsB4 && standingsB4.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsB4 && standingsB4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsB4 && standingsB4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsB4 && standingsB4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsB4 && standingsB4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsB4 && standingsB4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsB4 && standingsB4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsB4 && standingsB4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsC1 && standingsC1.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа J</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsC1 && standingsC1.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsC1 && standingsC1.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsC1 && standingsC1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsC1 && standingsC1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsC1 && standingsC1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsC1 && standingsC1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsC1 && standingsC1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsC1 && standingsC1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsC1 && standingsC1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsC2 && standingsC2.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа J</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsC2 && standingsC2.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsC2 && standingsC2.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsC2 && standingsC2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsC2 && standingsC2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsC2 && standingsC2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsC2 && standingsC2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsC2 && standingsC2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsC2 && standingsC2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsC2 && standingsC2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsC3 && standingsC3.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа J</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsC3 && standingsC3.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsC3 && standingsC3.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsC3 && standingsC3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsC3 && standingsC3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsC3 && standingsC3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsC3 && standingsC3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsC3 && standingsC3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsC3 && standingsC3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsC3 && standingsC3.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsC4 && standingsC4.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа J</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsC4 && standingsC4.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsC4 && standingsC4.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsC4 && standingsC4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsC4 && standingsC4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsC4 && standingsC4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsC4 && standingsC4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsC4 && standingsC4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsC4 && standingsC4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsC4 && standingsC4.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsD1 && standingsD1.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа J</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsD1 && standingsD1.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsD1 && standingsD1.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsD1 && standingsD1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsD1 && standingsD1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsD1 && standingsD1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsD1 && standingsD1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsD1 && standingsD1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsD1 && standingsD1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsD1 && standingsD1.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
            {standingsD2 && standingsD2.length > 0 ? <div className="wrap">
                <div style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="group">Группа J</div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span className="head">#</span></Tippy>
                    {standingsD2 && standingsD2.map((e, i) => {
                        return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.descrClass && 'Выход в финальную часть турнира'}><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className={`place ${e.descrClass !== undefined ? e.descrClass : 'out'}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Название"><span className="head">Команда</span></Tippy>
                    {standingsD2 && standingsD2.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Очки"><span className="head">О</span></Tippy>
                        {standingsD2 && standingsD2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество игр"><span className="head">И</span></Tippy>
                        {standingsD2 && standingsD2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standingsD2 && standingsD2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standingsD2 && standingsD2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Выигрыши"><span className="head">В</span></Tippy>
                        {standingsD2 && standingsD2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Ничьи"><span className="head">Н</span></Tippy>
                        {standingsD2 && standingsD2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Проигрыши"><span className="head">П</span></Tippy>
                        {standingsD2 && standingsD2.map((e, i) => {
                            return <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : null}
        </div>
    );
};

export default Standings;