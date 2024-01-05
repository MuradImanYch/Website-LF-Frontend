import React, { useEffect, useState } from 'react';
import './UEFACountryRank.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';

import uefaLogo from '../../../assets/ico/uefaLogo.webp';

const UEFACountryRank = () => {
    const[uefaCountryRankSeason, setUefaCountryRankSeason] = useState();
    const[uefaCountryRank, setUefaCountryRank] = useState();
    const[expandToggle, setExpandToggle] = useState(6);
    const[linkToggle, setLinkToggle] = useState('#');

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/standings/uefacountryrankseason')
            .then(response => {
                setUefaCountryRankSeason(response.data && response.data.map((item, indx) => {
                    return <div key={'uefaCountryRankSeason' + indx}>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={'Сумма очков за сезон 20' + item.seasonLast5.split('/')[0] + '/20' + item.seasonLast5.split('/')[1]}><span>{item.seasonLast5}</span></Tippy>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={'Сумма очков за сезон 20' + item.seasonLast4.split('/')[0] + '/20' + item.seasonLast4.split('/')[1]}><span>{item.seasonLast4}</span></Tippy>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={'Сумма очков за сезон 20' + item.seasonLast3.split('/')[0] + '/20' + item.seasonLast3.split('/')[1]}><span>{item.seasonLast3}</span></Tippy>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={'Сумма очков за сезон 20' + item.seasonLast2.split('/')[0] + '/20' + item.seasonLast2.split('/')[1]}><span>{item.seasonLast2}</span></Tippy>
                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={'Сумма очков за текущий сезон'}><span className='current'>{item.seasonCurrent}</span></Tippy>
                    </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/standings/uefacountryrank')
            .then(response => {
                setUefaCountryRank(response.data && response.data.splice(0, expandToggle).map((item, indx) => {
                    return <div className="col wrap" key={'uefaCountryRank' + indx} style={localStorage.getItem('darkTheme') === 'true' ? {backgroundColor: 'transparent'} : null}>
                    <div>
                        <span className='place' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.place}<span>.</span></span>
                        <div className='flagName'><LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={item.name}><img loading="lazy" src={'https://terrikon.com' + item.flag} alt={item.name} /></Tippy></LazyLoad><span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.name}</span></div>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.quantity}</span>
                        <span className='total' style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.total}</span>
                    </div>
                    <div>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.totalLast5}</span>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.totalLast4}</span>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.totalLast3}</span>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{item.totalLast2}</span>
                        <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className='current'>{item.totalCurrent}</span>
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

    const uefaCountryRankToggle = () => {
        setExpandToggle(11);
        $('#uefaCountryRank > section > div > div.more > a > span').text('Подробнее');
        setLinkToggle('/other/uefa-country-ranking');
    }

    return (
        <div id='uefaCountryRank'>
            <section id='uefaCountryRankQckNav'>
                <h2 className="sectionName">Рейтинг ассоциаций УЕФА</h2>
                <div className="uefaTable">
                    <div className="logoWrap">
                        <LazyLoad offset={800}>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='UEFA'><img loading="lazy" src={uefaLogo} alt="uefaLogo" /></Tippy>
                        </LazyLoad>
                    </div>
                    <div className="col">
                        <div>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Позиция"><span>#</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Страна"><span>Страна</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Количество клубов"><span>Клубы</span></Tippy>
                            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Сумма очков"><span className='total'>Сумма</span></Tippy>
                        </div>
                        {uefaCountryRankSeason}
                    </div>
                    {uefaCountryRank && uefaCountryRank.length > 0 ? uefaCountryRank : <div className='noData'>Данных нет</div>}
                    <div className="more">
                        <Link to={linkToggle}><span onClick={uefaCountryRankToggle} style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Развернуть список</span></Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UEFACountryRank;