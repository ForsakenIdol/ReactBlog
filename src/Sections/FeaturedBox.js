// This box contains the featured posts title, and a list of 2 or 3 featured posts.

import React from 'react';
import FeatureCard from '../Components/FeatureCard';

class FeaturedBox extends React.Component {

    renderFeatured(titles, subtitles, images, links) {
       if (titles.length == 0 || subtitles.length == 0) return (<p>No featured posts yet!</p>);
        let cards = [];
        for (let i = 0; i < titles.length; i++) {
            if (images[i].includes('/')) console.log(`Image ${images[i]} contains a backslash '/'. This may be the reason why the image is not displaying. Include only the name of the image or its path starting from the public folder.`);
            cards.push(
                <FeatureCard key={i}
                title={titles[i] ? titles[i] : "undefined"}
                subtitle={subtitles[i] ? subtitles[i] : "undefined"}
                image={images[i] ? images[i] : ""}
                link={links[i] ? links[i] : ""}/>
            );
        }
        return cards;
    }

    render() {
        return (
        <div className="featured-box row">
            <div className="col-2" />
            <div className="col-8">
                <h2 className="section-header">Featured Posts</h2>
                {this.renderFeatured(this.props.titles, this.props.subtitles, this.props.images, this.props.links)}
            </div>
        </div>
        );
    };
}

export default FeaturedBox;