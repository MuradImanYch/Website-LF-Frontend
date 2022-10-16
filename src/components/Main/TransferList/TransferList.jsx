import React, { useEffect, useState } from 'react';
import './TransferList.css';
import $ from 'jquery';

const TransferList = () => {
    const[transferList, setTransferList] = useState();

    useEffect(() => {
        $.ajax({
            type: "GET",
            url: '/transferList',
        }).done((response) => {
            if(response.length > 0) {
                localStorage.setItem('transferList', JSON.stringify(response));
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