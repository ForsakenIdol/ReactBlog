// This box contains the main content of the blog - the image, title, author, date, and main blog body.

function BlogBox(props) {
    return (
        <div className="container blog-box">
            <h1 className="blog-title">{props.post.title}</h1>
            <p className="blog-subtitle">{props.author}, {props.post.publish_datetime ? props.post.publish_datetime.split('T')[0] : props.post.publish_datetime}</p>
            {props.admin ? <button className="delete-post" onClick={() => {props.handlePostDelete(props.id)}}>Delete</button> : null}
            <img className="blog-feature-image col-12" style={{padding: 0}} src={props.post.image_link} alt="blogheader" />
            <div style={{fontFamily: "'Raleway', sans-serif", fontSize: "1.05rem", whiteSpace: "pre-line"}}>{props.post.content}</div>
        </div>
    );
}

export default BlogBox;