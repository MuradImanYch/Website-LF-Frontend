import React, {useState, useEffect} from 'react';
import './UEFACountryRank.css';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';

import uefaLogo from '../../../assets/ico/uefaLogo.webp';

const UEFACountryRank = () => {
    const[uefaCountryRankSeason, setUefaCountryRankSeason] = useState();
    const[uefaCountryRank, setUefaCountryRank] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://legfootball.herokuapp.com/uefaCountryRankSeason')
            .then(response => {
                setUefaCountryRankSeason(response.data && response.data.map((item, indx) => {
                    return <div key={'uefaCountryRankSeason' + indx}>
                        <Tippy content={'Сумма очков за сезон 20' + item.seasonLast5.split('/')[0] + '/20' + item.seasonLast5.split('/')[1]}><span>{item.seasonLast5}</span></Tippy>
                        <Tippy content={'Сумма очков за сезон 20' + item.seasonLast4.split('/')[0] + '/20' + item.seasonLast4.split('/')[1]}><span>{item.seasonLast4}</span></Tippy>
                        <Tippy content={'Сумма очков за сезон 20' + item.seasonLast3.split('/')[0] + '/20' + item.seasonLast3.split('/')[1]}><span>{item.seasonLast3}</span></Tippy>
                        <Tippy content={'Сумма очков за сезон 20' + item.seasonLast2.split('/')[0] + '/20' + item.seasonLast2.split('/')[1]}><span>{item.seasonLast2}</span></Tippy>
                        <Tippy content={'Сумма очков за текущий сезон'}><span className='current'>{item.seasonCurrent}</span></Tippy>
                    </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });

            axios.get('https://legfootball.herokuapp.com/uefaCountryRank')
            .then(response => {
                setUefaCountryRank(response.data && response.data.map((item, indx) => {
                    return <div className="col wrap" key={'uefaCountryRank' + indx}>
                    <div>
                        <span className='place'>{item.place}<span>.</span></span>
                        <div className='flagName'><LazyLoad offset={800}><Tippy content={item.name}><img src={'https://terrikon.com' + item.flag} alt={item.name} /></Tippy></LazyLoad><span>{item.name}</span></div>
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
            <h1 className="pageName">Рейтинг ассоциаций УЕФА</h1>
            <section>
                <div className="uefaTable">
                    <div className="logoWrap">
                        <LazyLoad offset={800}><Tippy content='UEFA'><img src={uefaLogo} alt="uefaLogo" /></Tippy></LazyLoad>
                    </div>
                    <div className="col">
                        <div>
                            <Tippy content="Позиция"><span>#</span></Tippy>
                            <Tippy content="Страна"><span>Страна</span></Tippy>
                            <Tippy content="Количество клубов"><span>Клубы</span></Tippy>
                            <Tippy content="Сумма очков"><span className='total'>Сумма</span></Tippy>
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