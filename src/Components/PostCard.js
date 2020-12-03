// The post card contains information about a blog post that has not been featured.
// All posts will be displayed in this form, including those which are also featured in a Feature Card.

import React from 'react';

class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            image: this.props.image
        }
    }

    render() {
        return (
            <div className="post-card col-6">
                <img src={this.state.image} alt="placeholder" class="post-image" />
                <h3 className="post-title">{this.state.title}</h3>
                <p>{this.state.description}</p>
            </div>
        );
    }
}

export default PostCard;