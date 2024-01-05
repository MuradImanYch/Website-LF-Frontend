import React, {useState, useEffect} from 'react';
import './UEFACountryRank.css';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import Helmet from 'react-helmet';
import $ from 'jquery';

import uefaLogo from '../../../assets/ico/uefaLogo.webp';

const UEFACountryRank = () => {
    const[uefaCountryRankSeason, setUefaCountryRankSeason] = useState();
    const[uefaCountryRank, setUefaCountryRank] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

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

            axios.get('/standings/uefacountryrank')
            .then(response => {
                setUefaCountryRank(response.data && response.data.map((item, indx) => {
                    return <div className="col wrap" key={'uefaCountryRank' + indx}>
                    <div>
                        <span className='place'>{item.place}<span>.</span></span>
                        <div className='flagName'><LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={item.name}><img loading="lazy" src={'https://terrikon.com' + item.flag} alt={item.name} /></Tippy></LazyLoad><span>{item.name}</span></div>
                        <span>{item.quantity}</span>
                        <span className='total'>{item.total}</span>
                    </div>
                    <div>
                        <span>{item.totalLast5}</span>
                        <span>{item.totalLast4}</span>
                        <span>{item.totalLast3}</span>
                        <span>{item.totalLast2}</span>
                        <span className='current'>{item.totalCurrent}</span>
                    </div>
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
        <div id='uefaCountryRankOther'>
            <Helmet>
                <title>Таблица коэффициентов УЕФА (UEFA) - на Legendary Football</title>
                <meta name="description" content="Изучите таблицу коэффициентов УЕФА (UEFA) в онлайн режиме - рейтинг команд и ассоциаций на европейской футбольной арене. Узнайте о рейтинговых позициях, статистике и значимости клубов и стран в еврокубках." />
                <meta name="keywords" content="таблица коэффициентов уефа, рейтинг команд уефа, рейтинг ассоциаций уефа, европейская футбольная арена, рейтинговые позиции клубов и стран, еврокубки уефа, обновленные данные, uefa коэффициент, европейский футбол, футбольные клубы и ассоциации, онлайн" />
            </Helmet>
            <h1 className="pageName">Рейтинг ассоциаций УЕФА</h1>
            <section>
                <div className="uefaTable">
                    <div className="logoWrap">
                        <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='UEFA'><img loading="lazy" src={uefaLogo} alt="uefaLogo" /></Tippy></LazyLoad>
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
                    {uefaCountryRank}
                </div>
            </section>
        </div>
    );
};

export default UEFACountryRank;