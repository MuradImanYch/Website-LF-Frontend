import React, { useEffect, useState } from 'react';
import './TopScores3.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const TopScores3 = () => {
    let table1 = 0;
    let table2 = 100;
    let table3 = 200;
    let leagId = [{year: 2020, id: 4}, {year: 2018, id: 32}, {year: 2022, id: 5}];
    let selected = [];
    let rand = Math.floor(Math.random() * leagId.length); // rand num | push & splice
    selected.push(leagId[rand]);
    leagId.splice(rand, 1);
    let rand2 = Math.floor(Math.random() * leagId.length);
    selected.push(leagId[rand2]);
    leagId.splice(rand2, 1);
    let rand3 = Math.floor(Math.random() * leagId.length);
    selected.push(leagId[rand3]);
    leagId.splice(rand3, 1);
    let obj = [];
    const[table, setTable] = useState();

    const next = () => { // next table slider
        $('#topScores3 .tableWrap .table').eq(0).animate({'left': `${table1-=100}%`});
        $('#topScores3 .tableWrap .table').eq(1).animate({'left': `${table2-=100}%`});
        $('#topScores3 .tableWrap .table').eq(2).animate({'left': `${table3-=100}%`});
        if (table3 === -100) {
            table1 += 100;
            table2 += 100;
            table3 += 100;
            $('#topScores3 .tableWrap .table').eq(0).animate({'left': `${table1}%`});
            $('#topScores3 .tableWrap .table').eq(1).animate({'left': `${table2}%`});
            $('#topScores3 .tableWrap .table').eq(2).animate({'left': `${table3}%`});
        }
    }
    const prev = () => { // prev table slider
        $('#topScores3 .tableWrap .table').eq(0).animate({'left': `${table1+=100}%`});
        $('#topScores3 .tableWrap .table').eq(1).animate({'left': `${table2+=100}%`});
        $('#topScores3 .tableWrap .table').eq(2).animate({'left': `${table3+=100}%`});
        if (table1 === 100) {
            table1 -= 100;
            table2 -= 100;
            table3 -= 100;
            $('#topScores3 .tableWrap .table').eq(0).animate({'left': `${table1}%`});
            $('#topScores3 .tableWrap .table').eq(1).animate({'left': `${table2}%`});
            $('#topScores3 .tableWrap .table').eq(2).animate({'left': `${table3}%`});
        }
    }

    /* useEffect(() => {
        selected && selected.map((e) => {
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${e.id}&season=${e.year}`,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                    "x-rapidapi-key": "64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5"
                }
            };
            $.ajax(settings).done(function (response) {
                obj.push(response.response);
                setTable(obj && obj.map((id) => {
                    return <div className="table" key={'id' + id[0].statistics[0].league.id} id={'id' + id[0].statistics[0].league.id}>
                        <img src={id[0].statistics[0].league.logo} alt={id[0].statistics[0].league.name} title={id[0].statistics[0].league.name} />
                        <div className="col">
                            <div className="head">
                                <span>#</span>
                                <span>Игрок</span>
                                <span>Команда</span>
                                <span>Г</span>
                                <span>А</span>
                            </div>
                        </div>
                        {
                            id && id.map((e, indx) => {
                                return <div className="col" key={indx}>
                                    <div className="place">{indx+1}.</div>
                                    <div className='photoName'>
                                        <img src={e.player.photo} alt="img" />
                                        <span>{e.player.firstname[0] + '.' + ' ' + e.player.lastname}</span>
                                    </div>
                                    <img title={e.statistics[0].team.name} src={e.statistics[0].team.logo} className='team' />
                                    <span className="goals">{e.statistics[0].goals.total}</span>
                                    <span className="assists">{e.statistics[0].goals.assists}</span>
                                </div>
                            })
                        }
                    
                        <Link to="">Подробнее...</Link>
                    </div>
                }));
            });
        });
    }, [obj]); */

    return (
        <div id="topScores3">
            <section>
                <h3 className="sectionName">Бомбардиры - Турниры сборных</h3>
                <div className="tableWrap">
                    {table}
                    <div className="arrowWrap">
                        <i onClick={prev} className="fas fa-chevron-left"></i>
                        <i onClick={next} className="fas fa-chevron-right"></i>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TopScores3;