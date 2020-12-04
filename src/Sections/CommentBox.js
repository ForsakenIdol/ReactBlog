
import React from 'react';
import Comment from '../Components/Comment';

class CommentBox extends React.Component {

    renderComments(comments) {
        let result = []
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].post_id === this.props.post_id) {
                result.push(
                    <Comment author={comments[i].author} datetime={comments[i].datetime} content={comments[i].content} admin={comments[i].admin}/>
                );
                result.push(
                    <hr colour="grey" style={{marginTop: "2rem"}}/>
                );
            }
        }
        return result;
    }

    render() {
        let header = this.props.comments && this.props.comments.length > 0 ? `Comments (${this.props.comments.length})` : "Comments";
        let comments = [
            {
                author: "ForsakenIdol",
                datetime: "22/11/2020 13:31:55",
                content: "A fantastic piece of work!",
                admin: true
            },
            {
                author: "Legionator",
                datetime: "22/11/2020 13:45:27",
                content: "You'd think that at 21, people would have a pretty decent idea of where they want to go in industry. Most people in college are in their senior year, myself a rising senior going into honours, and even though you might not have your sights set on the ideal job for you just yet, you probably have a decent idea of what that's going to be, or what kind of work you want to be doing once you get into it. Myself, I'd link to think I've got a decent idea of where I want to go - probably something cybersecurity related or freelancing web development on the side - but I'm still not sure if software is even the right path for me. I feel like I've been doing what I'm meant to be doing, and not necessarily what I want to be doing. And yet, here I am - 2 years into this degree, because there's nothing else out there that I really want to be doing."
            }
        ]
        return (
            <div class="container comment-box">
                <h3 class="comment-section-title">{header}</h3>
                {this.renderComments(comments)}
            </div>
        );
    }
}

export default CommentBox;