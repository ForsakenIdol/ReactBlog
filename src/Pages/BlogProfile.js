import { Component } from 'react';
import $ from 'jquery';

export default class BlogProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.handleStatus();
        // Get profile information
        fetch("http://localhost:5000/statistics", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({accessToken: localStorage.getItem("accessToken")})
        }).then(response => {
            if (!response.ok) console.log("Statistics received were not ok.");
            else return response.json();
        }).then(result => {
            console.log(result);
            $("#profile-stats").text(JSON.stringify(result));
        }).catch(error => {console.log(error);});
    }

    render() {
        return (
            <div className="blog-profile">
                <p>Hello World!</p>
                <p id="profile-stats"></p>
            </div>
        );
    }

}