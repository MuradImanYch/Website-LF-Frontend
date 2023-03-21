import React from 'react';
import './TransferList.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import LazyLoad from 'react-lazy-load';

const TransferList = () => {
    const[transferList, setTransferList] = useState();
    const[expandToggle, setExpandToggle] = useState(20);
    const[expandToggleLeagues, setExpandToggleLeagues] = useState(20);
    const[transferListLeagues, setTransferListLeagues] = useState();
    const[endpoint, setEndpoint] = useState();

    useEffect(() => {
        const fetchData = async () => {
            $('#transferListPage .other').hide();

            await axios.get('/transfers/all')
            .then(response => {
                setTransferList(response.data && response.data.splice(0, expandToggle).map((e, i) => {
    
                    return <div className="col" key={`transferListOther` + i}>
                                <div>
                                    <div className='player'>
                                        <LazyLoad offset={800}><Tippy content={e.name}><img src={e.img} alt="playerImg" /></Tippy></LazyLoad>
                                        <img src={e.flag} alt="flag" />
                                        <span>{e.position}</span>
                                    </div>
                                    <div className='fromTo'>
                                        <Tippy content={e.clubOutName}><img src={e.clubOut} alt={e.clubOutName} /></Tippy>
                                        <span>→</span>
                                        <Tippy content={e.clubInName}><img src={e.clubIn} alt={e.clubInName} /></Tippy>
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
                                        <Tippy content={e.name}><img src={e.img} alt="playerImg" /></Tippy>
                                        <img src={e.flag} alt="flag" />
                                        <span>{e.position}</span>
                                    </div>
                                    <div className='fromTo'>
                                        <Tippy content={e.clubOutName}><img src={e.clubOut} alt={e.clubOutName} /></Tippy>
                                        <span>→</span>
                                        <Tippy content={e.clubInName}><img src={e.clubIn} alt={e.clubInName} /></Tippy>
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
                                    <Tippy content={e.name}><img src={e.img} alt="playerImg" /></Tippy>
                                    <img src={e.flag} alt="flag" />
                                    <span>{e.position}</span>
                                </div>
                                <div className='fromTo'>
                                    <Tippy content={e.clubOutName}><img src={e.clubOut} alt={e.clubOutName} /></Tippy>
                                    <span>→</span>
                                    <Tippy content={e.clubInName}><img src={e.clubIn} alt={e.clubInName} /></Tippy>
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
            <h1 className="pageName">Трансферный список 
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
                        <Tippy content="Игрок"><span>Игрок</span></Tippy>
                        <Tippy content="Переходы"><span>Откуда → Куда</span></Tippy>
                    </div>
                    <div>
                        <Tippy content="Дата"><span>Дата</span></Tippy>
                        <Tippy content="Цена"><span>Цена</span></Tippy>
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