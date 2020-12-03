import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: typeof this.props.logged_in !== 'undefined' ? this.props.logged_in : false
    }
  }

  render_auth(logged_in) {
    if (!logged_in) return (
      <ul class="navbar-nav ml-auto" id="navlinks-right">
        <li class="nav-item"><a href="#login">Login</a></li>
        <li class="nav-item"><a href="#register" class="register">Register</a></li>
      </ul>
    );
    else return (
      <ul class="navbar-nav ml-auto" id="navlinks-right">
        <li class="nav-item"><a href="#profile">Profile</a></li>
        <li class="nav-item"><a href="#logout">Logout</a></li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light navigation container">
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navigationlinks">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navigationlinks">
          <ul class="navbar-nav mr-auto" id="navlinks-left">
              <li class="nav-item"><a href="#blog">Home</a></li>
            <li class="nav-item"><a href="#main-content">About</a></li>
            <li class="nav-item"><a href="#contact">Contact</a></li>
          </ul>
          {this.render_auth(this.state.logged_in)}
        </div>
          
      </nav>
    );
  }
}

export default Navbar;
