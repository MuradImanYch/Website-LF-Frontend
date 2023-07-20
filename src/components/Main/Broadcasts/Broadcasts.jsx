import React, { useState, useEffect } from 'react';
import './Broadcasts.css';
import Tippy from '@tippyjs/react';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Broadcasts = () => {
    const[item, setItem] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/broadcasts/get')
            .then(response => {
                setItem(response.data && response.data.reverse().splice(0, 8).map((e) => {    
                    return <Tippy content='Смотреть' key={'broadcast' + e.id}>
                                <Link to={`/broadcast/watch/${e.id}`} id={'broadcast' + e.id}>
                                    <div className="col">
                                        <div><LazyLoad offset={800}><Tippy content={e.hName}><img loading="lazy" src={e.hLogo} alt={e.hName} /></Tippy></LazyLoad><span>{e.hName.slice(0, 8)}</span></div>
                                        <div className='timeLive'>
                                            <LazyLoad offset={800}><Tippy content={e.lName}><img loading="lazy" src={e.lLogo} alt={e.lName} /></Tippy></LazyLoad>
                                            {e.broadcastLink === null ? <span>{e.time}</span> : <span style={{color: 'red', letterSpacing: '1.3px'}}>live</span>}
                                        </div>
                                        <div><span>{e.aName.slice(0, 8)}</span><LazyLoad offset={800}><Tippy content={e.aName}><img loading="lazy" src={e.aLogo} alt={e.aName} /></Tippy></LazyLoad></div>
                                    </div>
                                </Link>
                            </Tippy>
                })); 
            })
            .catch(err => {
                console.log(err);
            }); 
        }
        
        fetchData();
    }, []); 

    return (
        <div id='broadcastsQckNav' className='broadcasts'>
            <h2 className="sectionName">Трансляция матчей</h2>
            <div className="wrap">
                {item && item.length > 0 ? item : <div className='noData'>Данных нет</div>}
            </div>
        </div>
    );
};

export default Broadcasts;