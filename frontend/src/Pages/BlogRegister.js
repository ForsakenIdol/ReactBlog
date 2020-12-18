import React from 'react';
import $ from 'jquery';

export default class BlogRegister extends React.Component {

    checkRegisterForm() {
        var registerUsernameError = "Please enter a username.";
        var registerEmailErrorEmpty = "Please enter an email address.";
        var registerEmailErrorInvalid = "Please enter a valid email address.";
        var registerPasswordError = "Please enter a password.";
        var registerConfirmPasswordError = "Passwords do not match.";

        let errors = 0;

        // Validate username
        var username = $("#register-form-username").val();
        if (username === '') {
            $("#register-form-username-error").text(registerUsernameError);
            errors++;
        }

        // Validate email
        var email = $("#register-form-email").val();
        var emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (email === '') {
            $("#register-form-email-error").text(registerEmailErrorEmpty);
            errors++;
        } else if (!emailRegex.test(email)) {
            $("#register-form-email-error").text(registerEmailErrorInvalid);
            errors++;
        }

        // Validate password
        var password = $("#register-form-password").val();
        if (password === '') {
            $("#register-form-password-error").text(registerPasswordError);
            errors++;
        }

        // Validate confirm password
        var confirmpassword = $("#register-form-confirm-password").val();
        if (confirmpassword !== password) {
            $("#register-form-confirm-password-error").text(registerConfirmPasswordError);
            errors++;
        }

        if (errors > 0) {
            $(".form-failure").fadeToggle(500);
            // We delay text removal so it doesn't interfere with the fade out.
            setTimeout(() => {$(".form-failure").fadeToggle(500);}, 2000);
            setTimeout(() => {$(".form-failure").text('');}, 3000);
        }

        return errors === 0;
    }

    handleRegisterFormSubmit(body) {
        fetch("http://localhost:5000/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(response => {
            if (!response.ok) throw new Error("Register response was not ok");
            else return response.json();
        }).then(result => {
          console.log(result);
          if (result.status === "success") {
            $("input").val("");
            $("#register-form-success").text("Registered successfully! You may now login using the login page.");
            $("#register-form-success").fadeToggle(500);
            setTimeout(() => {$("#register-form-success").fadeToggle(500);}, 5000);
          } else if (result.status === "failure") {
              switch (result.reason) {
                  case "username":
                    $("#register-form-failure").text("That username has already been taken.");
                    $("#register-form-failure").fadeToggle(500);
                    setTimeout(() => {$("#register-form-failure").fadeToggle(500);}, 3000);
                    break;
                  case "email":
                    $("#register-form-failure").text("That email has already been taken.");
                    $("#register-form-failure").fadeToggle(500);
                    setTimeout(() => {$("#register-form-failure").fadeToggle(500);}, 3000);
                    break;
                  default:
                    $("#register-form-failure").text("An unexpected error occured. Please try again later.");
                    $("#register-form-failure").fadeToggle(500);
                    setTimeout(() => {$("#register-form-failure").fadeToggle(500);}, 3000);
                    break;
              }
          } else {
            $("#register-form-failure").text("An unexpected error occured. Please try again later.");
            $("#register-form-failure").fadeToggle(500);
            setTimeout(() => {$("#register-form-failure").fadeToggle(500);}, 3000);
          }
        }).catch(error => console.log(error));
      }

    componentDidMount() {
        $(".form-failure").hide(); // Hide all 4 form-failure spans at once
        $("#register-form-success").hide();
        $("#register-form-failure").hide();
    }
    
    render() {
        return (
            <div style={{marginTop: "7rem", marginBottom: "5rem"}}>
                <h1 className="form-title">Register</h1>
                <form className="container auth-form" id="register-form">
                    {/* Username, Email, Password, Confirm Password */}
                    <div className="form-group">
                        <label htmlFor="register-form-username" className="form-label" >Username <span style={{color: "red"}}>*</span></label>
                        <input type="text" name="username" className="form-control" style={{ border: "2px solid #555" }} id="register-form-username" placeholder="Username" />
                        <span className="form-failure" id="register-form-username-error"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-form-email" className="form-label" >Email <span style={{color: "red"}}>*</span></label>
                        <input type="email" name="email" className="form-control" style={{ border: "2px solid #555" }} id="register-form-email" placeholder="Email" />
                        <span className="form-failure" id="register-form-email-error"></span>
                        <small id="register-form-email-info" className="form-text text-muted">We'll never share your personal information with anyone.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-form-password" className="form-label" >Password <span style={{color: "red"}}>*</span></label>
                        <input type="password" name="password" className="form-control" style={{ border: "2px solid #555" }} id="register-form-password" placeholder="Password" />
                        <span className="form-failure" id="register-form-password-error"></span>
                        <small id="register-form-password-info" className="form-text text-muted">Choose a strong password. Ideally it should be at least 10 characters long, but this is not enforced.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-form-confirm-password" className="form-label" >Repeat Password <span style={{color: "red"}}>*</span></label>
                        <input type="password" name="password" className="form-control" style={{ border: "2px solid #555" }} id="register-form-confirm-password" placeholder="Repeat Password" />
                        <span className="form-failure" id="register-form-confirm-password-error"></span>
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={
                        e => {
                            e.preventDefault();
                            if (this.checkRegisterForm()) {
                                let body = {
                                    username: $("#register-form-username").val(),
                                    email: $("#register-form-email").val(),
                                    password: $("#register-form-password").val()
                                }
                                this.handleRegisterFormSubmit(body);
                            }
                        }
                    }>Register</button>
                    <span className="form-failure" style={{color: "green"}} id="register-form-success"></span>
                    <span className="form-failure" id="register-form-failure"></span>
                </form>
            </div>
        );
    }
}