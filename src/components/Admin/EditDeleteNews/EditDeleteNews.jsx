import React from 'react';
import { useState, useEffect } from 'react';
import './EditDeleteNews.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import LazyLoad from 'react-lazy-load';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

const EditDeleteNews = () => {
    const[news, setNews] = useState();
    const[delId, setDelId] = useState('');
    const[delImgPath, setDelImgPath] = useState('');
    const[category, setCategory] = useState();
    const[title, setTitle] = useState('wqdwq');
    const[img, setImg] = useState('');
    const[content, setContent] = useState('');
    const[editId, setEditId] = useState('');
    const[metaDescr, setMetaDescr] = useState('');
    const[metaKeywords, setMetaKeywords] = useState('');
    const[currentPage, setCurrentPage] = useState(1);
    const[newsCount, setNewsCount] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    const rejectEdit = () => {
        setEditId('');
        setImg('');
        setTitle('');
        setContent('');
        setCategory('none');
        $('.editPopup').fadeOut();
        $('body').css({overflow: "auto"});
        setMetaDescr('');
        setMetaKeywords('');
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
            alert('Выберите изображение или вставьте ссылку на нее');
        }
        else if(metaDescr === '') {
            alert('Введите поле для мета тега: description');
        }
        else if(metaKeywords === '') {
            alert('Введите поле для мета тега: keywords');
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
            setMetaDescr('');
            setMetaKeywords('');

            $('.editPopup').fadeOut();
            $('body').css({overflow: "auto"});
            $('#editDeleteNews .newsCart .editDelWrap button').attr('disabled', 'disabled');
            $('#editDeleteNews .newsCart .editDelWrap button').css({background: 'silver'});
            
            axios.post('/admin/editNews', {id: editId && editId, category, title, img, content, metaDescr, metaKeywords})
            .catch(err => {
                console.log(err);
            });

            setTimeout(() => {
                $('#editDeleteNews .newsCart .editDelWrap button').removeAttr('disabled');
                $('#editDeleteNews .newsCart .editDelWrap button').css({background: '#fff'});
            }, 5000);
        }
    }

    useEffect(() => { 
        const fetchData = async () => {
            await axios.get('/news/allNews')
            .then(response => {
                setNewsCount(response.data.length);
                setNews(response.data && response.data.reverse().splice(currentPage * 30 - 30, 30).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth() + 1).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                    let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());

                    const deleteNews = (e) => {
                        setDelId(e.target.id.match(/\d+/)[0]);
                        setDelImgPath($(e.target).parent().parent().find('a .hover div img').attr('src'));
                        $('#delConfirm').fadeIn();
                        $('body').css({overflow: "hidden"});
                    }
                    const acceptDel = () => {
                        setDelId('');
                        setDelImgPath('');
                        $('#delConfirm').fadeOut();
                        $('body').css({overflow: "auto"});

                        $('#news' + delId).hide('slow');

                        setTimeout(() => {
                            axios.post('/admin/delNews', {
                                id: delId && delId,
                                path: delImgPath && delImgPath
                            })
                            .catch(err => {
                                if(err) throw err;
                            });
                        }, 1000);

                        $('#editDeleteNews .newsCart .editDelWrap button').attr('disabled', 'disabled');
                        $('#editDeleteNews .newsCart .editDelWrap button').css({background: 'silver'});

                        setTimeout(() => {
                            $('#editDeleteNews .newsCart .editDelWrap button').removeAttr('disabled');
                            $('#editDeleteNews .newsCart .editDelWrap button').css({background: '#fff'});
                        }, 5000);
                    }
                    const rejectDel = () => {
                        setDelId('');
                        setDelImgPath('');
                        $('#delConfirm').fadeOut();
                        $('body').css({overflow: "auto"});
                    }

                    return  <div key={'news' + e.id} className="newsCart" id={'news' + e.id}>
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className='hover'>
                                        <LazyLoad offset={800}>
                                            <img loading="lazy" src={e.img} alt="newsimg" />
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
            document.querySelector('.fileText div input[type="text"]').setAttribute('disabled', 'disabled');
            document.querySelector('.fileText div input[type="file"]').setAttribute('disabled', 'disabled');
            $('.fileText div:last-child button').css({display: 'flex'});
    
            axios.post('/admin/findEditedNews', {id: e.target.id.match(/\d+/)[0]})
            .then(response => {
                setEditId(e.target.id.match(/\d+/)[0]);
                setCategory(response.data[0].category);
                setTitle(response.data[0].title);
                setImg(response.data[0].img);
                setContent(response.data[0].content);
                setMetaDescr(response.data[0].meta_description);
                setMetaKeywords(response.data[0].meta_keywords);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [delId, category, title, img, content, editId, currentPage]);  // <-- deleted [news]

    const selectImg = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const {data} = await axios.post('/upload', formData);
        
        setImg(data.url);
        document.querySelector('.fileText div input[type="text"]').value = data.url;
        document.querySelector('.fileText div input[type="text"]').setAttribute('disabled', 'disabled');
        document.querySelector('.fileText div input[type="file"]').setAttribute('disabled', 'disabled');
        $('.fileText div:last-child button').css({display: 'flex'});
    }

    const delImg = (e) => {
        e.preventDefault();
    
        axios.post('/delUpload', {
            path: img
        });
        setImg('');
        document.querySelector('.fileText div input[type="text"]').value = '';
        $('.fileText div:last-child button').css({display: 'none'});
        document.querySelector('.fileText div input[type="text"]').removeAttribute('disabled');
        document.querySelector('.fileText div input[type="file"]').removeAttribute('disabled');
    }

    const selectPagPage = (e) => {
        setCurrentPage($(e.target).text());
        $('.pagination a').css({background: '#fff', color: '#000'}).removeClass('selected');
        $(e.target).addClass('selected');
        $('#news .newsHr section').hide();
        $('#news .newsHr section').fadeIn();
    }

    return (
        <div id="editDeleteNews">
            {news && news.length > 0 ? news : <div className='noData'>Данных нет</div>}
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
                                            <option value="eu-qualification">Евр. квлф.</option>
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
                                        <div className='fileText'>
                    <div>
                        <input type="file" onChange={selectImg} />
                        <input placeholder='Выберите изображение либо вставьте ссылку' onChange={(e) => {
                        setImg(e.target.value);
                    }} type="text" name='editImg' id='editImg' value={img} />
                    </div>
                    <div>
                        {img && <img loading="lazy" src={img} alt="preview" />}
                        <button onClick={delImg}>⨯</button>
                    </div>
                </div>
                <label htmlFor="meta_description">Мета-тэг: description</label>
                <input value={metaDescr} onChange={(e) => {setMetaDescr(e.target.value)}} placeholder='Мета-тэг: description' type="text" id='meta_description' name='meta_description' />
                <label htmlFor="meta_keywords">Мета-тэг: keywords</label>
                <input value={metaKeywords} onChange={(e) => {setMetaKeywords(e.target.value)}} placeholder='Мета-тэг: keywords' type="text" id='meta_keywords' name='meta_keywords' />
                                        <label id='editNewsContentLabel' htmlFor="editNewsContent">Контент:</label>
                                        <CKEditor id="editNewsContent" data={content} editor={ClassicEditor} onChange={(e, editor) => {
                                            setContent(editor.getData());
                                        }} />

                                    </form>
                                </div>

                                <button title='Подтвердить' type='submit' className='acceptBtn' onClick={acceptEdit}>✓</button>
                                <button title='Отклонить' type='submit' className='rejectBtn' onClick={rejectEdit}>⨯</button>
                            </div>
                            <ul className='pagination'>
                {newsCount && Array(Math.ceil(newsCount / 30)).fill(1).map((value, index) => <li key={`page${value + index}`}><a onClick={selectPagPage} href='#'>{value + index}</a></li>)}
            </ul>
        </div>
    );
};

export default EditDeleteNews;