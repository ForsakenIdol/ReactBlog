import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import BlogHome from '../Pages/BlogHome';
import BlogPost from '../Pages/BlogPost';
import BlogAbout from '../Pages/BlogAbout';
import BlogLogin from '../Pages/BlogLogin';
import BlogRegister from '../Pages/BlogRegister';
import BlogLogout from '../Components/BlogLogout';
import BlogProfile from '../Pages/BlogProfile';
import BlogAddPost from '../Pages/BlogAddPost';


/*
 * ~~~~~~~~~~ Great React Router Pages ~~~~~~~~~~
 * - Code example of React Router use: https://reactrouter.com/web/example/basic
 *   Note that we can have certain routes defined in our switch with the corresponding route function, but which are not
 *   captured in the route object.
 * - Using variables in a route path: https://soshace.com/this-is-how-i-created-a-simple-app-using-react-routing/
 */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false
    }
  }

  render_auth(logged_in) {
    if (!logged_in) return (
      <ul className="navbar-nav ml-auto" id="navlinks-right">
        <li className="nav-item"><Link to='/login'>Login</Link></li>
        <li className="nav-item"><Link to='/register' className="register">Register</Link></li>
      </ul>
    );
    else return (
      <ul className="navbar-nav ml-auto" id="navlinks-right">
        <li className="nav-item"><Link to='/addpost'>Post</Link></li>
        {/* The profile can perform an API call to get all the available information about a user. 
            We then filter out only the information we need to use, but all the information is there. */}
        <li className="nav-item"><Link to='/profile'>Profile</Link></li>
        <li className="nav-item"><BlogLogout handleStatus={this.handleStatus.bind(this)}/></li>
      </ul>
    );
  }

  handleStatus() {
    console.log("Handling status...");
    fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken")
      })
    }).then(response => {
      if (!response.ok) throw new Error("Verify response was not ok.");
      return response.json();
    }).then(result => {
      if (result.refresh !== "valid") this.setState({logged_in: false});
      else if (result.access !== "valid") {
        // Attempt to request and store a new token
        fetch("http://localhost:5000/refresh", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({token: localStorage.getItem("refreshToken")})
        }).then(response => {
          if (!response.ok) {
            localStorage.clear();
            throw new Error("Refresh response was not ok");
          }
          else return response.json();
        }).then(result => {
          // Check result and set logged_in state
          if (result.error) {
            localStorage.clear();
            this.setState({logged_in: false});
          } else {
            localStorage.setItem("accessToken", result.token);
            this.setState({logged_in: true});
          }
        }).catch(error => {console.log(error); localStorage.clear(); this.setState({logged_in: false});});
      } else this.setState({logged_in: true});
    }).catch(error => console.log(error));
  }

  componentDidMount() {this.handleStatus(); let statusInterval = setInterval(() => {this.handleStatus();}, 600000)};

  /* Render Function */

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
            {this.render_auth(this.state.logged_in)}
          </div>
        </nav>

        <Switch>
          {
          // For routes which load user information, they need to call handleStatus to ensure that the access token
          // currently in storage is still valid.
          }
          <Route path='/post/:id' render={props => <BlogPost {...props} handleStatus={this.handleStatus.bind(this)} />} />
          <Route path='/about' render={props => <BlogAbout {...props} />} />
          <Route path='/login' >
            {this.state.logged_in ? <Redirect to='/profile' /> : <BlogLogin handleStatus={this.handleStatus.bind(this)}/>}
          </Route>
          <Route path='/register' >
            {this.state.logged_in ? <Redirect to='/profile' /> : <BlogRegister />}
          </Route>
          <Route path='/profile'>
            {this.state.logged_in ? <BlogProfile handleStatus={this.handleStatus.bind(this)} /> : <Redirect to='/login' />}
          </Route>
          <Route path='/addpost' render={props => <BlogAddPost {...props} logged_in={this.state.logged_in}/>} />
          <Route path='/' render={props => <BlogHome {...props}/>} />
        </Switch>
      </Router>
    );
  }
}

export default Navbar;
