import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

export default class BlogAddPost extends React.Component {

    renderError(span, message) {
        $(`#${span}`).text(message);
        $(`#${span}`).fadeToggle(500);
        setTimeout(() => {$(`#${span}`).fadeToggle(500);}, 3000);
    }

    checkAddPostForm() {

        let title = $("#add-post-title").val();
        let image_link = $("#add-post-image-link").val();
        let content = $("#add-post-content").val();

        let title_error = "Title is required.";
        let image_link_error = "Image link is required.";
        let content_error = "Content is required.";

        let errors = 0;
        if (title === '') {errors++; this.renderError("add-post-title-error", title_error);}
        if (image_link === '') {errors++; this.renderError("add-post-image-link-error", image_link_error);}
        if (content === '') {errors++; this.renderError("add-post-content-error", content_error);}

        return errors;
    }

    componentDidMount() {
        console.log("BlogAddPost has been mounted.");
        $(".form-failure").hide();
    }

    render() {
        if (!this.props.logged_in) return <Redirect to='/login' />
        else return (
            <div style={{marginTop: "7rem", marginBottom: "5rem"}}>
                <h1 className="form-title">Add a Post</h1>
                <form className="container auth-form" id="add-post-form">
                    <div className="form-group">
                        <label htmlFor="add-post-title" className="form-label" >Title <span style={{color: "red"}}>*</span></label>
                        <input type="text" name="title" className="form-control" style={{ border: "2px solid #555" }} id="add-post-title" placeholder="Title" />
                        <span className="form-failure" id="add-post-title-error"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="add-post-subtitle" className="form-label" >Subtitle</label>
                        <input type="text" name="subtitle" className="form-control" style={{ border: "2px solid #555" }} id="add-post-subtitle" placeholder="Subtitle" />
                        <span className="form-failure" id="add-post-subtitle-error"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="add-post-image-link" className="form-label" >Image Link <span style={{color: "red"}}>*</span></label>
                        <input type="text" name="image_link" className="form-control" style={{ border: "2px solid #555" }} id="add-post-image-link" placeholder="Image Link" />
                        <span className="form-failure" id="add-post-image-link-error"></span>
                        <small id="add-post-image-info" className="form-text text-muted">Please use a valid link to an image on the internet. If you mess this up, use my contact form to let me know, but please check that the image link is valid before you submit this form!</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="add-post-content" className="form-label" >Content <span style={{color: "red"}}>*</span></label>
                        <textarea className="form-control" style={{minHeight: "10rem", border: "2px solid #555", borderRadius: "0.5rem"}} name="content" placeholder="What do you want to say?" id="add-post-content"></textarea>
                        <span className="form-failure" id="add-post-content-error"></span>
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={e => {
                        e.preventDefault();
                        console.clear();
                        console.log("Form submitted!");

                        let body = {
                            title: $("#add-post-title").val(),
                            subtitle: $("#add-post-subtitle").val(),
                            image_link: $("#add-post-image-link").val(),
                            content: $("#add-post-content").val(),
                            accessToken: localStorage.getItem("accessToken")
                        }

                        console.log(body);

                        if (this.checkAddPostForm() === 0) {
                            console.log("Form is ok! Submitting it now.");
                            // The backend needs to not only verify that the token is valid, but the "access" field needs to be "unique".
                            fetch("http://localhost:5000/post", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify(body)
                            }).then(response => {if (!(response.ok)) throw new Error("Post response was not ok."); else return response.json();})
                              .then(result => {
                                  console.log(result);
                                  if (result.status === "success") {$("input").val(""); $("textarea").val(""); this.renderError("add-post-form-success", "Posted successfully!");}
                                  else this.renderError("add-post-form-error", `Error during submit: ${result.reason}`);
                              });
                        }

                    }}>Submit Post</button>
                    <span className="form-failure" id="add-post-form-error"></span>
                    <span className="form-failure" style={{color: "green"}} id="add-post-form-success"></span>
                </form>
            </div>
        );
    }

}