// This box contains the main content of the blog - the image, title, author, date, and main blog body.

function BlogBox(props) {
    return (
        <div className="container blog-box">
            <h1 className="blog-title">{props.title}</h1>
            <p className="blog-subtitle">{props.author}, {props.datetime}</p>
            <img className="blog-feature-image col-12" style={{padding: 0}} src={props.image} alt="blogheader" />
            <div style={{fontFamily: "'Raleway', sans-serif", fontSize: "1.05rem", whiteSpace: "pre-line"}}>{props.content}</div>
        </div>
    );
}

export default BlogBox;