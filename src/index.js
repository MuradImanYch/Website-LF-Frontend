import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import $ from 'jquery';
import preloadImgL from './assets/ico/logoL.png';
import preloadImgF from './assets/ico/logoF.png';

const root = ReactDOM.createRoot(document.getElementById('root'));

$(window).on('load', function() {
  setTimeout(() => {
    $('#preloader').fadeOut(500);
    $('body').css({overflow: 'scroll'});
  }, 2000);
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div id="preloader">
        <div className='imgWrap'>
          <img src={preloadImgL} alt="preloadImgL" />
          <img src={preloadImgF} alt="preloadImgF" />
        </div>
      </div>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
