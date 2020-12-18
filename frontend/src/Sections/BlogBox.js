// This box contains the main content of the blog - the image, title, author, date, and main blog body.

const BlogBox = ({ post, admin, deletePost }) => {
    console.log("Mounted box!");
    return (
        <div className="container blog-box">
            <h1 className="blog-title">{post.title}</h1>
            <p className="blog-subtitle">{post.author}, {post.publish_datetime ? post.publish_datetime.split('T')[0] : post.publish_datetime}</p>
            {admin ? <button className="delete-post" onClick={() => deletePost(post.id)}>Delete</button> : null}
            <img className="blog-feature-image col-12" style={{padding: 0}} src={post.image_link} alt="blogheader" />
            <div style={{fontFamily: "'Raleway', sans-serif", fontSize: "1.05rem", whiteSpace: "pre-line"}}>{post.content}</div>
        </div>
    );
}

export default BlogBox;