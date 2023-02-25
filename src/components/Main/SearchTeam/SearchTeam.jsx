import React, { useEffect, useState } from 'react';
import './SearchTeam.css';
import axios from 'axios';
import $ from 'jquery';

const SearchTeam = () => {
    const[searchingTeams, setSearchingTeams] = useState([]);
    const[teamArr, setTeamArr] = useState([]);
    const[myTeams, setMyTeams] = useState();

    if(!localStorage.getItem('teamArr')) {
        localStorage.setItem('teamArr', JSON.stringify([]))
    }

    const searchTeam = () => {        
        axios.post('https://legfootball.herokuapp.com/searchTeam', {
            team: document.querySelector('#searchTeam input').value        
        })
        .then(response => {
            setSearchingTeams(response.data);
            $('#searchTeam .finded').hide();
            $('#searchTeam .finded').slideDown().css({display: 'flex'});
        })
        .catch(err => {
            console.log(err);
        });
    }

    const addFavorite = (e) => {
        setTeamArr([...JSON.parse(localStorage.getItem('teamArr')), {
            name: $(e.target).prev().text(), 
            img: $(e.target).prev().prev().attr('src')
        }]);
    }

    useEffect(() => {
        if(teamArr.length > 0) {
            localStorage.setItem('teamArr', JSON.stringify(teamArr));
        }
        
        setMyTeams(JSON.parse(localStorage.getItem('teamArr')) && JSON.parse(localStorage.getItem('teamArr')).reverse().map((e, i) => {
            return <div key={'myTeams' + e.name + i}>
                        <img src={e.img} alt={e.name} />
                        <span>{e.name}</span>
                        <button>⨯</button>
                    </div>
        }));

        /* setInterval(() => {
            axios.post('https://legfootball.herokuapp.com/favoriteTeams', JSON.parse(localStorage.getItem('teamArr')));
        }, 10000); */
    }, [teamArr]);

    return (
        <div id='searchTeam'>
            <div className="wrap">
                <p>Добавить команду в избранные</p>
                <form>
                    <input onChange={searchTeam} type='text' placeholder='Введите название команды' />
                </form>
                <div className="finded">
                    {searchingTeams.map((e) => {
                        return <div key={'finded' + e.name}>
                                    <img src={e.img[1]} alt={e.name} />
                                    <span>{e.name}</span>
                                    <button onClick={addFavorite}>+</button>
                                </div>
                    })}
                </div>
            </div>
            <div className="selected">
                <p>Избранные команды:</p>
                {myTeams}
            </div>
        </div>
    );
};

export default SearchTeam;