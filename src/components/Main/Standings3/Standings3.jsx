import React, { useEffect, useState } from 'react';
import './Standings3.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const Standings3 = () => {
    let table1 = 0;
    let table2 = 100;
    let table3 = 200;
    let leagId = [];
    let selected = [];
    const[table, setTable] = useState();
    let season = 2020;

    const next = () => { // next table slider
        $('#standingsSlider3 .tableWrap .table').eq(0).animate({'left': `${table1-=100}%`});
        $('#standingsSlider3 .tableWrap .table').eq(1).animate({'left': `${table2-=100}%`});
        $('#standingsSlider3 .tableWrap .table').eq(2).animate({'left': `${table3-=100}%`});
        if (table3 === -100) {
            table1 += 100;
            table2 += 100;
            table3 += 100;
            $('#standingsSlider3 .tableWrap .table').eq(0).animate({'left': `${table1}%`});
            $('#standingsSlider3 .tableWrap .table').eq(1).animate({'left': `${table2}%`});
            $('#standingsSlider3 .tableWrap .table').eq(2).animate({'left': `${table3}%`});
        }
    }
    const prev = () => { // prev table slider
        $('#standingsSlider3 .tableWrap .table').eq(0).animate({'left': `${table1+=100}%`});
        $('#standingsSlider3 .tableWrap .table').eq(1).animate({'left': `${table2+=100}%`});
        $('#standingsSlider3 .tableWrap .table').eq(2).animate({'left': `${table3+=100}%`});
        if (table1 === 100) {
            table1 -= 100;
            table2 -= 100;
            table3 -= 100;
            $('#standingsSlider3 .tableWrap .table').eq(0).animate({'left': `${table1}%`});
            $('#standingsSlider3 .tableWrap .table').eq(1).animate({'left': `${table2}%`});
            $('#standingsSlider3 .tableWrap .table').eq(2).animate({'left': `${table3}%`});
        }
    }

    /* useEffect(() => {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=32`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5"
            }
        };
        $.ajax(settings).done(function (response) {
            for(let i = 0; i <= response.response[0].league.standings.length - 1; i++) {
                leagId.push(i);
            }
            let rand = Math.floor(Math.random() * leagId.length); // rand num | push & splice
            selected.push(leagId[rand]);
            leagId.splice(rand, 1);
            let rand2 = Math.floor(Math.random() * leagId.length);
            selected.push(leagId[rand2]);
            leagId.splice(rand2, 1);
            let rand3 = Math.floor(Math.random() * leagId.length);
            selected.push(leagId[rand3]);
            leagId.splice(rand3, 1);

            setTable(selected && selected.map((index, indx) => {
                return <div className="table" key={'id' + indx} id={'id' + indx}>
                        <img src={response.response[0].league.logo} alt={response.response[0].league.name} title={response.response[0].league.name} />
                        <div className="col">
                            <div className="head">
                                <span>#</span>
                                <span>Команда</span>
                                <span>И</span>
                                <span>З : П</span>
                                <span>О</span>
                            </div>
                        </div>
                        {
                            response.response[0].league.standings[index] && response.response[0].league.standings[index].map((e, indx) => {
                                return <div className="col" key={indx}>
                                    <div title={e.description} className={`place ${e.description?.split(" ")[0]?.toLowerCase()}`}>{e.rank}</div>
                                    <div className='logoName'>
                                        <img src={e.team.logo} alt="img" />
                                        <span>{e.team.name}</span>
                                    </div>
                                    <span className='games'>{e.all.played}</span>
                                    <div className='scoredConceded'>
                                        <span>{e.all.goals.for} </span>
                                        :
                                        <span> {e.all.goals.against} </span>
                                    </div>
                                    <span className='points'>{e.points}</span>
                                </div>
                            })
                        }
                        <Link to="">Подробнее...</Link>  
                    </div> 
            }));
        });
    }, []); */

    return (
        <div id="standingsSlider3">
            <section>
                <h3 className="sectionName">Турнирная таблица - Европейская квалификация</h3>
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

export default Standings3;