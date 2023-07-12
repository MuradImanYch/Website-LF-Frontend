import React, { useState } from 'react';
import './Auth.css';
import $ from 'jquery';
import axios from 'axios';

const Auth = ({token}) => {
    const[username, setUserName] = useState();
    const[password, setPassword] = useState();

    const logBtn = (e) => {
        e.preventDefault();
        const logLoginVal = $('#auth .logLogin').val();
        const logPasswordVal = $('#auth .logPassword').val();
    
        if(logLoginVal.length <= 0) {
            return $('#auth .error').text('Введите имя пользователя').css({color: 'red'});
        }
        else if(logPasswordVal.length <= 0) {
            return $('#auth .error').text('Введите пароль').css({color: 'red'});
        }
        else {
            $('#auth .error').text('');
            axios.post('/auth/login', {
                username,
                password
            })
            .then(response => {
                $('#auth .error').text(response.data.message).css({color: 'red'});
                $('#auth .error').text() === 'Вход разрешен' ? $('#auth .error').css({color: 'green'}) && $('.authWrap').fadeOut() && $('body').css({'overflow': 'auto'}) && token(response.data.token) : $('#auth .error').css({color: 'red'});
            })
            .catch(err => {
                if(err) throw err;
            });
        }
    }

    const regBtn = (e) => {
        e.preventDefault();
        const regLoginVal = $('#auth .regLogin').val();
        const regPasswordVal = $('#auth .regPassword').val();
    
        if(regLoginVal.length <= 0) {
            return $('#auth .error').text('Введите имя пользователя').css({color: 'red'});
        }
        else if(regLoginVal.length <= 3) {
            return $('#auth .error').text('Имя пользователя должно быть не менее 4-ёх символов').css({color: 'red'});
        }
        else if(regPasswordVal.length <= 0) {
            return $('#auth .error').text('Введите пароль').css({color: 'red'});
        }
        else if(regPasswordVal.length <= 3) {
            return $('#auth .error').text('Пароль должен быть не менее 4-ёх символов').css({color: 'red'});
        }
        else if($('#auth .regRePassword').val().length <= 0) {
            return $('#auth .error').text('Введите повтор пароля').css({color: 'red'});
        }
        if($('#auth .regPassword').val() !== $('#auth .regRePassword').val()) {
            return $('#auth .error').text('Пароли не совпадают').css({color: 'red'});
        }
        else {
            $('#auth .error').text('');
            axios.post('/auth/registration', {
                username,
                password
            })
            .then(response => {
                $('#auth .error').text(response.data.message).css({color: 'red'});
                $('#auth .error').text() === 'Пользователь создан' ? $('.authWrap').fadeOut() && $('body').css({'overflow': 'auto'}) && $('#auth .error').css({color: 'green'}) && token(response.data.token) : $('#auth .error').css({color: 'red'});
            })
            .catch(err => {
                if(err) throw err;
            });
        }
    }

    const toggle = () => {
        $('#auth form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('#auth input').val('');
        $('#auth .error').text('');
    }

    return (
        <div id='auth'>
            <div className="login-page">
                <div className="form">
                    <div className="error"></div>
                    <form className="register-form">
                        <input type="text" name="login" placeholder="Имя пользователя" className="regLogin" onChange={(e) => {setUserName(e.target.value)}} />
                        <input type="password" name="password" placeholder="Пароль" className="regPassword" onChange={(e) => {setPassword(e.target.value)}} />
                        <input type="password" name="rePassword" placeholder="Повтор пароля" className="regRePassword" />
                        <button type="submit" name="regBtn" onClick={regBtn}>создать</button>
                        <p className="message">Уже зарегистрированы? <span onClick={toggle}>Войти</span></p>
                    </form>
                    <form className="login-form">
                        <input type="text" name="login" placeholder="Имя пользователя" className="logLogin" onChange={(e) => {setUserName(e.target.value)}} />
                        <input type="password" name="password" placeholder="Пароль" className="logPassword" onChange={(e) => {setPassword(e.target.value)}} />
                        <button type="submit" name="logBtn" onClick={logBtn}>войти</button>
                        <p className="message">Ещё не зарегистрировались? <span onClick={toggle}>Создать аккаунт</span></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;