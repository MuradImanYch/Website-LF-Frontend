import React from 'react';
import './TransferList.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import LazyLoad from 'react-lazy-load';
import Helmet from 'react-helmet';

const TransferList = () => {
    const[transferList, setTransferList] = useState();
    const[expandToggle, setExpandToggle] = useState(20);
    const[expandToggleLeagues, setExpandToggleLeagues] = useState(20);
    const[transferListLeagues, setTransferListLeagues] = useState();
    const[endpoint, setEndpoint] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            $('#transferListPage .other').hide();

            await axios.get('/transfers/all')
            .then(response => {
                setTransferList(response.data && response.data.splice(0, expandToggle).map((e, i) => {
    
                    return <div className="col" key={`transferListOther` + i}>
                                <div>
                                    <div className='player'>
                                        <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.img} alt="playerImg" /></Tippy></LazyLoad>
                                        <img loading="lazy" src={e.flag} alt="flag" />
                                        <span>{e.position}</span>
                                    </div>
                                    <div className='fromTo'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.clubOutName}><img loading="lazy" src={e.clubOut} alt={e.clubOutName} /></Tippy>
                                        <span>→</span>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.clubInName}><img loading="lazy" src={e.clubIn} alt={e.clubInName} /></Tippy>
                                    </div>
                                </div>
                                <div>
                                    <div className='date'>
                                        <span>{e.date}</span>
                                    </div>
                                    <div className='price'>
                                        <span>{e.price}</span>
                                    </div>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }

        fetchData();
    }, [expandToggle]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(endpoint)
            .then(response => {
                setTransferListLeagues(response.data && response.data.splice(0, expandToggleLeagues).map((e, i) => {
                    return <div className="col" key={`transferListOther` + i}>
                                <div>
                                    <div className='player'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.img} alt="playerImg" /></Tippy>
                                        <img loading="lazy" src={e.flag} alt="flag" />
                                        <span>{e.position}</span>
                                    </div>
                                    <div className='fromTo'>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.clubOutName}><img loading="lazy" src={e.clubOut} alt={e.clubOutName} /></Tippy>
                                        <span>→</span>
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.clubInName}><img loading="lazy" src={e.clubIn} alt={e.clubInName} /></Tippy>
                                    </div>
                                </div>
                                <div>
                                    <div className='date'>
                                        <span>{e.date}</span>
                                    </div>
                                    <div className='price'>
                                        <span>{e.price}</span>
                                    </div>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }

        fetchData();
    }, [expandToggleLeagues, endpoint]);

    const transferToggle = () => {
        setExpandToggle(expandToggle + 20);
    }
    const transferToggleLeagues = () => {
        setExpandToggleLeagues(expandToggleLeagues + 20);
    }

    const selectleague = async (e) => {
        $('#transferListPage .other').show();
        $('#transferListPage .default').hide();
        setEndpoint(e.target.value);
        setExpandToggleLeagues(20);

        await axios.get(e.target.value)
        .then(response => {
            setTransferListLeagues(response.data && response.data.splice(0, expandToggleLeagues).map((e, i) => {
                return <div className="col" key={`transferListOther` + i}>
                            <div>
                                <div className='player'>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.name}><img loading="lazy" src={e.img} alt="playerImg" /></Tippy>
                                    <img loading="lazy" src={e.flag} alt="flag" />
                                    <span>{e.position}</span>
                                </div>
                                <div className='fromTo'>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.clubOutName}><img loading="lazy" src={e.clubOut} alt={e.clubOutName} /></Tippy>
                                    <span>→</span>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.clubInName}><img loading="lazy" src={e.clubIn} alt={e.clubInName} /></Tippy>
                                </div>
                            </div>
                            <div>
                                <div className='date'>
                                    <span>{e.date}</span>
                                </div>
                                <div className='price'>
                                    <span>{e.price}</span>
                                </div>
                            </div>
                        </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div id="transferListPage">
            <Helmet>
                <title>Список всех трансферов - на Legendary Football</title>
                <meta name="description" content="Список всех прошедших футбольных трансферах в одном месте! Будьте в курсе последних переходов звезд мирового футбола с нашим полным списком трансферных событий. Летние и зимние переходы - всё здесь." />
                <meta name="keywords" content="список всех трансферов, футбольные трансферы, переходы футболистов, трансферное окно, летние трансферы, зимние трансферы, актуальные трансферы, трансферное окно в европе, трансферы рпл, трансферы апл, трансферы серии а, трансферы бундеслиги, трансферы лиги 1" />
            </Helmet>
            <h1 className="pageName">Список трансферов 
            <select onChange={selectleague} name="leagueSelection">
                <option value="/transfers/all">Все лиги</option>
                <option value="/transfers/rpl">РПЛ</option>
                <option value="/transfers/epl">АПЛ</option>
                <option value="/transfers/laliga">Ла Лига</option>
                <option value="/transfers/seriea">Серия А</option>
                <option value="/transfers/bundesliga">Бундеслига</option>
                <option value="/transfers/ligue1">Лига 1</option>
            </select></h1>
            <div className="listWrap">
                <div className="head">
                    <div>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Игрок"><span>Игрок</span></Tippy>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Переходы"><span>Откуда → Куда</span></Tippy>
                    </div>
                    <div>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Дата"><span>Дата</span></Tippy>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Цена"><span>Цена</span></Tippy>
                    </div>
                </div>
                <div className="default">
                    {transferList}
                    <span onClick={transferToggle}>Развернуть ещё</span>
                </div>
                <div className="other">
                    {transferListLeagues}
                    <span onClick={transferToggleLeagues}>Развернуть ещё</span>
                </div>
            </div>
        </div>
    );
};

export default TransferList;