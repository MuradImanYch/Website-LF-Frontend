import React, { useEffect, useState } from 'react';
import './Settings.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import $ from 'jquery';

const Settings = () => {
    const [isDarkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkTheme')));

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);

        if(!isDarkMode) {
            localStorage.getItem('darkTheme') && localStorage.setItem('darkTheme', true);
        }
        else if(isDarkMode) {
            localStorage.getItem('darkTheme') && localStorage.setItem('darkTheme', false);
        }
    };

    useEffect(() => {
        if(localStorage.getItem('darkTheme') === 'true') {
            $('#settings .item .darkThemeBtn .round').animate({left: '34px'});
        }
        else {
            $('#settings .item .darkThemeBtn .round').animate({left: '2px'});
        }
    }, [isDarkMode]);

    useEffect(() => {
        if(localStorage.getItem('darkTheme') === 'true') {
            $('body').css({background: '#222'});
            $('span:not(.hotBoard .liveWrap span)').css({color: '#fff'});
            $('#settings .item .darkThemeBtn').css({background: '#4CD964'});
            $('#profile .subMenu li a span').css({color: '#f02d54'});
            $('.sectionName').css({color: '#fff'});
            $('.pageName').css({color: '#fff'});
            $('#expectedMatches .wrap span').css({color: '#fff'});
        }
        else {
            $('body').css({background: '#fff'});
            $('span:not(.hotBoard .liveWrap span)').css({color: '#000'});
            $('#settings .item .darkThemeBtn').css({background: '#fff'});
            $('#profile .subMenu li a span').css({color: '#f02d54'});
            $('.sectionName').css({color: '#000'});
            $('.pageName').css({color: '#000'});
            $('#expectedMatches .wrap span').css({color: '#000'});
        }
    }, [isDarkMode]);

    return (
        <div id='settings'>
            <div className='item'>
                <span className='title'>Тёмная тема:</span>
                <div className="darkThemeBtn" onClick={toggleDarkMode}>
                    <div className="round">
                    <DarkModeSwitch
                style={{color: '#fff'}}
                    checked={isDarkMode}
                    size={15}
                />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;