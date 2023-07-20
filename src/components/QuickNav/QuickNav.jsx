import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './QuickNav.css';
import $ from 'jquery';

const QuickNav = () => {
    const location = useLocation();
    const[quickNav, setQuickNav] = useState();
    const[qckNavToggle, setQckNavToggle] = useState(true);

    const qckNav = (e) => {
        $('hr').css({background: 'transparent'});
        $(e.target).prev('hr').css({background: 'rgb(204, 135, 45)'});
        $(e.target).next('hr').css({background: 'rgb(204, 135, 45)'});
        setQckNavToggle(true);
        $('#quickNav ul').slideUp();
        $('#quickNav div:first-child').css({transform: 'rotate(0deg)'}).css({color: '#fff'})
    }

    const qckNavToggleFunc = () => {
        setQckNavToggle(!qckNavToggle);
        $('#quickNav ul').slideToggle();
        qckNavToggle ? $('#quickNav div:first-child').css({transform: 'rotate(180deg)'}).css({color: 'rgb(204, 135, 45)'}) : $('#quickNav div:first-child').css({transform: 'rotate(0deg)'}).css({color: '#fff'});
    }

    if($(window).width() < 1024) {
        $(window).scroll(function() {
            let footer = $('footer');
            let quickNav = $('#quickNav');
            let footerPosition = footer.offset().top + footer.outerHeight();
            let windowHeight = $(window).scrollTop() + $(window).height() + 200;
          
            if (footerPosition < windowHeight) {
                quickNav.css('display', 'none');
            } else {
                quickNav.css('display', 'block');
            }
          });
    }

    useEffect(() => {
        if(location.pathname === '/') {
            setQuickNav(
                <ul>
                    <li><hr /><a href="#onlineFav" onClick={qckNav}>Онлайн матчи избранных команд</a><hr /></li>
                    <li><hr /><a href="#fixturesFav" onClick={qckNav}>Расписание матчей избранных команд</a><hr /></li>
                    <li><hr /><a href="#endedQckNav" onClick={qckNav}>Завершенные матчи</a><hr /></li>
                    <li><hr /><a href="#oddsQckNav" onClick={qckNav}>Котировки на матчи</a><hr /></li>
                    <li><hr /><a href="#transferListQckNav" onClick={qckNav}>Список популярных трансферов</a><hr /></li>
                    <li><hr /><a href="#broadcastsQckNav" onClick={qckNav}>Трансляция матчей</a><hr /></li>
                    <li><hr /><a href="#videoQckNav" onClick={qckNav}>Видео</a><hr /></li>
                    <li><hr /><a href="#blogsQckNav" onClick={qckNav}>Блоги</a><hr /></li>
                    <li><hr /><a href="#standingsQckNav" onClick={qckNav}>Турнирная таблица - Чемпионаты</a><hr /></li>
                    <li><hr /><a href="#tvScheduleQckNav" onClick={qckNav}>ТВ расписание</a><hr /></li>
                    <li><hr /><a href="#standings4QckNav" onClick={qckNav}>Турнирная таблица - Лига чемпионов</a><hr /></li>
                    <li><hr /><a href="#standings5QckNav" onClick={qckNav}>Турнирная таблица - Лига европы</a><hr /></li>
                    <li><hr /><a href="#standings6QckNav" onClick={qckNav}>Турнирная таблица - Лига конференции</a><hr /></li>
                    <li><hr /><a href="#topScoresQckNav" onClick={qckNav}>Бомбардиры - Чемпионаты</a><hr /></li>
                    <li><hr /><a href="#standings2QckNav" onClick={qckNav}>Турнирная таблица - Лига наций</a><hr /></li>
                    <li><hr /><a href="#standings3QckNav" onClick={qckNav}>Турнирная таблица - Европейская квалификация</a><hr /></li>
                    <li><hr /><a href="#topScores2QckNav" onClick={qckNav}>Бомбардиры - Еврокубки</a><hr /></li>
                    <li><hr /><a href="#topScores3QckNav" onClick={qckNav}>Бомбардиры - Турниры сборных</a><hr /></li>
                    <li><hr /><a href="#uefaCountryRankQckNav" onClick={qckNav}>Рейтинг ассоциации УЕФА</a><hr /></li>
                    <li><hr /><a href="#fifaRankingQckNav" onClick={qckNav}>Рейтинг ассоциации ФИФА</a><hr /></li>
                </ul>
            );
        }
        else {
            setQuickNav(null);
        }
    }, [location]);
    
    return (
        <div>
            {quickNav !== null ? <div id='quickNav'>
                <div onClick={qckNavToggleFunc}>▲</div>
                {quickNav}
            </div> : null}
        </div>
    );
};

export default QuickNav;