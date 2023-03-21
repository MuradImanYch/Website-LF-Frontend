import React, { useEffect, useState } from 'react';
import './TransferList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';

const TransferList = () => {
    const[transferList, setTransferList] = useState();
    const[expandToggle, setExpandToggle] = useState(10);
    const[linkToggle, setLinkToggle] = useState('#');

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/transfers/all')
            .then(response => {
                setTransferList(response.data && response.data.splice(0, expandToggle).map((e, i) => {
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
    }, [expandToggle]);

    const transferToggle = () => {
        setExpandToggle(21);
        $('#transferList > section > a').text('Подробнее');
        setLinkToggle('transfers/list');
    }

    return (
        <div id='transferList'>
            <section>
                <h3 className="sectionName">Список популярных трансферов</h3>
                <div className="listWrap">
                    {transferList}
                </div>
                <Link to={linkToggle} onClick={transferToggle}>Развернуть</Link>
            </section>
        </div>
    );
};

export default TransferList;