import React, { useState, useEffect } from 'react';
import './Poll.css';
import $ from 'jquery';
import axios from 'axios';

import loadSpiner from '../../../assets/ico/loadSpiner.gif';

const Poll = () => {
    const[yes, setYes] = useState();
    const[no, setNo] = useState();
    const[total, setTotal] = useState();
    const[yesWidth, setYesWidth] = useState(0);
    const[noWidth, setNoWidth] = useState(0);
    const[pollLoading, setPollLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            localStorage.getItem('poll') && $('.poll form button').attr('disabled', true) && $('.poll form input').attr('disabled', true) && $(`.poll form input[value=${localStorage.getItem('poll')}]`).attr('checked', true) && $('.poll form button').text(`Голосов: ${total}`).css({background: 'silver', color: 'gray'}) && $('.poll form .progress').fadeIn() && $('.poll form .progress span').fadeIn();
            
            if($(window).width() < 1024) {
                localStorage.getItem('poll') ? setTimeout(() => {$(".poll").attr("style", "display: none !important")}, 5000) : setTimeout(() => {
                    $(".poll").attr("style", "display: block !important");
                }, 60000);
            }
    
            await axios.get('/poll/yes')
            .then(response => {
                setYes(response.data.length);
            })
            .catch(err => {
                console.log(err);
            });
    
            await axios.get('/poll/no')
            .then(response => {
                setNo(response.data.length);
            })
            .catch(err => {
                console.log(err);
            });
            
            setYesWidth((yes * 100) / (yes + no));
            setNoWidth((no * 100) / (yes + no));
            setTotal(yes + no);
        }
    
        fetchData();
    }, [yes, no, total, yesWidth, noWidth]);
    
    const closePoll = () => {
        $(".poll").attr("style", "display: none !important");
    }

    const sendPoll = async (e) => {
        e.preventDefault();

        setPollLoading(true);

        $('.poll form input[type="radio"]:checked').val() === undefined ? alert('Выберите вариант') :

        await axios.get('https://api.ipify.org/') // set & get poll choice
        .then(response => {
            axios.post('/poll/post', {
                choiceVal: $('.poll form input[type="radio"]:checked').val(),
                clientIP: response.data
            })
            .catch(err => {
                if(err) throw err;
            });

            setTimeout(() => {
                axios.get('/poll/yes')
                .then(response => {
                    setYes(response.data.length);
                    setPollLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
            }, 1000);

            setTimeout(() => {
                axios.get('/poll/no')
                .then(response => {
                    setNo(response.data.length);
                    setPollLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
            }, 1000);

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
            <div className="wrap">
                <button onClick={closePoll} className="close">X</button>
                <h2>Оцени наш сайт👇</h2>
                <form>
                    <div>
                        <div><input value={'yes'} type="radio" name='poll' id='likeYes' /><label htmlFor="likeYes">👍</label></div><div className="progress" style={{width: `${yesWidth}%`}}><span>{yes}</span></div>
                    </div>
                    <div>
                        <div><input value={'no'} type="radio" name='poll' id='likeNo' /><label htmlFor="likeNo">👎</label></div><div className="progress" style={{width: `${noWidth}%`}}><span>{no}</span></div>
                    </div>
                    {pollLoading ? <img className='loadSpiner' src={loadSpiner} alt='загрузка' /> : <button onClick={sendPoll}><span className='total'>Голосовать</span></button>}
                </form>
            </div>
        </div>
    );
};

export default Poll;