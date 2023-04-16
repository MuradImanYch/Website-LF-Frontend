import React, { useEffect, useState } from 'react';
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
                                        <div><LazyLoad offset={800}><Tippy content={e.hName}><img src={e.hLogo} alt={e.hName} /></Tippy></LazyLoad><span>{e.hName.slice(0, 8)}</span></div>
                                        <div className='timeLive'>
                                            <LazyLoad offset={800}><Tippy content={e.lName}><img src={e.lLogo} alt={e.lName} /></Tippy></LazyLoad>
                                            {e.broadcastLink === null ? <span>{e.time}</span> : <span style={{color: 'red', letterSpacing: '1.3px'}}>live</span>}
                                        </div>
                                        <div><span>{e.aName.slice(0, 8)}</span><LazyLoad offset={800}><Tippy content={e.aName}><img src={e.aLogo} alt={e.aName} /></Tippy></LazyLoad></div>
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
        <div className='otherBroadcasts'>
            <h1 className="pageName">Трансляция матчей</h1>
            <div className="wrap">
                {item}
            </div>
        </div>
    );
};

export default Broadcasts;