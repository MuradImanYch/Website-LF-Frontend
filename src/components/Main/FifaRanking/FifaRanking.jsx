import React, { useEffect, useState } from 'react';
import './FifaRanking.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import fifaLogo from '../../../assets/ico/fifaLogo.webp';

const FifaRanking = () => {
    const[fifaCountryRank, setFifaCountryRank] = useState();
    const[expandToggle, setExpandToggle] = useState(5);
    const[linkToggle, setLinkToggle] = useState('#');

    useEffect(() => {
        axios.get('/fifaRanking')
        .then(response => {
            setFifaCountryRank(response.data && response.data.splice(0, expandToggle).map((item, indx) => {
                return <div className="col wrap" key={'fifaRanking' + indx}>
                <div>
                    <span className='place'>{item.place}.<span></span></span>
                    <div className='flagName'><Tippy content={item.name}><img src={item.flag} alt={item.name} /></Tippy><span>{item.name}</span></div>
                    <span className={item.difference[0] === '=' ? 'diffEqual' : false || item.difference[0] === '↑' ? 'diffUp' : false || item.difference[0] === '↓' ? 'diffDown' : false}>{item.difference}</span>
                    <span className='total'>{item.points}</span>
                </div>
                <div>
                    <span>{item.pointsDiff}</span>
                    <span>{item.association}</span>
                </div>
            </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }, [expandToggle]); 

    const fifaCountryRankToggle = () => {
        setExpandToggle(10);
        $('#fifaRank > section > div > div.more > a > span').text('Подробнее');
        setLinkToggle('/other/fifa-ranking');
    }

    return (
        <div id='fifaRank'>
            <section>
                <h3 className="sectionName">Рейтинг ассоциаций ФИФА</h3>
                <div className="uefaTable">
                    <div className="logoWrap">
                        <Tippy content='FIFA'><img src={fifaLogo} alt="fifaLogo" /></Tippy>
                    </div>
                    <div className="col">
                        <div>
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Страна"><span>Страна</span></Tippy>
                            <Tippy content="Изменения в позиции"><span>Изменения</span></Tippy>
                            <Tippy content="Сумма очков"><span className='total'>Очки</span></Tippy>
                        </div>
                        <div>
                            <Tippy content="Разница с предыдущими очками"><span>+/-</span></Tippy>
                            <Tippy content="Ассоциация"><span>Ассоциация</span></Tippy>
                        </div>
                    </div>
                    {fifaCountryRank}
                    <div className="more">
                        <Link to={linkToggle}><span onClick={fifaCountryRankToggle}>Развернуть список</span></Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FifaRanking;