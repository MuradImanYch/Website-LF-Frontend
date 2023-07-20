import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './LeagueAll.css';
import LazyLoad from 'react-lazy-load';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Helmet from 'react-helmet';

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
                                <Tippy content={e.title}><img loading="lazy" src={e.img} alt={e.name} /></Tippy>
                            </LazyLoad>
                            <span>{e.name}</span>
                        </div>
                    </Link>
        }));
    }, [props.leagues]);
    

    return (
        <div id='leagueAll'>
            <Helmet>
                <title>Все турниры - заходи на любой турнир и смотри новости, расписание, результаты, турнирную таблицу и много чего - на Legendary Football</title>
                <meta name="description" content="Заходи на любой футбольный турнир и изучай последние новости, результаты и многое другое на нашем сайте. У нас вы найдете все необходимые материалы об известных турнирах, футбольном чемпионате. Весь футбольный мир у нас." />
                <meta name="keywords" content="все лиги, все турниры, результаты, турнирная таблица, футбол, известные футбольные турниры, апл, ла лига, рпл, бундеслига, серия а, лига 1, уефа" />
            </Helmet>
            <h1 className="pageName">Все турниры</h1>
            {leagues}
        </div>
    );
};

export default LeagueAll;