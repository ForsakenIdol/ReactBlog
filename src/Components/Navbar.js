import React from 'react';

class Navbar extends React.Component {
  render_auth(logged_in) {
    if (!logged_in) return (
      <ul className="navbar-nav ml-auto" id="navlinks-right">
        <li className="nav-item"><a href="#login">Login</a></li>
        <li className="nav-item"><a href="#register" className="register">Register</a></li>
      </ul>
    );
    else return (
      <ul className="navbar-nav ml-auto" id="navlinks-right">
        <li className="nav-item"><a href="#profile">Profile</a></li>
        <li className="nav-item"><a href="#logout">Logout</a></li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light navigation container">
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navigationlinks">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navigationlinks">
          <ul className="navbar-nav mr-auto" id="navlinks-left">
              <li className="nav-item"><a href="#blog">Home</a></li>
            <li className="nav-item"><a href="#main-content">About</a></li>
            <li className="nav-item"><a href="#contact">Contact</a></li>
          </ul>
          {this.render_auth(this.props.logged_in)}
        </div>
          
      </nav>
    );
  }
}

export default Navbar;
