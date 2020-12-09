import React from 'react';

export default class BlogLogin extends React.Component {

    loginFormSubmit(e) {
        e.preventDefault();
        let username = document.getElementById("login-form-username").value;
        let password = document.getElementById("login-form-password").value;
        let body = {username: username, password: password};
        fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(response => {
            if (!response.ok) throw new Error("Login response was not ok");
            else {
                console.log("Response was ok!");
                return response.json();
            }
        }).then(result => {
            console.log(result);
            // Here, we would store both the access and the refresh tokens received from the auth server in memory.
            if (result.status == "success") console.log(result.token);
        }).catch(error => console.log(error));
        console.log(username, password);
    }

    render() {
        return (
            <div style={{marginTop: "7rem"}}>
                <h1 style={{fontFamily: "'Sahitya', sans-serif", fontSize: "3rem", textAlign: "center", marginBottom: "3.5rem"}}>Login</h1>
                <div className="row">
                    <div className="col-3" />
                    <form action="http://localhost:5000/login" method="POST" className="col-6" id="login-form">
                        <div className="form-group">
                            <label htmlFor="login-form-username" className="form-label" >Username <span style={{color: "red"}}>*</span></label>
                            <input type="text" name="username" className="form-control" style={{ border: "2px solid #555", marginBottom: "0.5rem" }} id="login-form-username" placeholder="Username" required />
                            <small id="login-info" className="form-text text-muted">Standard users, login to leave comments and view your personal information. Administrators, login to additionally manage accounts and moderate blog posts.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-form-password" className="form-label" >Password <span style={{color: "red"}}>*</span></label>
                            <input type="password" name="password" className="form-control" style={{ border: "2px solid #555" }} id="login-form-password" placeholder="Password" required />
                        </div>
                        <button type="submit" className="btn btn-dark" onClick={e => this.loginFormSubmit(e)}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}