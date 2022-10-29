import React, { useEffect, useState } from 'react';
import './TransferList.css';
import axios from 'axios';

const TransferList = () => {
    const[transferList, setTransferList] = useState();

    useEffect(() => {
        axios.get('/transferList')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('transferList', JSON.stringify(response.data));
            }
            setTransferList(JSON.parse(localStorage.getItem('transferList')) && JSON.parse(localStorage.getItem('transferList')).splice(0, 21).map((e, i) => {
                return <div className="col" key={'key' + i} id={'id' + i}>
                <div className="player">
                    <img src={e.img} alt={e.name} title={e.name} />
                    <span>{e.name}</span>
                </div>
                <div className="outIn">
                    <img className='out' src={e.clubOut} alt="" title={e.clubOutName} />
                    <span>→</span>
                    <img className='in' src={e.clubIn} alt="" title={e.clubInName} />
                </div>
                <div className="price">{e.price}</div>
            </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div id='transferList'>
            <section>
                <h3 className="sectionName">Список популярных трансферов</h3>
                <div className="listWrap">
                    {transferList}
                </div>
            </section>
        </div>
    );
};

export default TransferList;