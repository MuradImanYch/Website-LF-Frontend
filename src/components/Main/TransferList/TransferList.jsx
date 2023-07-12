import React, { useEffect, useState } from 'react';
import './TransferList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';

const TransferList = () => {
    const[transferList, setTransferList] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/transfers/all')
            .then(response => {
                setTransferList(response.data && response.data.splice(0, 10).map((e, i) => {
                    return <div className="col" key={'transferList' + i}>
                    <div className="player">
                        <LazyLoad offset={800}>
                            <Tippy offset={[0, 10]} content={e.name}><img src={e.img} alt={e.name} /></Tippy>
                        </LazyLoad>
                        <span>{e.name}</span>
                    </div>
                    <div className="outIn">
                        <Tippy content={e.clubOutName}><img className='out' src={e.clubOut} alt={e.clubOutName} /></Tippy>
                        <span>→</span>
                        <Tippy content={e.clubInName}><img className='in' src={e.clubIn} alt={e.clubInName} /></Tippy>
                    </div>
                    <div className="price">{e.price}</div>
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
        <div id='transferList'>
            <section id='transferListQckNav'>
                <h2 className="sectionName">Список популярных трансферов</h2>
                <div className="listWrap">
                    {transferList && transferList.length > 0 ? transferList : <div className='noData'>Данных нет</div>}
                </div>
                <Link to="/transfers/list">Подробнее</Link>
            </section>
        </div>
    );
};

export default TransferList;