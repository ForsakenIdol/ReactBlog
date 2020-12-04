// This box contains the all posts title, and a list of PostBox objects, each of which corresponds to a blog post.

import React from 'react';
import PostCard from '../Components/PostCard';

class PostBox extends React.Component {

    renderPosts(titles, subtitles, images, postsPerLine) {
        if (![1, 2, 3, 4, 6, 12].includes(postsPerLine)) console.log("Posts per line is an awkward number! Attempting anyway...");
        if (titles.length === 0 || subtitles.length === 0) return (<p>No posts yet!</p>);
        let cards = [];
        let elements = []
        let cardKey = 100;
        for (let i = 0; i < titles.length; i++) {
            if (i % postsPerLine === 0 && i > 0) {
                cards.push(<div key={cardKey++} className="row">{elements}</div>);
                elements = [];
            }
            if (images[i].includes('/')) console.log(`Image ${images[i]} contains a backslash '/'. This may be the reason why the image is not displaying. Include only the name of the image or its path starting from the public folder.`);
            elements.push(
                <PostCard key={i} title={titles[i]} subtitle={subtitles[i]} image={images[i]} postWidth={12 / postsPerLine} />
            );
        }
        cards.push(<div key={cardKey} className="row">{elements}</div>);
        return cards;
    }

    render() {
        return (
            <div className="post-box container">
                <h2 className="section-header">All Posts</h2>
                {this.renderPosts(this.props.titles, this.props.subtitles, this.props.images, this.props.postsPerLine)}
            </div>
        );
    }
}

export default PostBox;