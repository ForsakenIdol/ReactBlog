
import React from 'react';
import Comment from '../Components/Comment';

class CommentBox extends React.Component {

    renderComments(comments) {
        if (!comments) return (<p>No comments provided!</p>);
        let result = []
        for (let i = 0; i < comments.length; i++) {
            this.state && this.state.access === "unique" ? 
            result.push(
                <Comment key={i} id={comments[i].id} author={comments[i].username} datetime={comments[i].publish_datetime} content={comments[i].content} admin={true} handleDelete={this.handleDelete.bind(this)} />
            ) :
            result.push(
                <Comment key={i} author={comments[i].username} datetime={comments[i].publish_datetime} content={comments[i].content} />
            );
            result.push(
                <hr key={100 + i} style={{borderColor: "grey", marginTop: "2rem"}}/>
            );
        }
        if (result.length == 0) return (<p>No comments yet!</p>);
        return result;
    }

    // This function is called when a comment's delete button is pressed.
    handleDelete(id) {
        fetch(`http://localhost:5000/comment/${id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({accessToken: localStorage.getItem("accessToken"), id: id})
        }).then(response => {if (!response.ok) throw new Error("Comment delete response was not ok."); return response.json();})
          .then(result => {
              console.log(result);
          }).catch(error => {console.log(error);});
    }

    verify_token() {
        let token = localStorage.getItem("accessToken");
        if (token) {
            fetch("http://localhost:5000/payload", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({accessToken: localStorage.getItem("accessToken")})
            }).then(response => {if (!response.ok) throw new Error("Payload response was not ok."); return response.json();})
              .then(result => {
                  console.log(result);
                  if (result.status !== "error") this.setState({
                      access: result.payload.access 
                  });
              })
        }
    }

    componentDidMount() {
        this.verify_token();
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