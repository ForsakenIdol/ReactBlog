import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import BlogHome from '../Pages/BlogHome';
import BlogPost from '../Pages/BlogPost';
import BlogAbout from '../Pages/BlogAbout';

/*
 * ~~~~~~~~~~ Great React Router Pages ~~~~~~~~~~
 * - Code example of React Router use: https://reactrouter.com/web/example/basic
 *   Note that we can have certain routes defined in our switch with the corresponding route function, but which are not
 *   captured in the route object.
 * - Using variables in a route path: https://soshace.com/this-is-how-i-created-a-simple-app-using-react-routing/
 */

class Navbar extends React.Component {
  render_auth(logged_in) {
    if (!logged_in) return (
      <ul className="navbar-nav ml-auto" id="navlinks-right">
        <li className="nav-item"><Link to='/login'>Login</Link></li>
        <li className="nav-item"><Link to='/register' className="register">Register</Link></li>
      </ul>
    );
    else return (
      <ul className="navbar-nav ml-auto" id="navlinks-right">
        <li className="nav-item"><Link to='/profile'>Profile</Link></li>
        <li className="nav-item"><Link to='/logout'>Logout</Link></li>
      </ul>
    );
  }

  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-md navbar-light navigation container">
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navigationlinks">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navigationlinks">
            <ul className="navbar-nav mr-auto" id="navlinks-left">
              <li className="nav-item"><a href="https://forsakenidol.com/" target="_blank" rel="noreferrer">Home</a></li>
              <li className="nav-item"><Link to='/about'>About</Link></li>
              <li className="nav-item"><a href="https://forsakenidol.com/contact" target="_blank" rel="noreferrer">Contact</a></li>
              <li className="nav-item"><Link to='/'>Blog</Link></li>
            </ul>
            {this.render_auth(this.props.logged_in)}
          </div>
        </nav>

        <Switch>
          {
          // This will need some logic which identifies variables in the path URL and uses them to request the blog data
          // which matches that particular variable (ID for posts)
          }
          <Route path='/post/:id' component={BlogPost} />
          <Route path='/about' component={BlogAbout} />
          <Route path='/' component={BlogHome} />
        </Switch>
      </Router>
    );
  }
}

export default Navbar;
