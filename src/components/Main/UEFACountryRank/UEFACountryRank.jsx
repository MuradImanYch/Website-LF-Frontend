import React, { useEffect, useState } from 'react';
import './UEFACountryRank.css';
import $ from 'jquery';
import uefaLogo from '../../../assets/ico/uefaLogo.png';
import { Link } from 'react-router-dom';

const UEFACountryRank = () => {
    const[uefaCountryRankSeason, setUefaCountryRankSeason] = useState();
    const[uefaCountryRank, setUefaCountryRank] = useState();
    const[expandToggle, setExpandToggle] = useState(11);
    const[linkToggle, setLinkToggle] = useState('#');

    useEffect(() => {
        $.ajax({
            type: "GET",
            url: '/uefaCountryRankSeason',
        }).done((response) => {
            setUefaCountryRankSeason(response && response.map((item, indx) => {
                return <div key={indx}>
                    <span>{item.seasonLast5}</span>
                    <span>{item.seasonLast4}</span>
                    <span>{item.seasonLast3}</span>
                    <span>{item.seasonLast2}</span>
                    <span className='current'>{item.seasonCurrent}</span>
                </div>
            }));
        });

        $.ajax({
            type: "GET",
            url: '/uefaCountryRank',
        }).done((response) => {
            setUefaCountryRank(response && response.splice(0, expandToggle).map((item, indx) => {
                return <div className="col wrap" key={indx}>
                <div>
                    <span className='place'>{item.place}<span>.</span></span>
                    <div className='flagName'><img title={item.name} src={'https://terrikon.com' + item.flag} alt={item.name} /><span>{item.name}</span></div>
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
        });
    }, [expandToggle]); 

    const uefaCountryRankToggle = () => {
        setExpandToggle(31);
        $('#uefaCountryRank > div > div.more > a > span').text('Подробнее');
        setLinkToggle('uefa-country-rank');
    }

    return (
        <div id='uefaCountryRank'>
            <section>
                <h3 className="sectionName">Рейтинг ассоциаций УЕФА</h3>
                <div className="uefaTable">
                    <div className="logoWrap">
                        <img src={uefaLogo} alt="uefaLogo" title='UEFA' />
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
                        <Link to={linkToggle}><span to="" onClick={uefaCountryRankToggle}>Развернуть список</span></Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UEFACountryRank;