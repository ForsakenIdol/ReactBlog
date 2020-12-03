// This box contains the all posts title, and a list of PostBox objects, each of which corresponds to a blog post.

import React from 'react';
import PostCard from '../Components/PostCard';

class PostBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: ["A Normal Post", "Yet Another Post", "What's this? Another post!"],
            descriptions: ["This describes a post in the normal blog previous format. Let's see how long we can make this before it breaks the preview! It may have to be very long, or on the other hand, the box may not take very much to break at all. From what I can see, the description renders fine on a computer, but it looks absolutely horrendous on a phone screen.",
                            "Here's another blog description, except this one's a lot shorter than the one above.",
                            "Oh there's another post as well! Let's see what this one's about. This has a description with a length roughly in between the first and the second one."
            ],
            images: ["squareimg1.png", "squareimg2.png", "wideimg1.jpg"],
            postsPerLine: 2
        }
    }

    renderPosts(titles, descriptions, images, postsPerLine) {
        if (![1, 2, 3, 4, 6, 12].includes(postsPerLine)) console.log("Posts per line is an awkward number! Attempting anyway...");
        if (!(titles.length === descriptions.length === images.length)) console.log("We don't have the same number of titles, descriptions, and images!");
        if (titles.length == 0 || descriptions.length == 0) return (<p>No posts yet!</p>);
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
                {this.renderPosts(this.state.titles, this.state.descriptions, this.state.images, this.state.postsPerLine)}
            </div>
        );
    }
}

export default PostBox;