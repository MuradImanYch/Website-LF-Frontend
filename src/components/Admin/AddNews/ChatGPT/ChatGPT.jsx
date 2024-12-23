import React, { useEffect, useState } from 'react';
import '../ChatGPT/ChatGPT.css';
import axios from 'axios';
import $ from 'jquery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import cookies from 'js-cookie';

import loadSpiner from '../../../../assets/ico/loadSpiner.gif';

const parse = require('html-react-parser');

const ChatGPT = () => {
    const[category, setCategory] = useState('none');
    const[title, setTitle] = useState('');
    const[img, setImg] = useState('');
    const[content, setContent] = useState('');
    const[disabled, setDisabled] = useState(false);
    const[metaDescr, setMetaDescr] = useState('');
    const[metaKeywords, setMetaKeywords] = useState('');
    const[author, setAuthor] = useState('');
    const currentDate = new Date();
    const[link, setLink] = useState('');
    const[isGenerated, setIsGenerated] = useState(false);
    const[generateLoading, setGenerateLoading] = useState(false);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const timezoneOffset = -currentDate.getTimezoneOffset();
    const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60).toString().padStart(2, '0');
    const timezoneOffsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');
    const timezoneSign = timezoneOffset >= 0 ? '-' : '+';

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${timezoneOffsetHours}:${timezoneOffsetMinutes}`;

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    const editorConfig = {
        // Разрешить iframe тег
    htmlAllowed: true,
    // Разрешить необходимые атрибуты для iframe тега
    htmlAllowedEmptyTags: ['iframe'],
    htmlAllowedAttributes: {
      iframe: ['width', 'height', 'src', 'title', 'frameborder', 'allow', 'allowfullscreen'],
    },
        placeholder: 'Введите описание новости',
        mediaEmbed: {
          previewsInData: true, // Показывать предварительные просмотры видео в режиме редактирования
          extraProviders: [
            // Добавляем провайдер для видео из YouTube
            {
              name: 'youtube',
              url: /^https:\/\/www\.youtube\.com\/watch?v=([^/]+)$/,
              html: (match) => {
                const videoId = match[1];
                return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
              },
            },
            // Добавляем провайдер для видео из Vimeo
            {
              name: 'vimeo',
              url: /^https:\/\/vimeo\.com\/(\d+)$/,
              html: (match) => {
                const videoId = match[1];
                return `<iframe src="https://player.vimeo.com/video/${videoId}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
              },
            },
            // Добавьте другие провайдеры, если необходимо
          ],
        },
      };

    const addNews = (e) => {
        e.preventDefault();

        let authCookie = cookies.get('auth');
        if(authCookie) { // check is auth and get username by token
            axios.post('/profile/username', {
                token: authCookie
            })
            .then(response => {
                if (response.status == 200){
                    setAuthor(response.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }

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
            content,
            metaDescr,
            metaKeywords,
            author
        })
        .catch(err => {
            if(err) throw err;
        });

        axios.post('/sitemap', {
            formattedDate,
            title,
            author,
            category
        })
        .catch(err => {
            if(err) throw err;
        });

        $('select').prop({selectedIndex: '0'});
        document.querySelector('#newsSubmit').innerHTML = '✓';
        document.querySelector('#newsSubmit').setAttribute('disabled', 'disabled');
        document.querySelector('#newsCategory').setAttribute('disabled', 'disabled');
        document.querySelector('#newsTitle').setAttribute('disabled', 'disabled');
        document.querySelector('.fileText input[type="file"]').setAttribute('disabled', 'disabled');
        document.querySelector('#newsSubmit').style.background = '#18ba20';
        $('.preview').fadeOut();
        $('body').css({overflow: "auto"});
        setDisabled(true);
        setImg('');
        setTitle('');
        setContent('');
        setCategory('none');
        setMetaDescr('');
        setMetaKeywords('');
        setAuthor('');
        $('input').val('');
        $('.fileText div:last-child button').css({display: 'none'});

        setTimeout(() => {
            document.querySelector('#newsSubmit').innerHTML = '+';
            document.querySelector('#newsSubmit').removeAttribute('disabled');
            document.querySelector('#newsCategory').removeAttribute('disabled');
            document.querySelector('#newsTitle').removeAttribute('disabled');
            document.querySelector('#newsImg').removeAttribute('disabled');
            document.querySelector('.fileText input[type="file"]').removeAttribute('disabled');
            document.querySelector('#newsSubmit').style.background = 'rgba(204, 135, 45, 0.9)';
            setDisabled(false);
        }, 5000);
    }

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

    const generate = (e) => {
        e.preventDefault();

        if(link === '') {
            alert('Вставьте ссылку');
        }
        else {
            setGenerateLoading(true);
            $('#newsLink').attr('disabled', 'disabled');
            axios.post('/admin/generateNews', {
                link
            })
            .then(response => {
                if(response.data) {
                    setIsGenerated(true);
                    setGenerateLoading(false);
                    $('#newsLink').removeAttr('disabled');
                    
                    setTimeout(() => {
                        setTitle(response.data.title);
                        setMetaDescr(response.data.description);
                        setMetaKeywords(response.data.keywords);
                        setContent(response.data.content);
                        setImg(response.data.img);
    
                        $('#newsTitle').val(response.data.title);
                        $('#meta_description').val(response.data.description);
                        $('#meta_keywords').val(response.data.keywords);
                    }, 1000);
                }
                window.scrollTo(0, 0); // scroll top, when open page
            })
            .catch(err => {
                if(err) throw err;
            });
        }
    }

    return (
        <div id='chatGPT'>
            <div className='subNav'>
                <ul>
                    <li><Link to="/admin/addnews">Вручную</Link></li>
                    <li><Link to="/admin/addnews/gpt" >Chat GPT</Link></li>
                </ul>
            </div>
            <div className="newsLinkrap">
                <div className="input">
                    <label htmlFor="newsLink">Ссылка:</label>
                    <input onChange={(e) => {setLink(e.target.value)}} type="text" id='newsLink' name='newsLink' placeholder='Введите ссылку на новость' />
                </div>
                {generateLoading ? <img style={{width: '30px'}} src={loadSpiner} alt='loadSpinner' /> : <button onClick={generate}>Сгенерировать</button>}
            </div>
            
            {isGenerated && <form>
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
                    <option value="eu-qualification">Евр. квлф.</option>
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
                <div className='fileText'>
                    <div>
                        <input type="file" onChange={selectImg} />
                        <input placeholder='Выберите изображение либо вставьте ссылку' onChange={(e) => {
                        setImg(e.target.value);
                    }} type="text" name='newsImg' id='newsImg' />
                    </div>
                    <div>
                        {img && <img loading="lazy" src={img} alt="preview" />}
                        <button onClick={delImg}>⨯</button>
                    </div>
                </div>
                <label htmlFor="meta_description">Мета-тэг: description</label>
                <input onChange={(e) => {setMetaDescr(e.target.value)}} placeholder='Мета-тэг: description' type="text" id='meta_description' name='meta_description' />
                <label htmlFor="meta_keywords">Мета-тэг: keywords</label>
                <input onChange={(e) => {setMetaKeywords(e.target.value)}} placeholder='Мета-тэг: keywords' type="text" id='meta_keywords' name='meta_keywords' />
                <label id='newsContentLabel' htmlFor="newsContent">Контент:</label>
                <CKEditor config={editorConfig} data={content} disabled={disabled} id="newsContent" editor={ClassicEditor} onChange={(e, editor) => {
                    setContent(editor.getData());
                }} />
                <button title='Предпросмотр' type='submit' id='newsSubmit' onClick={addNews}>+</button>
            </form>}

            <div className="preview">
                <p className="popupTitle">Предпросмотр</p>

                <section>
                    <div className="container">
                        <p className="pageName">{title}</p>
                        <span className="date">ДД-ММ-ГГГГ | ЧЧ:ММ</span>
                        <LazyLoad offset={800}>
                            <img loading="lazy" id='mainImg' src={img} alt="newsImg" />
                        </LazyLoad>
                        <p><strong>{metaDescr}</strong></p>
                        <div className="textWrap">{parse(content)}</div>
                        <i className='author'>{author}</i>
                    </div>
                </section>

                <button title='Подтвердить' type='submit' className='acceptBtn' onClick={acceptAdd}>✓</button>
                <button title='Отклонить' type='submit' className='rejectBtn' onClick={rejectAdd}>⨯</button>
            </div>
        </div>
    );
};

export default ChatGPT;