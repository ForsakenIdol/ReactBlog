import React from 'react';

export default class BlogLogin extends React.Component {
    
    render() {
        return (
            <div style={{marginTop: "7rem"}}>
                <h1 style={{fontFamily: "'Sahitya', sans-serif", fontSize: "3rem", textAlign: "center", marginBottom: "3.5rem"}}>Login</h1>
                <div class="row">
                    <div class="col-3" />
                    <form class="col-6" id="login-form">
                        <div className="form-group">
                            <label for="login-form-username" class="form-label" >Username <span style={{color: "red"}}>*</span></label>
                            <input type="text" name="username" className="form-control" style={{ border: "2px solid #555", marginBottom: "0.5rem" }} id="login-form-username" placeholder="Username" required />
                            <small id="login-info" class="form-text text-muted">Standard users, login to leave comments and view your personal information. Administrators, login to manage accounts and moderate blog posts.</small>
                        </div>
                        <div className="form-group">
                            <label for="login-form-password" class="form-label" >Password <span style={{color: "red"}}>*</span></label>
                            <input type="password" name="username" className="form-control" style={{ border: "2px solid #555" }} id="login-form-password" placeholder="Password" required />
                        </div>
                        <input type="submit" className="btn btn-dark" />
                    </form>
                </div>
            </div>
        );
    }

}