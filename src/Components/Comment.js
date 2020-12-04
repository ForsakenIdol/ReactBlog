
function Comment(props) {
    return (
        <div style={{margin: "1rem 0"}}>
            <p style={{fontWeight: "bold"}}>{props.author}, {props.datetime}</p>
            <p style={{fontSize: "0.9rem"}}>{props.content}</p>
            <a href="/" style={{fontFamily: "'Sahitya', serif", fontWeight: "bold", color: "#333", fontStyle: "italic"}}>{props.admin ? "Remove" : ""}</a>
        </div>
    );
}

export default Comment;