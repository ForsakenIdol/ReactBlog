import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { verify } from 'jsonwebtoken';

import BlogHome from '../Pages/BlogHome';
import BlogPost from '../Pages/BlogPost';
import BlogAbout from '../Pages/BlogAbout';
import BlogLogin from '../Pages/BlogLogin';
import BlogRegister from '../Pages/BlogRegister';
import BlogLogout from '../Components/BlogLogout';
import BlogProfile from '../Pages/BlogProfile';



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
        {/* The profile can perform an API call to get all the available information about a user. 
            We then filter out only the information we need to use, but all the information is there. */}
        <li className="nav-item"><Link to='/profile'>Profile</Link></li>
        <li className="nav-item"><BlogLogout handleStatus={this.handleStatus.bind(this)}/></li>
      </ul>
    );
  }

  /* Prop Functions */

  handleStatus() {
    // We hardcode environment variable values during runtime, as they are embedded only during build time.
    // See https://create-react-app.dev/docs/adding-custom-environment-variables
    let ACCESS_TOKEN_SECRET = "cfacd1ca6ef54c01adefe522d56ed668bfcd8db73f7d43426fa0787ec8284c807ed16ca1b296f39e8def9011bc2825dd1d41e7fc63ef363d1ad4346418a721e1";
    let REFRESH_TOKEN_SECRET = "e3f71fdf637bff5f647a56b01c09d78e0367768c96e1ed8d6e39e73047a375abcc92ad47587f77f170d2e96db9641f0d2f225d4aa60eee540defddcd3ac0bd88";

    let refreshToken = localStorage.getItem("refreshToken");
    // Check refresh token
    if (refreshToken != '') verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        console.log("There was an error in the refresh token. Error details below.");
        console.log(err);
        localStorage.clear();
        return this.setState({logged_in: false});
      }
      // Check current access token, request new one if necessary
      let accessToken = localStorage.getItem("accessToken");
      verify(accessToken, ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          // Attempt to request and store a new token
          fetch("http://localhost:5000/refresh", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: refreshToken})
          }).then(response => {
            if (!response.ok) {
              console.log(response);
              localStorage.clear();
              throw new Error("Refresh response was not ok");
            }
            else {
              console.log("Raw response below.");
              console.log(response);
              return response.json();
            }
          }).then(result => {
            console.log("Received a response from the refresh route as below.");
            console.log(result);
            // Check result and set logged_in state
            if (result.error) {
              localStorage.clear();
              this.setState({logged_in: false});
            } else {
              localStorage.setItem("accessToken", result.token);
              this.setState({logged_in: true});
            }
          }).catch(error => {console.log(error); localStorage.clear(); this.setState({logged_in: false});})
        } else this.setState({logged_in: true});
      });
    });
    else this.setState({logged_in: false});
  }

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
          // This will need some logic which identifies variables in the path URL and uses them to request the blog data
          // which matches that particular variable (ID for posts)
          }
          <Route path='/post/:id' render={props => <BlogPost {...props} handleStatus={this.handleStatus.bind(this)} />} />
          <Route path='/about' component={BlogAbout} />
          <Route path='/login' >
            {this.state.logged_in ? <Redirect to='/' /> : <BlogLogin handleStatus={this.handleStatus.bind(this)}/>}
          </Route>
          <Route path='/register' >
            {this.state.logged_in ? <Redirect to='/' /> : <BlogRegister />}
          </Route>
          <Route path='/profile'>
            {this.state.logged_in ? <BlogProfile handleStatus={this.handleStatus.bind(this)} /> : <Redirect to='/login' />}
          </Route>
          <Route path='/' component={BlogHome} />
        </Switch>
      </Router>
    );
  }
}

export default Navbar;
