import { Component } from 'react';
import $ from 'jquery';

export default class BlogProfile extends Component {

    componentDidMount() {
        this.props.handleStatus();
        // Get profile information
        fetch("http://localhost:5000/statistics", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({accessToken: localStorage.getItem("accessToken")})
        }).then(response => {
            if (!response.ok) throw new Error("Statistics received were not ok.");
            else return response.json();
        }).then(result => {
            $("#username").text(result.username);
            $("#numposts").text(result.numposts + (result.numposts === 1 ? " post" : " posts"));
            $("#numcomments").text(result.numcomments + (result.numcomments === 1 ? " comments" : " comments"));
            $("#profile-id").text(result.id);
            $("#profile-username").text(result.username);
            $("#profile-email").text(result.email);
        }).catch(error => {console.log(error);});
    }

    render() {
        return (
            <div className="container">
                <div className="blog-profile">
                    <h1>Welcome, <span id="username">---</span>.</h1>
                    <em style={{fontSize: "1.5rem"}}>You've written <span id="numposts">0 posts</span> and left <span id="numcomments">0 comments</span> across this blog.</em>
                    <br />
                    <div className="profile-standout">
                        <h2 style={{marginTop: "1rem"}}>Personal Information</h2>
                        <hr style={{borderColor: "white"}} />
                        <table className="table table-borderless" style={{fontFamily: "Oxygen, sans-serif", color: "white"}}>
                            <tr>
                                <th scope="row">User ID</th>
                                <td id="profile-id">---</td>
                            </tr>
                            <tr>
                                <th scope="row">Username</th>
                                <td id="profile-username">---</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td id="profile-email">---</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <p style={{textAlign: "center", marginBottom: "5rem"}}>Looking for the old profile layout, or want to change your personal details?
                    Try logging into my <a href="https://forsakenidol.com/login" target="_blank" rel="noreferrer" className="inline-link">main site</a>.</p>
            </div>
        );
    }

}