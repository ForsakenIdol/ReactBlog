// This box contains the all posts title, and a list of PostBox objects, each of which corresponds to a blog post.

import React from 'react';
import PostCard from '../Components/PostCard';

class PostBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: ["A Normal Post", "Yet Another Post"],
            descriptions: ["This describes a post in the normal blog previous format. Let's see how long we can make this before it breaks the preview! It may have to be very long, or on the other hand, the box may not take very much to break at all.", "Here's another blog description, except this one's a lot shorter than the one above."],
            images: ["squareimg1.png", "squareimg2.png"]
        }
    }

    renderPosts(titles, descriptions, images, postsPerLine) {
        if (![1, 2, 3, 4, 6, 12].includes(postsPerLine)) console.log("Posts per line is an awkward number! Attempting anyway...");
        if (!(titles.length === descriptions.length === images.length)) console.log("We don't have the same number of titles, descriptions, and images!");
        let cards = [];
        let elements = []
        for (let i = 0; i < titles.length; i++) {
            if (i % postsPerLine === 0 && i > 0) {
                cards.push(<div className="row">{elements}</div>);
                elements = [];
            }
            if (images[i].includes('/')) console.log(`Image ${images[i]} contains a backslash '/'. This may be the reason why the image is not displaying. Include only the name of the image or its path starting from the public folder.`);
            elements.push(
                <PostCard title={titles[i]} description={descriptions[i]} image={process.env.PUBLIC_URL + '/' + images[i]} postWidth={12 / postsPerLine} />
            );
        }
        cards.push(<div className="row">{elements}</div>);
        return cards;
    }

    render() {
        return (
            <div className="post-box container">
                <h2 className="section-header">All Posts</h2>
                {this.renderPosts(this.state.titles, this.state.descriptions, this.state.images, 3)}
            </div>
        );
    }
}

export default PostBox;