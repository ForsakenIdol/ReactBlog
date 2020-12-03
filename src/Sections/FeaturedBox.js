// This box contains the featured posts title, and a list of 2 or 3 featured posts.

import React from 'react';
import FeatureCard from '../Components/FeatureCard';

class FeaturedBox extends React.Component {

    renderFeatured(titles, descriptions, images) {
        if (!(titles.length === descriptions.length === images.length)) console.log("We don't have the same number of titles, descriptions, and images!");
        let cards = [];
        for (let i = 0; i < titles.length; i++) {
            if (images[i].contains('/')) console.log(`Image ${images[i]} contains a backslash '/'.\
            This may be the reason why the image is not displaying. Include only the name of the image or its path starting from the public folder.`);
            cards.push(
                <FeatureCard title={titles[i]} description={descriptions[i]} image={process.env.PUBLIC_URL + '/' + images[i]}/>
            );
        }
        return cards;
    }

    render() {
        let titles = ["A sample card", "The second sample"]
        let descriptions = [
            "This is a test description. It is meant to take up a fair amount of space so that the styling and width of this paragraph element can be tested, and so that the size can be adjusted if needed. HD 16:9 and widescreen image resolutions work the best as backgrounds for these images.",
            "This is another paragraph element. It is significantly shorter than the previous one."
        ]
        let images = ["wideimg1.jpg", "squareimg2.png"]
        return (
        <div className="featured-box row">
            <div className="col-2" />
            <div className="col-8">
                <h2 className="section-header" >Featured Posts</h2>
                {this.renderFeatured(titles, descriptions, images)}
            </div>
        </div>
        );
    };
}

export default FeaturedBox;