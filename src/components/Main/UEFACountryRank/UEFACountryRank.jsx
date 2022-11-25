import React, { useEffect, useState } from 'react';
import './UEFACountryRank.css';
import $ from 'jquery';
import uefaLogo from '../../../assets/ico/uefaLogo.webp';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const UEFACountryRank = () => {
    const[uefaCountryRankSeason, setUefaCountryRankSeason] = useState();
    const[uefaCountryRank, setUefaCountryRank] = useState();
    const[expandToggle, setExpandToggle] = useState(6);
    const[linkToggle, setLinkToggle] = useState('#');

    useEffect(() => {
        axios.get('/uefaCountryRankSeason')
        .then(response => {
            setUefaCountryRankSeason(response.data && response.data.map((item, indx) => {
                return <div key={'uefaCountryRankSeason' + indx}>
                    <span>{item.seasonLast5}</span>
                    <span>{item.seasonLast4}</span>
                    <span>{item.seasonLast3}</span>
                    <span>{item.seasonLast2}</span>
                    <span className='current'>{item.seasonCurrent}</span>
                </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/uefaCountryRank')
        .then(response => {
            setUefaCountryRank(response.data && response.data.splice(0, expandToggle).map((item, indx) => {
                return <div className="col wrap" key={'uefaCountryRank' + indx}>
                <div>
                    <span className='place'>{item.place}<span>.</span></span>
                    <div className='flagName'><Tippy content={item.name}><img src={'https://terrikon.com' + item.flag} alt={item.name} /></Tippy><span>{item.name}</span></div>
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
    }, [expandToggle]); 

    const uefaCountryRankToggle = () => {
        setExpandToggle(11);
        $('#uefaCountryRank > section > div > div.more > a > span').text('Подробнее');
        setLinkToggle('uefa-country-rank');
    }

    return (
        <div id='uefaCountryRank'>
            <section>
                <h3 className="sectionName">Рейтинг ассоциаций УЕФА</h3>
                <div className="uefaTable">
                    <div className="logoWrap">
                        <Tippy content='UEFA'><img src={uefaLogo} alt="uefaLogo" /></Tippy>
                    </div>
                    <div className="col">
                        <div>
                            <span>#</span>
                            <span>Страна</span>
                            <span>Клубы</span>
                            <span className='total'>Сумма</span>
                        </div>
                        {uefaCountryRankSeason}
                    </div>
                    {uefaCountryRank}
                    <div className="more">
                        <Link to={linkToggle}><span onClick={uefaCountryRankToggle}>Развернуть список</span></Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UEFACountryRank;