import React, { useEffect, useState } from 'react';
import './ExtendedNews.css';
import $ from 'jquery';
import { useParams } from 'react-router-dom';

const ExtendedNews = () => {
    const {id} = useParams();

    return (
        <div>
            {id}
        </div>
    );
};

export default ExtendedNews;