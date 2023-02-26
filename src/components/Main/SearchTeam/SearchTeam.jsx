import React, { useEffect, useState } from 'react';
import './SearchTeam.css';
import axios from 'axios';
import $ from 'jquery';

const SearchTeam = () => {
    const[searchingTeams, setSearchingTeams] = useState([]);
    const[teamArr, setTeamArr] = useState([]);
    const[myTeams, setMyTeams] = useState();
    const[deleted, setDeleted] = useState([]);

    if(!localStorage.getItem('teamArr')) {
        localStorage.setItem('teamArr', JSON.stringify([]))
    }

    const searchTeam = () => {        
        axios.post('/searchTeam', {
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
        setTimeout(() => {
            $('#searchTeam .selected div').eq(0).hide();
            $('#searchTeam .selected div').eq(0).fadeIn('slow');
        }, 1);
        
        setTeamArr([...JSON.parse(localStorage.getItem('teamArr')), {
            name: $(e.target).prev().text(), 
            img: $(e.target).prev().prev().attr('src')
        }]);
    }

    useEffect(() => {
        const uniqueIds = [];
                  
        const unique = teamArr.filter(element => { // del duplicate obj props/teams
            const isDuplicate = uniqueIds.includes(element.name);
            if (!isDuplicate) {
                uniqueIds.push(element.name);
                return true;
            }
                  
            return false;
        });

        if(unique.length > 0) {
            localStorage.setItem('teamArr', JSON.stringify(unique));
        }
        
        setMyTeams(JSON.parse(localStorage.getItem('teamArr')) && JSON.parse(localStorage.getItem('teamArr')).reverse().map((e, i) => {
            return <div key={'myTeams' + e.name + i}>
                        <img src={e.img} alt={e.name} />
                        <span>{e.name}</span>
                        <button onClick={delFavorite}>⨯</button>
                    </div>
        }));

        /* setInterval(() => {
            axios.post('/favoriteTeams', JSON.parse(localStorage.getItem('teamArr')));
        }, 10000); */
    }, [teamArr]);

    const delFavorite = (e) => {
        let deletedUpd = JSON.parse(localStorage.getItem('teamArr'));
        deletedUpd.splice(JSON.parse(localStorage.getItem('teamArr')).map((e) => {return e.name}).indexOf($(e.target).prev().text()), 1);
        setTeamArr(deletedUpd);
        localStorage.setItem('teamArr', JSON.stringify(deletedUpd));
    }

    
    /* useEffect(() => {
        setTeamArr(JSON.parse(localStorage.getItem('teamArr')));
    }, []); */

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