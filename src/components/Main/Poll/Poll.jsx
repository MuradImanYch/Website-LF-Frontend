import React, { useState, useEffect } from 'react';
import './Poll.css';
import $ from 'jquery';
import axios from 'axios';

const Poll = () => {
    const[yes, setYes] = useState();
    const[no, setNo] = useState();
    const[total, setTotal] = useState();
    const[yesWidth, setYesWidth] = useState(0);
    const[noWidth, setNoWidth] = useState(0);

    useEffect(() => {
        localStorage.getItem('poll') && $('.poll form button').attr('disabled', true) && $('.poll form input').attr('disabled', true) && $(`.poll form input[value=${localStorage.getItem('poll')}]`).attr('checked', true) && $('.poll form button').text(`Голосов: ${total}`).css({background: 'silver', color: 'gray'}) && $('.poll form .progress').fadeIn() && $('.poll form .progress span').fadeIn();

        axios.get('/getPollYes')
        .then(response => {
            setYes(response.data.length);
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/getPollNo')
        .then(response => {
            setNo(response.data.length);
        })
        .catch(err => {
            console.log(err);
        });
        
        setYesWidth((yes * 100) / (yes + no));
        setNoWidth((no * 100) / (yes + no));
        setTotal(yes + no);
    }, [yes, no, total, yesWidth, noWidth]);

    const sendPoll = (e) => {
        e.preventDefault();

        $('.poll form input[type="radio"]:checked').val() === undefined ? alert('Выберите вариант') :

        axios.get('https://api.ipify.org/') // set & get poll choise
        .then(response => {
            axios.post('/postPoll', {
                choiseVal: $('.poll form input[type="radio"]:checked').val(),
                clientIP: response.data
            })
            .catch(err => {
                if(err) throw err;
            });

            axios.get('/getPollYes')
            .then(response => {
                setYes(response.data.length);
            })
            .catch(err => {
                console.log(err);
            });

            axios.get('/getPollNo')
            .then(response => {
                setNo(response.data.length);
            })
            .catch(err => {
                console.log(err);
            });

            setYesWidth((yes * 100) / (yes + no));
            setNoWidth((no * 100) / (yes + no));

            $('.poll form input, .poll form button').attr('disabled', true);
            $('.poll form .progress span').fadeIn();
            $('.poll form .progress').fadeIn();
            $('.poll form button').text(`Голосов: ${total + 1}`).css({background: 'silver', color: 'gray'});

            localStorage.setItem('poll',  $('.poll form input[type="radio"]:checked').val());
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className='poll'>
            <h4>Нравится ли вам наш новый сайт?</h4>
            <form>
                <div>
                    <div><input value={'yes'} type="radio" name='poll' id='likeYes' /><label htmlFor="likeYes">Да</label></div><div className="progress" style={{width: `${yesWidth}%`}}><span>{yes}</span></div>
                </div>
                <div>
                    <div><input value={'no'} type="radio" name='poll' id='likeNo' /><label htmlFor="likeNo">Нет</label></div><div className="progress" style={{width: `${noWidth}%`}}><span>{no}</span></div>
                </div>
                <button onClick={sendPoll}><span className='total'>Голосовать</span></button>
            </form>
        </div>
    );
};

export default Poll;