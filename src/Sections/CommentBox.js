
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
        return (
            <div class="container comment-box">
                <h3 class="comment-section-title">{header}</h3>
                {this.renderComments(this.props.comments)}
            </div>
        );
    }
}

export default CommentBox;