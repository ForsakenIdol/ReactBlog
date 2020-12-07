
import React from 'react';
import Comment from '../Components/Comment';

class CommentBox extends React.Component {

    renderComments(comments) {
        if (!comments) return (<p>No comments yet!</p>);
        let result = []
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].post_id === this.props.post_id) {
                result.push(
                    <Comment key={i} author={comments[i].author} datetime={comments[i].datetime} content={comments[i].content} admin={comments[i].admin}/>
                );
                result.push(
                    <hr key={100 + i} colour="grey" style={{marginTop: "2rem"}}/>
                );
            }
        }
        if (result.length == 0) return (<p>No comments yet!</p>);
        return result;
    }

    render() {
        let header = this.props.comments && this.props.comments.length > 0 ? `Comments (${this.props.comments.length})` : "Comments";
        return (
            <div className="container comment-box">
                <h3 className="comment-section-title">{header}</h3>
                {this.renderComments(this.props.comments)}
            </div>
        );
    }
}

export default CommentBox;