import React, { useEffect, useState } from 'react';
import './AddBroadcasts.css';
import axios from 'axios';
import $ from 'jquery';

const AddBroadcasts = (e) => {
    const[hName, setHName] = useState('');
    const[hLogo, setHLogo] = useState('');
    const[lName, setLName] = useState('');
    const[lLogo, setLLogo] = useState('');
    const[aName, setAName] = useState('');
    const[aLogo, setALogo] = useState('');
    const[time, setTime] = useState('');
    const[broadcastLink, setBroadcastLink] = useState('');
    const[fromParsing, setFromParsing] = useState('');
    const[channelsFilter, setChannelsFilter] = useState('');
    const[searchTeam1Filter, setSearchTeam1Filter] = useState('');
    const[searchTeam2Filter, setSearchTeam2Filter] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page

        axios.get('/iptvParsing')
        .then(response => {
            setFromParsing(response.data.segments);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const add = (e) => {
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
            axios.post('/broadcasts/add', {
                hName,
                hLogo,
                lName,
                lLogo,
                aName,
                aLogo, 
                time,
                broadcastLink
            });
    
            document.querySelector('#addBroadcast button').style.background = '#18ba20';
            document.querySelector('#addBroadcast button').innerHTML = '✓';
            document.querySelector('#addBroadcast button').setAttribute('disabled', 'disabled');
            document.querySelector('#addBroadcast button').style.color = '#fff';
            $('#addBroadcast form div input').attr('disabled', 'disabled');
            $('#addBroadcast form div input').val('');

            setHName('');
            setHLogo('');
            setLName('');
            setLLogo('');
            setAName('');
            setALogo('');
            setTime('');
            setBroadcastLink();
            
            setTimeout(() => {
                document.querySelector('#addBroadcast button').style.background = '#ffbf66';
                document.querySelector('#addBroadcast button').innerHTML = '+';
                document.querySelector('#addBroadcast button').removeAttribute('disabled', 'disabled');
                $('#addBroadcast form div input').removeAttr('disabled', 'disabled');
                document.querySelector('#addBroadcast button').style.color = '#000';
            }, 5000);
        }
    }

    const searchingChannels = (e) => {
        $('#addBroadcast .channelsDropDown').fadeIn();
        const value = e.target.value;

        // Фильтрация массива по введенному значению
        const filteredChannels = fromParsing.filter(channel =>
        channel.inf.title.toLowerCase().includes(value.toLowerCase())
        );

        // Вывод результатов в консоль
        setChannelsFilter(filteredChannels);
    }

    const filterLinkClick = (e) => {
        $('#addBroadcast .channelsDropDown').fadeOut();
        $('#addBroadcast #findChannels').val('');
        
        // Получаем текущее значение из #link
        const currentLinkValue = $('#link').val();
        
        // Добавляем новую строку через пробел
        $('#link').val(currentLinkValue ? currentLinkValue + ' ' + e.target.id : e.target.id);
        setBroadcastLink(currentLinkValue ? currentLinkValue + ' ' + e.target.id : e.target.id);
    }

    const searchTeam1 = (e) => {
        $('#addBroadcast .team1DropDown').fadeIn();

        axios.post('/searchTeam', {
            team: e.target.value
        })
        .then(response => {
            setSearchTeam1Filter(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const searchTeam2 = (e) => {
        axios.post('/searchTeam', {
            team: e.target.value
        })
        .then(response => {
            setSearchTeam2Filter(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const filterTeam1Click = (e) => {
        $('#addBroadcast .team1DropDown').fadeOut();
        $('#addBroadcast #findTeams1').val('');

        $('#name1').val(e.target.id.split('separate')[0]);
        $('#logo1').val(e.target.id.split('separate')[1]);

        setHName(e.target.id.split('separate')[0]);
        setHLogo(e.target.id.split('separate')[1]);
    }

    const filterTeam2Click = (e) => {
        $('#addBroadcast .team2DropDown').fadeOut();
        $('#addBroadcast #findTeams2').val('');

        $('#name2').val(e.target.id.split('separate')[0]);
        $('#logo2').val(e.target.id.split('separate')[1]);

        setAName(e.target.id.split('separate')[0]);
        setALogo(e.target.id.split('separate')[1]);
    }

    return (
        <div id='addBroadcast'>
            <form className="wrap">
                <div>
                    <label htmlFor="name1">Название команды 1</label>
                    <input id='name1' type="text" placeholder='Введите название команды хозяева' onChange={(e) => {setHName(e.target.value)}} />
                    <input onChange={searchTeam1} id='findTeams1' type="text" placeholder='Поиск команды' />
                </div>
                <div className="dropDown team1DropDown" style={{display: `${searchTeam1Filter && searchTeam1Filter.length > 0 && 'block'}`}}>
                    {searchTeam1Filter && searchTeam1Filter.map((e, i) => {
                        return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}} id={e.name + 'separate' + e.img[1]} onClick={filterTeam1Click} key={'team1' + i}><img id={e.name + 'separate' + e.img[1]} style={{width: '20px', marginRight: '10px'}} src={e.img[1]} /> {e.name}</div>
                    })}
                </div>
                <div>
                    <label htmlFor="logo1">Лого команды 1</label>
                    <input id='logo1' type="text" placeholder='Вставьте ссылку на лого команды хозяева' onChange={(e) => {setHLogo(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="lName">Название турнира</label>
                    <input id='lName' type="text" placeholder='Введите название турнира' onChange={(e) => {setLName(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="lLogo">Лого турнира</label>
                    <input id='lLogo' type="text" placeholder='Вставьте ссылку на лого турнира' onChange={(e) => {setLLogo(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="name2">Название команды 2</label>
                    <input id='name2' type="text" placeholder='Введите название гостевой команды' onChange={(e) => {setAName(e.target.value)}} />
                    <input onChange={searchTeam2} id='findTeams2' type="text" placeholder='Поиск команды' />
                </div>
                <div className="dropDown team2DropDown" style={{display: `${searchTeam2Filter && searchTeam2Filter.length > 0 && 'block'}`}}>
                    {searchTeam2Filter && searchTeam2Filter.map((e, i) => {
                        return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}} id={e.name + 'separate' + e.img[1]} onClick={filterTeam2Click} key={'team1' + i}><img id={e.name + 'separate' + e.img[1]} style={{width: '20px', marginRight: '10px'}} src={e.img[1]} /> {e.name}</div>
                    })}
                </div>
                <div>
                    <label htmlFor="logo2">Лого команды 2</label>
                    <input id='logo2' type="text" placeholder='Вставьте ссылку на лого гостевой команды' onChange={(e) => {setALogo(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="time">Время</label>
                    <input id='time' type="text" placeholder='Введите время начало матча' onChange={(e) => {setTime(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="link">Ссылка на трансляцию *можно и позже</label>
                    <input id='link' type="text" placeholder='Введите ссылку на трансляцию' onChange={(e) => {setBroadcastLink(e.target.value)}} />
                    <input onChange={searchingChannels} id='findChannels' placeholder='Поиск каналов'/>
                </div>
                <div className="dropDown channelsDropDown" style={{display: `${channelsFilter && channelsFilter.length > 0 && 'block'}`}}>
                    {channelsFilter && channelsFilter.map((e, i) => {
                        return <div onClick={filterLinkClick} id={e.url} key={'channel' + i}>{e.inf.title}</div>
                    })}
                </div>

                <button type='submit' onClick={add}>+</button>
            </form>
        </div>
    );
};

export default AddBroadcasts;