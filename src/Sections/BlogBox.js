function BlogBox(props) {
    return (
        <div className="container blog-box">
            <img src={props.image} alt="blogheader" />
        <h3 className="blog-title">{props.title}</h3>
        <p class="blog-subtitle">{props.author}, {props.date}</p>
        <div style={{fontFamily: "'Raleway', sans-serif", fontSize: "1.05rem", whiteSpace: "pre-line"}}>{props.content}</div>
        </div>
    );
}