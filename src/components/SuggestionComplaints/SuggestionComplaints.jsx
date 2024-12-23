import React, { useState, useEffect } from 'react';
import './SuggestionComplaints.css';
import $ from 'jquery';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const SuggestionComplaints = () => {
    const[name, setName] = useState('');
    const[lName, setLName] = useState('');
    const[topic, setTopic] = useState('');
    const[text, setText] = useState('');
    const[email, setEmail] = useState('');
    const[title, setTitle] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    const send = () => {
        if(name === '') {
            alert('Введите ваше Имя');
        }
        else if(lName === '') {
            alert('Введите вашу Фамилию');
        }
        else if(topic === '') {
            alert('Выберите Тему обращения');
        }
        else if(email === '') {
            alert('Введите вашу почту');
        }
        else if(title === '') {
            alert('Введите заголовок');
        }
        else if(text === '') {
            alert('Введите Описание');
        }
        else {
            axios.post('/suggestionsComplaints', {
                name,
                lName,
                topic,
                email,
                title,
                text
            }).catch(err => {
                if(err) throw err;
            });

            $('select').prop({selectedIndex: '0'});
            document.querySelector('#suggestionsComplaints button').innerHTML = '✓';
            document.querySelector('#name').setAttribute('disabled', 'disabled');
            document.querySelector('#lname').setAttribute('disabled', 'disabled');
            document.querySelector('#topic').setAttribute('disabled', 'disabled');
            document.querySelector('#email').setAttribute('disabled', 'disabled');
            document.querySelector('#title').setAttribute('disabled', 'disabled');
            document.querySelector('#text').setAttribute('disabled', 'disabled');
            document.querySelector('#suggestionsComplaints button').setAttribute('disabled', 'disabled');
            document.querySelector('#suggestionsComplaints button').style.background = '#18ba20';

            $('input').val('');
            $('textarea').val('');

            setName('');
            setLName('');
            setTopic('');
            setText('');
            setEmail('');
            setTitle('');

            setTimeout(() => {
                document.querySelector('#suggestionsComplaints button').innerHTML = '→';
                document.querySelector('#name').removeAttribute('disabled');
                document.querySelector('#lname').removeAttribute('disabled');
                document.querySelector('#topic').removeAttribute('disabled');
                document.querySelector('#email').removeAttribute('disabled');
                document.querySelector('#title').removeAttribute('disabled');
                document.querySelector('#text').removeAttribute('disabled');
                document.querySelector('#suggestionsComplaints button').removeAttribute('disabled');
                document.querySelector('#suggestionsComplaints button').style.background = 'rgba(204, 135, 45, 0.9)';
            }, 5000);
        }
    }

    return (
        <div id='suggestionsComplaints'>
            <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Предложения и жалобы</h1>
            <form>
                <div className='nameLname'>
                    <div>
                        <label htmlFor="name">Имя:</label>
                        <input onChange={(e) => {setName(e.target.value)}} type="text" id='name' name='name' placeholder='Имя' />
                    </div>
                    <div>
                        <label htmlFor="lname">Фамилия:</label>
                        <input onChange={(e) => {setLName(e.target.value)}} type="text" id='lname' name='lname' placeholder='Фамилия' />
                    </div>
                    <div>
                        <label htmlFor="topic">Тема обращения:</label>
                        <select onChange={(e) => {setTopic(e.target.value)}} name='topic' id='topic' defaultValue={'none'}>
                            <option value="none" disabled>Выбрать</option>
                            <option value="suggestion">Предложение</option>
                            <option value="complaint">Жалоба</option>
                        </select>
                    </div>
                    <div className='email'>
                        <label htmlFor="email">Почта:</label>
                        <input onChange={(e) => {setEmail(e.target.value)}} type="email" id='email' name='email' placeholder='Почта' />
                    </div>
                </div>
                <div className='title'>
                    <label htmlFor="title">Заголовок</label>
                    <input onChange={(e) => {setTitle(e.target.value)}} type="text" placeholder='Заголовок' name='title' id='title' />
                </div>
                <label htmlFor="text">Описание</label>
                <div className='text'>
                    <textarea onChange={(e) => {setText(e.target.value)}} name="text" id="text" placeholder='Описание'></textarea>
                </div>
            </form>
            <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content="Отправить"><button onClick={send}>→</button></Tippy>
        </div>
    );
};

export default SuggestionComplaints;