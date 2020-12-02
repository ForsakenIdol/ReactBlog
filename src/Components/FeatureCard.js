// The featured card is a preview card for a post that has been featured.
// There will likely only be 2 or 3 featured cards on the blog's homepage.

import React from 'react';

class FeatureCard extends React.Component {
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
            <div className="feature-card row">
                <div className="col-8"> {/* Title and description */}
                    <h3 className="post-title">{this.state.title}</h3>
                    <p>{this.state.description}</p>
                </div>
                <div className="col-1">

                </div>
                <div className="col-3"> {/* Image */}
                    <img src={this.state.image} alt="green placeholder" class="feature-image" />
                </div>
            </div>
        );
    }
}

export default FeatureCard;