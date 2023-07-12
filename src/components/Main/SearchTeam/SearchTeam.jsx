import React, { useEffect, useState } from 'react';
import './SearchTeam.css';
import axios from 'axios';
import $ from 'jquery';
import cookies from 'js-cookie';

import search from '../../../assets/ico/search.png';
import loadSpiner from '../../../assets/ico/loadSpiner.gif';

const SearchTeam = () => {
    const[searchingTeams, setSearchingTeams] = useState([]);
    const[teamArr, setTeamArr] = useState([]);
    const[myTeams, setMyTeams] = useState();
    const[searchLoading, setSearchLoading] = useState(false);

    const uniqueIds = [];
                  
    const unique = teamArr.filter(element => { // del duplicate obj props/teams
        const isDuplicate = uniqueIds.includes(element.name);
        if (!isDuplicate) {
            uniqueIds.push(element.name);
            return true;
        }
                  
        return false;
    });

    const addFav = (e) => {
        setTeamArr([...JSON.parse(localStorage.getItem('teamArr')), {
            name: $(e.target).prev().text(), 
            img: $(e.target).prev().prev().attr('src')
        }]);

        $('#searchTeam .add, #searchTeam .del').attr('disabled', 'disabled');
        setTimeout(() => {
            $('#searchTeam .add, #searchTeam .del').removeAttr('disabled');
        }, 5000);
    }

    const delFavorite = (e) => {
        let deletedUpd = JSON.parse(localStorage.getItem('teamArr'));
        if(JSON.parse(localStorage.getItem('teamArr')).length === 1) {
            localStorage.setItem('teamArr', '[]');
        }
        else {
            deletedUpd.splice(JSON.parse(localStorage.getItem('teamArr')).map((e) => {return e.name}).indexOf($(e.target).prev().text()), 1);
            setTeamArr(deletedUpd);
        }

        $('#searchTeam .add, #searchTeam .del').attr('disabled', 'disabled');
        setTimeout(() => {
            $('#searchTeam .add, #searchTeam .del').removeAttr('disabled');
        }, 5000);
        axios.post('/profile/setFav', {
            token: cookies.get('auth'),
            team: localStorage.getItem('teamArr')
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        setInterval(() => {
            setMyTeams(JSON.parse(localStorage.getItem('teamArr')) && JSON.parse(localStorage.getItem('teamArr')).reverse().map((e, i) => {
                return <div key={'myTeams' + e.name + i}>
                            <img src={e.img} alt={e.name} />
                            <span>{e.name}</span>
                            <button className='del' onClick={delFavorite}>⨯</button>
                        </div>
            }));
        }, 1000);

        if(unique.length > 0) {
            localStorage.setItem('teamArr', JSON.stringify(unique));

            axios.post('/profile/setFav', {
                token: cookies.get('auth'),
                team: localStorage.getItem('teamArr')
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [teamArr]);

    const searchTeam = (e) => {        
        e.preventDefault();
        setSearchLoading(true);

        axios.post('/searchTeam', {
            team: document.querySelector('#searchTeam input').value        
        })
        .then(response => {
            setSearchingTeams(response.data);
            setSearchLoading(false);
            $('#searchTeam .finded').hide();
            $('#searchTeam .finded').slideDown().css({display: 'flex'});
        })
        .catch(err => {
            console.log(err);
            setSearchLoading(false);
        });
    }

    return (
        <div id='searchTeam'>
            <div className="wrap">
                <p>Добавить команду в избранные</p>
                <form>
                    <input type='text' placeholder='Введите название команды' />
                    {!searchLoading ? <button onClick={searchTeam}><img src={search} alt="поиск" /></button> : <button onClick={(e) => {e.preventDefault()}}><img src={loadSpiner} alt="загрузка" /></button>}
                </form>
                <div className="finded">
                    {searchingTeams.map((e) => {
                        return <div key={'finded' + e.name}>
                                    <img src={e.img[1]} alt={e.name} />
                                    <span>{e.name}</span>
                                    <button className='add' onClick={addFav}>+</button>
                                </div>
                    })}
                </div>
            </div>
            <div className="selected">
                <p>Избранные команды:</p>
                {myTeams && myTeams.length > 0 ? myTeams : <div className='noData'>Данных нет</div>}
            </div>
        </div>
    );
};

export default SearchTeam;