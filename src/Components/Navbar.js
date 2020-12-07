import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

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
              <li className="nav-item"><Link to='/'>Home</Link></li>
              <li className="nav-item"><Link to='/about'>About</Link></li>
              <li className="nav-item"><Link to='/contact'>Contact</Link></li>
            </ul>
            {this.render_auth(this.props.logged_in)}
          </div>
        </nav>
      </Router>
    );
  }
}

export default Navbar;
