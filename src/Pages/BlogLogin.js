import React from 'react';
import $ from 'jquery';

export default class BlogLogin extends React.Component {

    // Returns true if there are no errors in the form, false if there is at least one error.
    checkLoginForm() {
        var loginUsernameError = "Please enter your username.";
        var loginPasswordError = "Please enter your password.";
        let errors = 0;

        // Validate username field
        var username = $("#login-form-username").val();
        if (username === '') {
            $("#login-form-username-error").text(loginUsernameError);
            $("#login-form-username-error").fadeToggle(500);
            setTimeout(() => {$("#login-form-username-error").fadeToggle(500);}, 2000);
            errors++;
        }

        // Validate password field
        var password = $("#login-form-password").val();
        if (password === '') {
            $("#login-form-password-error").text(loginPasswordError);
            $("#login-form-password-error").fadeToggle(500);
            setTimeout(() => {$("#login-form-password-error").fadeToggle(500);}, 3000);
            errors++;
        }

        return errors === 0;
    }
    componentDidMount() {
        // Hide error fields on page load
        $(".form-failure").hide();
    }

    render() {
        return (
            <div style={{marginTop: "7rem", marginBottom: "5rem"}}>
                <h1 className="form-title">Login</h1>
                <form action="http://localhost:5000/login" method="POST" className="container auth-form" id="login-form">
                    <div className="form-group">
                        <label htmlFor="login-form-username" className="form-label" >Username <span style={{color: "red"}}>*</span></label>
                        <input type="text" name="username" className="form-control" style={{ border: "2px solid #555" }} id="login-form-username" placeholder="Username" />
                        <span className="form-failure" id="login-form-username-error"></span>
                        <small id="login-info" className="form-text text-muted">Standard users, login to leave comments and view your personal information. Administrators, login to additionally manage accounts and moderate blog posts.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-form-password" className="form-label" >Password <span style={{color: "red"}}>*</span></label>
                        <input type="password" name="password" className="form-control" style={{ border: "2px solid #555" }} id="login-form-password" placeholder="Password" />
                        <span className="form-failure" id="login-form-password-error"></span>
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={
                        e => {
                            e.preventDefault();
                            if (this.checkLoginForm()) {
                                let body = {
                                    username: document.getElementById("login-form-username").value,
                                    password: document.getElementById("login-form-password").value
                                };
                                fetch("http://localhost:5000/login", {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(body)
                                }).then(response => {
                                    if (!response.ok) {
                                    console.log(response);
                                    throw new Error("Login response was not ok");
                                    }
                                    else return response.json();
                                }).then(result => {
                                    // Set tokens in localStorage
                                    if (!result.result) {
                                        // Put refresh token in storage (we only have to worry about a single refresh token on the client side per login "session")
                                        localStorage.setItem("refreshToken", result.refreshToken);
                                        localStorage.setItem("accessToken", result.accessToken);
                                      } else {
                                          // At least 1 field is incorrect.
                                          $("#login-form-failure").text("Username or password was incorrect.");
                                          $("#login-form-failure").fadeToggle(500);
                                          setTimeout(() => {$("#login-form-failure").fadeToggle(500);}, 3000);
                                      }
                                    console.log("Login attempted, updating status...");
                                    this.props.handleStatus();
                                }).catch(error => {
                                    console.log(error);
                                    return error;
                                });
                            }
                        }}>Login</button>
                        <span className="form-failure" id="login-form-failure"></span>
                </form>
            </div>
        );
    }
}