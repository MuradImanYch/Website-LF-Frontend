import React from 'react';
import './AddNews.css';
import axios from 'axios';
import { useState } from 'react';
import $ from 'jquery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import LazyLoad from 'react-lazy-load';

const parse = require('html-react-parser');

const AddNews = () => {
    const[category, setCategory] = useState('none');
    const[title, setTitle] = useState('');
    const[img, setImg] = useState('');
    const[content, setContent] = useState('');
    const[disabled, setDisabled] = useState(false);

    const addNews = (e) => {
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
            $('.preview').fadeIn();
            $('body').css({overflow: "hidden"});
        }
    }

    const rejectAdd = () => {
        $('.preview').fadeOut();
        $('body').css({overflow: "auto"});
    }

    const acceptAdd = () => {
        axios.post('/admin/addNews', {
            category,
            title,
            img,
            content
        })
        .catch(err => {
            if(err) throw err;
        });

        $('select').prop({selectedIndex: '0'});
        document.querySelector('#newsSubmit').innerHTML = '✓';
        document.querySelector('#newsSubmit').setAttribute('disabled', 'disabled');
        document.querySelector('#newsCategory').setAttribute('disabled', 'disabled');
        document.querySelector('#newsTitle').setAttribute('disabled', 'disabled');
        document.querySelector('#newsImg').setAttribute('disabled', 'disabled');
        document.querySelector('#newsSubmit').style.background = '#18ba20';
        $('.preview').fadeOut();
        $('body').css({overflow: "auto"});
        setDisabled(true);
        setImg('');
        setTitle('');
        setContent('');
        setCategory('none');
        $('input').val('');

        setTimeout(() => {
            document.querySelector('#newsSubmit').innerHTML = '+';
            document.querySelector('#newsSubmit').removeAttribute('disabled');
            document.querySelector('#newsCategory').removeAttribute('disabled');
            document.querySelector('#newsTitle').removeAttribute('disabled');
            document.querySelector('#newsImg').removeAttribute('disabled');
            document.querySelector('#newsSubmit').style.background = 'rgba(204, 135, 45, 0.9)';
            setDisabled(false);
        }, 10000);
    }

    return (
        <div id='addNews'>
            <form>
                <label htmlFor="newsCategory">Категория:</label>
                <select onChange={(e) => {
                    setCategory(e.target.value);
                }} defaultValue={'none'}  name="newsCategory" id="newsCategory">
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
                <label htmlFor="newsTitle">Заголовок:</label>
                <input placeholder='Введите заголовок' onChange={(e) => {
                    setTitle(e.target.value);
                }} type="text" id='newsTitle' name='newsTitle' />
                <label htmlFor="newsImg">Изображение:</label>
                <input placeholder='Вставьте ссылку на изображение' onChange={(e) => {
                    setImg(e.target.value);
                }} type="text" name='newsImg' id='newsImg' />
                <label id='newsContentLabel' htmlFor="newsContent">Контент:</label>
                <CKEditor config={{placeholder: "Введите описание новости", mediaEmbed: {previewsInData: true}}} data={content} disabled={disabled} id="newsContent" editor={ClassicEditor} onChange={(e, editor) => {
                    setContent(editor.getData());
                }} />
                <button title='Предпросмотр' type='submit' id='newsSubmit' onClick={addNews}>+</button>
            </form>

            <div className="preview">
                <p className="popupTitle">Предпросмотр</p>

                <section>
                    <div className="container">
                        <p className="pageName">{title}</p>
                        <span className="date">ДД-ММ-ГГГГ | ЧЧ:ММ</span>
                        <LazyLoad offset={800}>
                            <img id='mainImg' src={img} alt="newsImg" />
                        </LazyLoad>
                        <div className="textWrap">{parse(content)}</div>
                    </div>
                </section>

                <button title='Подтвердить' type='submit' className='acceptBtn' onClick={acceptAdd}>✓</button>
                <button title='Отклонить' type='submit' className='rejectBtn' onClick={rejectAdd}>⨯</button>
            </div>
        </div>
    );
};

export default AddNews;