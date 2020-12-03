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
            <div className="jumbotron feature-card"
                style={{background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${this.state.image})`,
                        backgroundPosition: "center center"}}>
                <h3>{this.state.title}</h3>
                <p className="lead">{this.state.description}</p>
            </div>
        );
    }
}

export default FeatureCard;