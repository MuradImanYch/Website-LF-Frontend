import React, { useEffect } from 'react';

const AdsenseAd = () => {
    useEffect(() => {
        // Создаем элемент скрипта
        // const script = document.createElement('script');
        // script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9748273078203330';
        // script.crossOrigin = 'anonymous';
        // script.async = true;
    
        // Создаем элемент рекламы
        const ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.setAttribute('data-ad-client', 'ca-pub-9748273078203330');
        ins.setAttribute('data-ad-slot', '6207900916');
        ins.setAttribute('data-ad-format', 'auto');
        ins.setAttribute('data-full-width-responsive', 'true');
    
        // Добавляем элементы в DOM
        const container = document.getElementById('your-ad-container'); // Замените 'your-ad-container' на идентификатор контейнера, куда вы хотите разместить рекламу
        container.appendChild(ins);
    
        // Добавляем скрипт в DOM
        // document.head.appendChild(script);
    
        // Запускаем рекламу
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, []);

    return (
        <div id="your-ad-container"> 
            
        </div>
    );
};

export default AdsenseAd;