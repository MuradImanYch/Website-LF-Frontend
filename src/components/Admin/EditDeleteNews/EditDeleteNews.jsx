import React from 'react';
import { useState, useEffect } from 'react';
import './EditDeleteNews.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import LazyLoad from 'react-lazy-load';

const EditDeleteNews = () => {
    const[news, setNews] = useState();
    const[delId, setDelId] = useState('');
    const[category, setCategory] = useState();
    const[title, setTitle] = useState('wqdwq');
    const[img, setImg] = useState('');
    const[content, setContent] = useState('');
    const[editId, setEditId] = useState('');

    const rejectEdit = () => {
        setEditId('');
        setImg('');
        setTitle('');
        setContent('');
        setCategory('none');
        $('.editPopup').fadeOut();
        $('body').css({overflow: "auto"});
    }
    const acceptEdit = (e) => {
        e.preventDefault();
        
        if(category === 'none') {
            alert('Выберите категорию');
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
            setEditId('');
            setImg('');
            setTitle('');
            setContent('');
            setCategory('none');

            $('.editPopup').fadeOut();
            $('body').css({overflow: "auto"});
            $('#editDeleteNews .newsCart .editDelWrap button').attr('disabled', 'disabled');
            $('#editDeleteNews .newsCart .editDelWrap button').css({background: 'silver'});
            
            axios.post('https://legfootball.herokuapp.com/admin/editNews', {id: editId && editId, category, title, img, content})
            .catch(err => {
                console.log(err);
            });

            setTimeout(() => {
                $('#editDeleteNews .newsCart .editDelWrap button').removeAttr('disabled');
                $('#editDeleteNews .newsCart .editDelWrap button').css({background: '#fff'});
            }, 10000);
        }
    }

    useEffect(() => { 
        const fetchData = async () => {
            await axios.get('https://legfootball.herokuapp.com/news/allNews')
            .then(response => {
                setNews(response.data && response.data.reverse().map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                    let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());

                    const deleteNews = (e) => {
                        setDelId(e.target.id.match(/\d+/)[0]);
                        $('#delConfirm').fadeIn();
                        $('body').css({overflow: "hidden"});
                    }
                    const acceptDel = () => {
                        setDelId('');
                        $('#delConfirm').fadeOut();
                        $('body').css({overflow: "auto"});

                        axios.post('https://legfootball.herokuapp.com/admin/delNews', {id: delId && delId})
                        .catch(err => {
                            if(err) throw err;
                        });

                        $('#editDeleteNews .newsCart .editDelWrap button').attr('disabled', 'disabled');
                        $('#editDeleteNews .newsCart .editDelWrap button').css({background: 'silver'});

                        setTimeout(() => {
                            $('#editDeleteNews .newsCart .editDelWrap button').removeAttr('disabled');
                            $('#editDeleteNews .newsCart .editDelWrap button').css({background: '#fff'});
                        }, 10000);
                    }
                    const rejectDel = () => {
                        setDelId('');
                        $('#delConfirm').fadeOut();
                        $('body').css({overflow: "auto"});
                    }

                    return  <div key={'news' + e.id} className="newsCart">
                                <Link to={'/news/read/' + e.id}>
                                    <div className='hover'>
                                        <LazyLoad offset={800}>
                                            <img src={e.img} alt="newsimg" />
                                        </LazyLoad>
                                        <p>{e.title}</p>
                                    </div>
                                </Link>
                                <div className='editDelWrap'>
                                    <button id={'edit' + e.id} title='Редактировать' onClick={editNews}>✎</button>
                                    <button id={'del' + e.id} title='Удалить' onClick={deleteNews}>🗑</button>
                                </div>
                                <div className="bottom">
                                    <span className='newsId'>ID: {e.id}</span>
                                    <span className='newsDate'>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                                    <span className='newsCategory'>{`#${e.category}`}</span>
                                </div>

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
        }

        fetchData();

        const editNews = (e) => {
            $('.editPopup').fadeIn();
            $('body').css({overflow: "hidden"});
    
            axios.post('https://legfootball.herokuapp.com/admin/findEditedNews', {id: e.target.id.match(/\d+/)[0]})
            .then(response => {
                setEditId(e.target.id.match(/\d+/)[0]);
                setCategory(response.data[0].category);
                setTitle(response.data[0].title);
                setImg(response.data[0].img);
                setContent(response.data[0].content);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [delId, category, title, img, content, editId]);  // <-- deleted [news]

    return (
        <div id="editDeleteNews">
            {news}
            <div className="editPopup">
                                <p className="popupTitle">Редактировать</p>

                                <div className="container">
                                    <form>
                                        <label htmlFor="editNewsCategory">Категория:</label>
                                        <select onChange={(e) => {
                                            setCategory(e.target.value);
                                        }} value={category} name="editNewsCategory" id="editNewsCategory">
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
                                            <option value="unl">ЛН</option>
                                            <option value="wc">ЧМ</option>
                                            <option value="ec">ЧЕ</option>
                                            <option value="other">Разное</option>
                                            <option value="blog">Блоги</option>
                                            <option value="video">Видео</option>
                                            <option value="transfer">Трансферы</option>
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