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
    const[broadcastLink, setBroadcastLink] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
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
            }, 10000);
        }
    }

    return (
        <div id='addBroadcast'>
            <form className="wrap">
                <div>
                    <label htmlFor="name1">Название команды 1</label>
                    <input id='name1' type="text" placeholder='Введите название команды хозяева' onChange={(e) => {setHName(e.target.value)}} />
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
                    <label htmlFor="time">Ссылка на трансляцию *можно и позже</label>
                    <input id='time' type="text" placeholder='Введите ссылку на трансляцию' onChange={(e) => {setBroadcastLink(e.target.value)}} />
                </div>

                <button type='submit' onClick={add}>+</button>
            </form>
        </div>
    );
};

export default AddBroadcasts;