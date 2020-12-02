// This box contains the all posts title, and a list of PostBox objects, each of which corresponds to a blog post.

import React from 'react';
import PostCard from '../Components/PostCard';

class PostBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="post-box row">
                <div className="col-1" />
                <div className="col-10">
                    <h2 className="section-header">All Posts</h2>
                    <div className="row">
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </div>
                </div>
            </div>
        );
    }
}

export default PostBox;