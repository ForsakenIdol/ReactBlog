import React from 'react';

import BlogBox from '../Sections/BlogBox';
import CommentForm from '../Components/CommentForm';
import CommentBox from '../Sections/CommentBox';

class BlogPost extends React.Component {
    
    getBlogPost(address) {
        fetch(address).then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error("Featured blog response was not ok.");
            }
            return response.json();
        }).then(result => {
            console.log(result[0]);
            console.log(result[1]);
            this.setState({
                post: result[0],
                comments: result[1],
                author: result[2].username
            });
        }).catch(error => {console.log("Error during fetch: " + error);});
    }

    componentDidMount() {
        console.log("Blog post mounted!");
        this.getBlogPost("http://localhost:8080/api/blog/posts/" + this.props.match.params.id);
    }

    render() {
        console.log("Path id param: " + this.props.match.params.id);
        console.log(typeof(this.props.match.params.id));
        console.log(parseInt(this.props.match.params.id));
        return (
            <div className="blog-post">
                <BlogBox post={this.state ? this.state.post : ""} author={this.state ? this.state.author : ""}/>
                <CommentForm />
                <CommentBox comments={this.state ? this.state.comments: ""} />
            </div>
        );
    }   

}

export default BlogPost;