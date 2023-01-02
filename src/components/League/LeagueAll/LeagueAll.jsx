import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './LeagueAll.css';

const LeagueAll = (props) => {
    const[leagues, setLeagues] = useState();

    useEffect(() => {
        setLeagues(props.leagues.map((e, i) => {
            return <Link key={'league' + i} to={`/league/${e.id}`}>
                        <div>
                            <img src={e.img} alt={e.name} />
                            <span>{e.name}</span>
                        </div>
                    </Link>
        }));
    }, [props.leagues]);
    

    return (
        <div id='leagueAll'>
            <h1 className="pageName">Все турниры</h1>
            {leagues}
        </div>
    );
};

export default LeagueAll;