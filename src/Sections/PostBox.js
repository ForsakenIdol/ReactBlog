// This box contains the all posts title, and a list of PostBox objects, each of which corresponds to a blog post.

import React from 'react';
import PostCard from '../Components/PostCard';

class PostBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let desc1 = "This describes a post in the normal blog previous format. Let's see how long we can make this before it breaks the preview! It may have to be very long, or on the other hand, the box may not take very much to break at all.";
        let desc2 = "Here's another blog description, except this one's a lot shorter than the one above."
        return (
            <div className="post-box row">
                <div className="col-1" />
                <div className="col-10">
                    <h2 className="section-header">All Posts</h2>
                    <div className="row">
                        <PostCard title="A Normal Post" description={desc1} image={process.env.PUBLIC_URL + '/squareimg1.png'} />
                        <PostCard title="Yet Another Norm" description={desc2} image={process.env.PUBLIC_URL + '/squareimg2.png'}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostBox;