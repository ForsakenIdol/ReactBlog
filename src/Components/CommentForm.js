import $ from 'jquery';
import { Component } from 'react';

function CommentForm(props) {
    return (
        <div className="comment-form container">
            <hr color="black" />
            <h3 className="comment-section-title">Leave a comment</h3>
            <form className="add-comment" id="add-comment-form">
                <input name="post_id" type="text" value={props.post_id} id="add-comment-post-id" readOnly hidden />
                <textarea className="form-control" style={{minHeight: "5rem", marginTop: "1rem", border: "1px solid black", borderRadius: "0.5rem"}} name="content" placeholder="What do you want to say?" id="add-comment-content"></textarea>
                <br />
                <input type="submit" className="btn btn-dark" id="add-comment-submit" onClick={e => {
                    e.preventDefault();
                    let refresh = localStorage.getItem("refreshToken");
                    if (!refresh) {
                        $("#add-comment-failure").hide();
                        $("#add-comment-failure").text("You must be logged in to post comments!");
                        $("#add-comment-failure").fadeToggle(500);
                        setTimeout(() => {$("#add-comment-failure").fadeToggle(500);}, 3000);
                    }
                    else {
                        fetch("http://localhost:5000/comment", {
                            method: "POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                accessToken: localStorage.getItem("accessToken"),
                                comment: $("#add-comment-content").val(),
                                post_id: $("#add-comment-post-id").val()
                            })
                        }).then(response => {if (!response.ok) console.log("Comment form response was not ok."); else return response.json()})
                        .then(result => {
                            console.log(result);
                            if (result.status === "success") {
                                $("#add-comment-content").text('');
                                $("#add-comment-success").hide();
                                $("#add-comment-success").text("Comment posted successfully!");
                                $("#add-comment-success").fadeToggle(500);
                                setTimeout(() => {$("#add-comment-success").fadeToggle(500);}, 3000);
                            } else if (result.status === "error") {
                                if (result.reason === "no_comment") {
                                    $("#add-comment-failure").hide();
                                    $("#add-comment-failure").text("Comment field cannot be empty!");
                                    $("#add-comment-failure").fadeToggle(500);
                                    setTimeout(() => {$("#add-comment-failure").fadeToggle(500);}, 3000);
                                } else {
                                    $("#add-comment-failure").hide();
                                    $("#add-comment-failure").text("An unexpected error occured. Please try again later.");
                                    $("#add-comment-failure").fadeToggle(500);
                                    setTimeout(() => {$("#add-comment-failure").fadeToggle(500);}, 3000);
                                }
                            }
                        });
                    }
                }}/>    
                <span className="form-failure" id="add-comment-failure" />
                <span className="form-failure" style={{color: "green"}} id="add-comment-success" />
            </form>
            <hr color="black" />
        </div>
    );
}

export default CommentForm;