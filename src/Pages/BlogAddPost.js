import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

export default class BlogAddPost extends React.Component {

    renderError(span, message) {
        
    }

    checkAddPostForm() {

        let title = $("#add-post-title").val();
        let image_link = $("#add-post-image-link").val();
        let content = $("#add-post-content").val();

        let title_error = "Title is required.";
        let image_link_error = "Image link is required.";
        let content_error = "Content is required.";


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
                        <input type="text" name="image_link" className="form-control" style={{ border: "2px solid #555" }} id="add-post-image-link" placeholder="Title" />
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
                        
                        let title = $("#add-post-title").val();
                        let subtitle = $("#add-post-subtitle").val();
                        let image_link = $("#add-post-image-link").val();
                        let content = $("#add-post-content").val();

                        console.log(content);

                    }}>Submit Post</button>
                </form>
            </div>
        );
    }

}