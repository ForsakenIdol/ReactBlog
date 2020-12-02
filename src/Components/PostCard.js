// The post card contains information about a blog post that has not been featured.
// All posts will be displayed in this form, including those which are also featured in a Feature Card.

import React from 'react';

class PostCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="post-card col-4">
                <p>Test Box 1</p>
            </div>
        );
    }
}

export default PostCard;