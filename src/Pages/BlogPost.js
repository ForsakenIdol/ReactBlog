import React from 'react';

import Navbar from '../Components/Navbar';
import BlogBox from '../Sections/BlogBox';
import CommentForm from '../Components/CommentForm';
import CommentBox from '../Sections/CommentBox';

class BlogPost extends React.Component {
    
    render() {
        let image = process.env.PUBLIC_URL + '/wideimg1.jpg';
        let title = "A Test Post"
        let author = "ForsakenIdol";
        let datetime = "20/11/2020 14:00:00";
        let content = "This is test content.\nLet's see how this renders!"

        return (
            <div className="blog-post">
                <Navbar />
                <BlogBox image={image} title={title} author={author} datetime={datetime} content={content}/>
                <CommentForm />
                <CommentBox />
            </div>
        );
    }

}

export default BlogPost;