import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import logo from '../../../../assets/ico/serieaLogo.webp';
import Helmet from 'react-helmet';

const Standings = () => {
    const[standings, setStandings] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/standings/seriea')
            .then(response => {
                response.data && response.data.map((e) => {
                    setStandings(response.data);
                });
            })
            .catch(err => {
                console.log(err);
            });
        }

        fetchData();
    }, []);

    return (
        <div className='leagueStandings'>
            <Helmet>
                <title>Серия А - Турнирная таблица - на Legendary Football</title>
                <meta name="description" content="Турнирная таблица чемпионата италии (Серии А)." />
                <meta name="keywords" content="серия а, чемпионат италии, итальянский футбол, футбол, ювентус, наполи, рома, интер, таблица серии а, турнирная таблица серии а" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy content='Серия А'><img src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 className="pageName">Турнирная таблица - Серия А</h1>
            </div>
            {standings && standings.length > 0 ? <div className="wrap">
                <div className='col'>
                    <Tippy content="Позиция"><span className="head">#</span></Tippy>
                    {standings && standings.map((e, i) => {
                        return <Tippy key={'place' + i} content={e.description}><span className={`place ${e.descrLat}`}>{e.place}</span></Tippy>
                    })}
                </div>
                <div className='col'>
                    <Tippy content="Название"><span className="head">Команда</span></Tippy>
                    {standings && standings.map((e, i) => {
                        return <div key={'logoName' + i} className='logoName'>
                                    <LazyLoad><Tippy content={e.name}><img src={e.logo} alt={e.name} /></Tippy></LazyLoad>
                                    <span>{e.name}</span>
                                </div>
                    })}
                </div>
                <div className="scroll">
                    <div className='col'>
                        <Tippy content="Очки"><span className="head">О</span></Tippy>
                        {standings && standings.map((e, i) => {
                            return <span className='points' key={'points' + i}>{e.points}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy content="Количество игр"><span className="head">И</span></Tippy>
                        {standings && standings.map((e, i) => {
                            return <span key={'games' + i}>{e.games}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy content="Забитые голы"><span className="head">ЗГ</span></Tippy>
                        {standings && standings.map((e, i) => {
                            return <span key={'for' + i}>{e.goalsFor}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy content="Пропущенные голы"><span className="head">ПГ</span></Tippy>
                        {standings && standings.map((e, i) => {
                            return <span key={'against' + i}>{e.goalsAgainst}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy content="Выигрыши"><span className="head">В</span></Tippy>
                        {standings && standings.map((e, i) => {
                            return <span key={'win' + i}>{e.win}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy content="Ничьи"><span className="head">Н</span></Tippy>
                        {standings && standings.map((e, i) => {
                            return <span key={'draw' + i}>{e.draw}</span>
                        })}
                    </div>
                    <div className='col'>
                        <Tippy content="Проигрыши"><span className="head">П</span></Tippy>
                        {standings && standings.map((e, i) => {
                            return <span key={'lose' + i}>{e.lose}</span>
                        })}
                    </div>
                </div>
            </div> : <div className='noData'>Данных нет</div>}
        </div>
    );
};

export default Standings;