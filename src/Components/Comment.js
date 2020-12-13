
function Comment(props) {
    let datetime = props.datetime.split('T');
    return (
        <div style={{margin: "1rem 0"}}>
            <p style={{fontWeight: "bold"}}>{props.author}, {datetime[0]} {datetime[1].split('.')[0]}</p>
            <p style={{fontSize: "0.9rem"}}>{props.content}</p>
            <a href="/" style={{fontFamily: "'Sahitya', serif", fontWeight: "bold", color: "#333", fontStyle: "italic"}}>{props.admin ? "Remove" : ""}</a>
        </div>
    );
}

export default Comment;