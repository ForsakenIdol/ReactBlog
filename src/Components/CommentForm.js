
function CommentForm(props) {
    return (
        <div className="comment-form container">
            <hr color="black" />
            <h3 className="comment-section-title">Leave a comment</h3>
            <form action="http://localhost:8080/" method="POST" className="add-comment" id="add-comment-form">
                <input name="post_id" type="text" value={props.post_id} readOnly hidden />
                <textarea className="form-control" style={{minHeight: "5rem", marginTop: "1rem", border: "1px solid black", borderRadius: "0.5rem"}} name="content" placeholder="What do you want to say?" id="add-comment-content" required=""></textarea>
                <br />
                <input type="submit" className="btn btn-dark" id="add-comment-submit" />
            </form>
            <hr color="black" />
        </div>
    );
}

export default CommentForm;