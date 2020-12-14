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
            console.log(result)
            if (result.status === "success") console.log("Logout occured normally.");
            else if (result.status === "error") console.log("The logout route encountered an error. Attempting a logout anyway.")
            else console.log("The logout route encountered an unexpected result. Attempting a logout anyway.");
            localStorage.clear();
            this.props.handleStatus();
        });
    }

    render() {
        return <button onClick={this.logout} className="logout">Logout</button>
    }
}