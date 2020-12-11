import React from 'react';

export default class BlogLogout extends React.Component {

    logout = () => {
        fetch("http://localhost:5000/logout", {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: localStorage.getItem("refreshToken")})
        }).then(response => {
            if (!response.ok) {
            console.log(response);
            throw new Error("Login response was not ok");
            }
            else return response.json();
        }).then(result => {
            if (result.status == "success") {
                localStorage.clear();
                this.props.handleStatus();
            } else console.log(result);
        });
    }

    render() {
        return <button onClick={this.logout} className="logout">Logout</button>
    }
}