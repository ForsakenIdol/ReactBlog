import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BlogHome from './Pages/BlogHome';
import BlogPost from './Pages/BlogPost';

ReactDOM.render(
    <Router>
        <Switch>
          {
          // This will need some logic which identifies variables in the path URL and uses them to request the blog data
          // which matches that particular variable (ID for posts)
          }
          <Route path='/post' component={BlogPost} />
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/' component={BlogHome} />
        </Switch>
    </Router>,
    document.getElementById('root')
);

function About() {
    return <h2>The about page.</h2>;
  }