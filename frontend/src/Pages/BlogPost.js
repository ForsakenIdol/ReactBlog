import React from 'react';
import { Redirect } from 'react-router-dom';

import BlogBox from '../Sections/BlogBox';
import CommentForm from '../Components/CommentForm';
import CommentBox from '../Sections/CommentBox';

class BlogPost extends React.Component {
    
    getBlogPost(address) {
        fetch(address).then(response => {
            if (!response.ok) {throw new Error("Featured blog response was not ok.");}
            return response.json();
        }).then(result => {
            if (result.status !== "error") {
                this.setState({
                    post: result[0],
                    comments: result[1],
                    author: result[2].username
                });
            } else this.setState({status: "error"});
        }).catch(error => {console.log("Error during fetch: " + error);});
    }

    update_this() {
        this.getBlogPost("http://localhost:5000/api/blog/posts/" + this.props.match.params.id);
        // Redirect on failed access
        if (this.state.status === "error") this.props.history.replace('/');
        else this.forceUpdate();
    }

    verify_token() {
        let token = localStorage.getItem("accessToken");
        if (token) {
            fetch("http://localhost:5000/payload", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({accessToken: localStorage.getItem("accessToken")})
            }).then(response => {if (!response.ok) throw new Error("Payload response was not ok."); return response.json();})
              .then(result => {
                  console.log(result);
                  if (result.status !== "error") this.setState({
                      access: result.payload.access
                  });
              })
        }
    }

    handlePostDelete(id) {
        console.log(`Handling delete of blog post with ID ${id}.`);
        fetch(`http://localhost:5000/post/${id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({accessToken: localStorage.getItem("accessToken"), id: id})
        }).then(response => {if (!response.ok) throw new Error("Post delete response was not ok."); return response.json();})
            .then(result => {
                console.log(result);
                if (result.status === "success") this.props.history.replace('/');
            }).catch(error => {console.log(error);});
    }

    componentDidMount() {
        this.getBlogPost("http://localhost:5000/api/blog/posts/" + this.props.match.params.id);
        this.props.handleStatus();
        this.verify_token();
    }

    render() {
        if (this.state) {
            if (!(this.state.status === "error")) {
                return (
                    <div className="blog-post">
                        <BlogBox post={this.state ? this.state.post : []} author={this.state ? this.state.author : ""}
                        admin={this.state && this.state.access === "unique" ? true : false} id={this.props.match.params.id}
                        handlePostDelete={this.state && this.state.access === "unique" ? this.handlePostDelete.bind(this) : null}/>
                        <CommentForm post_id={this.props.match.params.id} update_this={this.update_this.bind(this)}/>
                        <CommentBox comments={this.state ? this.state.comments: []} update_this={this.update_this.bind(this)}/>
                    </div>
                );
            } else return <Redirect to='/'/>;
        } else return (<div className="blog-post"></div>);
    }   

}

export default BlogPost;