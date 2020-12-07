// This box contains the main content of the blog - the image, title, author, date, and main blog body.

function BlogBox(props) {
    return (
        <div className="container blog-box">
            <h1 className="blog-title">{props.post.title}</h1>
            <p className="blog-subtitle">{props.post.author}, {props.post.datetime}</p>
            <img className="blog-feature-image col-12" style={{padding: 0}} src={process.env.PUBLIC_URL + props.post.image} alt="blogheader" />
            <div style={{fontFamily: "'Raleway', sans-serif", fontSize: "1.05rem", whiteSpace: "pre-line"}}>{props.post.content}</div>
        </div>
    );
}

export default BlogBox;