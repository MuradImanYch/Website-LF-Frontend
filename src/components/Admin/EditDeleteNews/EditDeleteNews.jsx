import React from 'react';
import { useState, useEffect } from 'react';
import './EditDeleteNews.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditDeleteNews = () => {
    const[news, setNews] = useState();
    const[delId, setDelId] = useState();
    const[league, setLeague] = useState();
    const[title, setTitle] = useState('wqdwq');
    const[img, setImg] = useState('');
    const[content, setContent] = useState('');
    const[editId, setEditId] = useState();

    const rejectEdit = () => {
        $('.editPopup').fadeOut();
        $('body').css({overflow: "auto"});
        setEditId('');
    }
    const acceptEdit = (e) => {
        e.preventDefault();
        
        if(league === 'none') {
            alert('Выберите лигу');
        }
        else if(title === '') {
            alert('Введите заголовок');
        }
        else if(img === '') {
            alert('Вставьте ссылку на изображение');
        }
        else if(content === '') {
            alert('Введите контент для новости');
        }
        else {
            $('.editPopup').fadeOut();
            $('body').css({overflow: "auto"});
            
            axios.post('/editNews', {id: editId, league, title, img, content})
            .catch(err => {
                console.log(err);
            });
            setEditId('');
        }
    }

    useEffect(() => { 
        axios.get('/myNews')
        .then(response => {
            setNews(response.data && response.data.reverse().map((e) => {
                let date = new Date(e.date);
                let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth()) : String(date.getMonth());
                let year = date.getFullYear();
                let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());

                const deleteNews = (e) => {
                    $('#delConfirm').fadeIn();
                    setDelId(e.target.id.match(/\d+/)[0]);
                    $('body').css({overflow: "hidden"});
                }
                const acceptDel = () => {
                    $('#delConfirm').fadeOut();
                    $('body').css({overflow: "auto"});

                    axios.post('/delNews', {id: delId})
                    .catch(err => {
                        if(err) throw err;
                    });

                    $('#editDeleteNews .newsCart .editDelWrap button').attr('disabled', 'disabled');
                    $('#editDeleteNews .newsCart .editDelWrap button').css({background: 'silver'});
                    setDelId('');

                    setTimeout(() => {
                        $('#editDeleteNews .newsCart .editDelWrap button').removeAttr('disabled');
                        $('#editDeleteNews .newsCart .editDelWrap button').css({background: '#fff'});
                    }, 10000);
                }
                const rejectDel = () => {
                    $('#delConfirm').fadeOut();
                    $('body').css({overflow: "auto"});
                    setDelId('');
                }

                return  <div key={'key' + e.id} className="newsCart" id={'id' + e.id}>
                            <Link to={'/news/' + e.id}>
                                <div className='hover'>
                                    <img src={e.img} alt="newsimg" />
                                    <p>{e.title}</p>
                                </div>
                            </Link>
                            <div className='editDelWrap'>
                                <button id={'edit' + e.id} title='Редактировать' onClick={editNews}>✎</button>
                                <button id={'del' + e.id} title='Удалить' onClick={deleteNews}>🗑</button>
                            </div>
                            <span className='newsId'>ID: {e.id}</span>
                            <span className='newsDate'>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>

                            <div id="delConfirm">
                                <div id="forCenter">
                                    <p>Удалить эту новость?</p>
                                    <div id="btnWrap">
                                        <button onClick={acceptDel}>ДА</button>
                                        <button onClick={rejectDel}>НЕТ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
            })); 
        })
        .catch(err => {
            console.log(err);
        });

        const editNews = (e) => {
            $('.editPopup').fadeIn();
            $('body').css({overflow: "hidden"});
    
            axios.post('/findEditedNews', {id: e.target.id.match(/\d+/)[0]})
            .then(response => {
                setLeague(response.data[0].league);
                setTitle(response.data[0].title);
                setImg(response.data[0].img);
                setContent(response.data[0].content);
                setEditId(e.target.id.match(/\d+/)[0]);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [news, delId, league, title, img, content, editId]);  

    return (
        <div id="editDeleteNews">
            {news}
            <div className="editPopup">
                                <p className="popupTitle">Редактировать</p>

                                <div className="container">
                                    <form action='/editNews' method='POST'>
                                        <label htmlFor="editNewsLeagues">Лига:</label>
                                        <select onChange={(e) => {
                                            setLeague(e.target.value);
                                        }} value={league} name="editNewsLeagues" id="editNewsLeagues">
                                            <option value="none" disabled>Не выбрана</option>
                                            <option value="rpl">РПЛ</option>
                                            <option value="epl">АПЛ</option>
                                            <option value="laliga">Ла Лига</option>
                                            <option value="seriea">Серия А</option>
                                            <option value="bundesliga">Бундеслига</option>
                                            <option value="ligue1">Лига 1</option>
                                            <option value="ucl">ЛЧ</option>
                                            <option value="uel">ЛЕ</option>
                                            <option value="uecl">ЛК</option>
                                            <option value="wc">ЧМ</option>
                                            <option value="ec">ЧЕ</option>
                                        </select>
                                        <label htmlFor="editNewsTitle">Заголовок:</label>
                                        <input onChange={(e) => {
                                            setTitle(e.target.value);
                                        }} type="text" id='editNewsTitle' name='editNewsTitle' value={title} />
                                        <label htmlFor="editImg">Изображение:</label>
                                        <input onChange={(e) => {
                                            setImg(e.target.value);
                                        }} type="text" name='editImg' id='editImg' value={img} />
                                        <label id='editNewsContentLabel' htmlFor="editNewsContent">Контент:</label>
                                        <CKEditor id="editNewsContent" data={content} editor={ClassicEditor} onChange={(e, editor) => {
                                            setContent(editor.getData());
                                        }} />

                                    </form>
                                </div>

                                <button title='Подтвердить' type='submit' className='acceptBtn' onClick={acceptEdit}>✓</button>
                                <button title='Отклонить' type='submit' className='rejectBtn' onClick={rejectEdit}>⨯</button>
                            </div>
        </div>
    );
};

export default EditDeleteNews;