import React, { useEffect, useState } from 'react';
import './Broadcasts.css';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

const Broadcasts = () => {
    const[item, setItem] = useState();
    const[delId, setDelId] = useState('');
    const[editId, setEditId] = useState('');
    const[hName, setHName] = useState('');
    const[hLogo, setHLogo] = useState('');
    const[lName, setLName] = useState('');
    const[lLogo, setLLogo] = useState('');
    const[aName, setAName] = useState('');
    const[aLogo, setALogo] = useState('');
    const[time, setTime] = useState('');
    const[broadcastLink, setBroadcastLink] = useState();

    function convertGermanToclientTime(germanTime) {
        // Разбиваем строку времени на часы и минуты
        const [hours, minutes] = germanTime.split(':').map(Number);
      
        // Создаем объект Date с текущей датой и временем в немецкой временной зоне
        const germanDate = new Date();
        germanDate.setHours(hours);
        germanDate.setMinutes(minutes);

        const clientUTCOffset = new Date();
      
        // Добавляем разницу между немецким и иранским временем (2.5 часа)
        const clientDate = new Date(germanDate.getTime() + ((-clientUTCOffset.getTimezoneOffset() / 60) - 4) * 60 * 60 * 1000);
      
        // Получаем иранское время в формате "чч:мм"
        const clientTime = `${clientDate.getHours()}:${clientDate.getMinutes().toString().padStart(2, '0')}`;
      
        return clientTime;
      }

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    const rejectEdit = (e) => {
        e.preventDefault();

        setEditId('');
        setHName('');
        setHLogo('');
        setLName('');
        setLLogo('');
        setAName('');
        setALogo('');
        setTime('');
        setBroadcastLink();
        $('.editPopup').fadeOut();
        $('body').css({overflow: "auto"});
    }

    const acceptEdit = (e) => {
        e.preventDefault();
        
        if(hName === '') {
            alert('Введите название команды хозяева');
        }
        else if(hLogo === '') {
            alert('Вставьте ссылку на лого команды хозяева');
        }
        else if(lName === '') {
            alert('Введите название турнира');
        }
        else if(lLogo === '') {
            alert('Вставьте ссылку на лого турнира');
        }
        else if(aName === '') {
            alert('Введите название гостевой команды');
        }
        else if(aLogo === '') {
            alert('Вставьте ссылку на лого гостевой команды');
        }
        else if(time === '') {
            alert('Введите время начало матча');
        }
        else {
            setEditId('');
            setHName('');
            setHLogo('');
            setLName('');
            setLLogo('');
            setAName('');
            setALogo('');
            setTime('');
            setBroadcastLink();

            $('.editPopup').fadeOut();
            $('body').css({overflow: "auto"});
            $('.adminBroadcasts .btnWrap button').attr('disabled', 'disabled');
            $('.adminBroadcasts .btnWrap button').css({background: 'silver'});
            
            axios.post('/admin/editBroadcast', {id: editId && editId, hName, hLogo, lName, lLogo, aName, aLogo, time, broadcastLink})
            .catch(err => {
                console.log(err);
            });

            setTimeout(() => {
                $('.adminBroadcasts .btnWrap button').removeAttr('disabled');
                $('.adminBroadcasts .btnWrap button').css({background: '#fff'});
            }, 5000);
        }
    }

    useEffect(() => { 
        const fetchData = async () => {
            await axios.get('/broadcasts/get')
            .then(response => {
                setItem(response.data && response.data.reverse().map((e) => {    
                    const deleteBroadcast = (e) => {
                        setDelId(e.target.id.match(/\d+/)[0]);
                        $('#delConfirm').fadeIn();
                        $('body').css({overflow: "hidden"});
                    }
            
                    const acceptDel = () => {
                        setDelId('');
                        $('#delConfirm').fadeOut();
                        $('body').css({overflow: "auto"});

                        $('#broadcast' + delId).hide('slow');
                
                        setTimeout(() => {
                            axios.post('/admin/delBroadcast', {
                                id: delId && delId,
                            })
                            .catch(err => {
                                if(err) throw err;
                            });
                        }, 1000);
                
                        $('.adminBroadcasts .btnWrap button').attr('disabled', 'disabled');
                        $('.adminBroadcasts .btnWrap button').css({background: 'silver'});
                
                        setTimeout(() => {
                            $('.adminBroadcasts .btnWrap button').removeAttr('disabled');
                            $('.adminBroadcasts .btnWrap button').css({background: '#fff'});

                            $('.adminBroadcasts .btnWrap button:first-child').mouseenter((e) => {
                                $(e.target).css({background: 'rgb(149, 207, 255)'});
                            });
                            $('.adminBroadcasts .btnWrap button:first-child').mouseleave((e) => {
                                $(e.target).css({background: '#fff'});
                            });
                            $('.adminBroadcasts .btnWrap button:last-child').mouseenter((e) => {
                                $(e.target).css({background: 'rgb(255, 192, 192)'});
                            });
                            $('.adminBroadcasts .btnWrap button:last-child').mouseleave((e) => {
                                $(e.target).css({background: '#fff'});
                            });
                        }, 5000);
                    }
            
                    const rejectDel = () => {
                        setDelId('');
                        $('#delConfirm').fadeOut();
                        $('body').css({overflow: "auto"});
                    }

                    return <div key={'broadcast' + e.id} id={'broadcast' + e.id}>
                    <Link to={`/broadcast/watch/${e.id + '-' + cyrillicToTranslit().transform(e.hName + '-' + e.aName + '-' + e.lName).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`} id={'broadcast' + e.id}>
                        <div className="col">
                            <div><LazyLoad offset={800}><img loading="lazy" src={e.hLogo} alt={e.hName} /></LazyLoad><span>{e.hName}</span></div>
                            <div className='timeLive'>
                                <LazyLoad offset={800}><img loading="lazy" src={e.lLogo} alt={e.lName} /></LazyLoad>
                                {e.broadcastLink === null || e.broadcastLink === '' ? <span>{e.time}</span> : <span style={{color: 'red', letterSpacing: '1.3px'}}>live <br /><div className="liveTime">{convertGermanToclientTime(e.time)}</div></span>}
                            </div>
                            <div><span>{e.aName}</span><LazyLoad offset={800}><img loading="lazy" src={e.aLogo} alt={e.aName} /></LazyLoad></div>
                        </div>
                    </Link>
                    <div className='btnWrap'>
                        <div>
                            <button id={`editBroadcast${e.id}`} onClick={editBroadcast}>✎</button>
                            <button id={`delBroadcast${e.id}`} onClick={deleteBroadcast}>🗑</button>
                        </div>
                        <span>ID: {e.id}</span>
                    </div>
                    <div id="delConfirm">
                        <div id="forCenter">
                            <p>Удалить эту трансляцию?</p>
                            <div id="btnWrap">
                                <button onClick={acceptDel}>ДА</button>
                                <button onClick={rejectDel}>НЕТ</button>
                            </div>
                        </div>
                    </div>
                </div>
                })); 
            })
            .catch(err => {
                console.log(err);
            }); 
        }
        
        fetchData();

        const editBroadcast = (e) => {
            $('.editPopup').fadeIn();
            $('body').css({overflow: "hidden"});
    
            axios.post('/admin/findEditedBroadcast', {id: e.target.id.match(/\d+/)[0]})
            .then(response => {
                setEditId(e.target.id.match(/\d+/)[0]);
                setHName(response.data[0].hName);
                setHLogo(response.data[0].hLogo);
                setLName(response.data[0].lName);
                setLLogo(response.data[0].lLogo);
                setAName(response.data[0].aName);
                setALogo(response.data[0].aLogo);
                setTime(response.data[0].time);
                setBroadcastLink(response.data[0].broadcastLink);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [delId, editId, hName, hLogo, lName, lLogo, aName, aLogo, time, broadcastLink]);

    return (
        <div className='adminBroadcasts'>
            <div className="wrap">
                {item && item.length > 0 ? item : <div className='noData'>Данных нет</div>}
                <div className="editPopup">
                    <div className="container">
                        <form className="wrap">
                            <div>
                                <label htmlFor="name1">Название команды 1</label>
                                <input value={hName} id='name1' type="text" placeholder='Введите название команды хозяева' onChange={(e) => {setHName(e.target.value)}} />
                            </div>
                            <div>
                                <label htmlFor="logo1">Лого команды 1</label>
                                <input value={hLogo} id='logo1' type="text" placeholder='Вставьте ссылку на лого команды хозяева' onChange={(e) => {setHLogo(e.target.value)}} />
                            </div>
                            <div>
                                <label htmlFor="lName">Название турнира</label>
                                <input value={lName} id='lName' type="text" placeholder='Введите название турнира' onChange={(e) => {setLName(e.target.value)}} />
                            </div>
                            <div>
                                <label htmlFor="lLogo">Лого турнира</label>
                                <input value={lLogo} id='lLogo' type="text" placeholder='Вставьте ссылку на лого турнира' onChange={(e) => {setLLogo(e.target.value)}} />
                            </div>
                            <div>
                                <label htmlFor="name2">Название команды 2</label>
                                <input value={aName} id='name2' type="text" placeholder='Введите название гостевой команды' onChange={(e) => {setAName(e.target.value)}} />
                            </div>
                            <div>
                                <label htmlFor="logo2">Лого команды 2</label>
                                <input value={aLogo} id='logo2' type="text" placeholder='Вставьте ссылку на лого гостевой команды' onChange={(e) => {setALogo(e.target.value)}} />
                            </div>
                            <div>
                                <label htmlFor="time">Время</label>
                                <input value={time} id='time' type="text" placeholder='Введите время начало матча' onChange={(e) => {setTime(e.target.value)}} />
                            </div>
                            <div>
                                <label htmlFor="time">Ссылка на трансляцию *можно и позже</label>
                                <input value={broadcastLink ? broadcastLink : ''} id='time' type="text" placeholder='Введите ссылку на трансляцию' onChange={(e) => {setBroadcastLink(e.target.value)}} />
                            </div>

                            <button title='Подтвердить' type='submit' className='acceptBtn' onClick={acceptEdit}>✓</button>
                            <button title='Отклонить' type='submit' className='rejectBtn' onClick={rejectEdit}>⨯</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Broadcasts;