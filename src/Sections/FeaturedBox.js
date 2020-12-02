// This box contains the featured posts title, and a list of 2 or 3 featured posts.

import React from 'react';
import FeatureCard from '../Components/FeatureCard';

class FeaturedBox extends React.Component {

    render() {
        let desc1 = "This is a test description. It is meant to take up a fair amount of space so that the styling and width of this paragraph element can be tested, and so that the size can be adjusted if needed.";
        let desc2 = "This is another paragraph element. It is significantly shorter than the previous one.";
        return (
        <div className="featured-box row">
            <div className="col-2" />
            <div className="col-8">
                <h2 className="section-header" >Featured Posts</h2>
                <FeatureCard title="A sample card" description={desc1} image={process.env.PUBLIC_URL + '/squareimg1.png'}/>
                <FeatureCard title="Another sample" description={desc2} image={process.env.PUBLIC_URL + '/squareimg2.png'}/>
            </div>
        </div>
        );
    };
}

export default FeaturedBox;