import React from 'react';
import $ from 'jquery';

export default class BlogRegister extends React.Component {
    checkRegisterForm() {
        let errors = 0;

        return errors === 0;
    }

    componentDidMount() {

    }
    
    render() {
        return (
            <div style={{marginTop: "7rem", marginBottom: "5rem"}}>
                <h1 className="form-title">Register</h1>
                <form action="http://localhost:5000/register" method="POST" className="container auth-form" id="register-form">
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
                    <button type="submit" className="btn btn-dark" onClick={e => {e.preventDefault(); if (this.checkRegisterForm()) this.props.handleSubmit(e);}}>Register</button>
                </form>
            </div>
        );
    }
}