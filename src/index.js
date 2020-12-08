import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './Components/Navbar';

ReactDOM.render(
    <Navbar logged_in={false}/>,
    document.getElementById('root')
);