import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import BlogHome from './Pages/BlogHome';
import BlogPost from './Pages/BlogPost';

ReactDOM.render(
    <BlogHome />,
    document.getElementById('root')
);