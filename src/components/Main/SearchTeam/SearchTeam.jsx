import React, { useEffect, useState } from 'react';
import './SearchTeam.css';
import axios from 'axios';
import $ from 'jquery';
import cookies from 'js-cookie';

const SearchTeam = () => {
    const[searchingTeams, setSearchingTeams] = useState([]);
    const[teamArr, setTeamArr] = useState([]);
    const[myTeams, setMyTeams] = useState();

    const uniqueIds = [];
                  
    const unique = teamArr.filter(element => { // del duplicate obj props/teams
        const isDuplicate = uniqueIds.includes(element.name);
        if (!isDuplicate) {
            uniqueIds.push(element.name);
            return true;
        }
                  
        return false;
    });

    useEffect(() => {
        axios.post('/profile/getFav', {
            token: cookies.get('auth')
        })
        .then(response => {
            localStorage.setItem('teamArr', JSON.stringify(response.data));
        })
        .catch(err => {
            console.log(err);
        });

        setInterval(() => {
            setMyTeams(JSON.parse(localStorage.getItem('teamArr')) && JSON.parse(localStorage.getItem('teamArr')).reverse().map((e, i) => {
                return <div key={'myTeams' + e.name + i}>
                            <img src={e.img} alt={e.name} />
                            <span>{e.name}</span>
                            <button onClick={delFavorite}>⨯</button>
                        </div>
            }));
        }, 1000);

        if(unique.length > 0) {
            localStorage.setItem('teamArr', JSON.stringify(unique));
        }

        axios.post('/profile/setFav', {
            token: cookies.get('auth'),
            team: localStorage.getItem('teamArr')
        });
    }, [teamArr]);

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
        setTeamArr([...JSON.parse(localStorage.getItem('teamArr')), {
            name: $(e.target).prev().text(), 
            img: $(e.target).prev().prev().attr('src')
        }]);
    }

    const delFavorite = (e) => {
        let deletedUpd = JSON.parse(localStorage.getItem('teamArr'));
        deletedUpd.splice(JSON.parse(localStorage.getItem('teamArr')).map((e) => {return e.name}).indexOf($(e.target).prev().text()), 1);
        setTeamArr(deletedUpd);

        localStorage.setItem('teamArr', JSON.stringify(deletedUpd));
    }

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