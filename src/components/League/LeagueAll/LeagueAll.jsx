import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './LeagueAll.css';
import LazyLoad from 'react-lazy-load';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';

const LeagueAll = (props) => {
    const[leagues, setLeagues] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        setLeagues(props.leagues.map((e, i) => {
            return <Link key={'league' + i} to={`/league/${e.id}`}>
                        <div>
                            <LazyLoad offset={800}>
                                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.title}><img loading="lazy" src={e.img} alt={e.name} /></Tippy>
                            </LazyLoad>
                            <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.name}</span>
                        </div>
                    </Link>
        }));
    }, [props.leagues]);
    

    return (
        <div id='leagueAll'>
            <Helmet>
                <title>Все турниры - читай новости, изучай расписание игр, результаты, турнирную таблицу и много чего</title>
                <meta name="description" content="Все турниры на одной странице - изучай последние новости, результаты и многое другое на нашем сайте." />
                <meta name="keywords" content="все лиги, все турниры, футбольные турниры, футбольные лиги, результаты матчей, турнирная таблица, известные футбольные турниры, апл, ла лига, рпл, бундеслига, серия а, лига 1, уефа" />
            </Helmet>
            <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Все турниры</h1>
            {leagues}
        </div>
    );
};

export default LeagueAll;