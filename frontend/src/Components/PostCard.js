// The post card contains information about a blog post that has not been featured.
// All posts will be displayed in this form, including those which are also featured in a Feature Card.

function PostCard(props) {
    let className = "post-card col-";
    switch (props.postWidth) {
        case 1:
            className += '1';
            break;
        case 2:
            className += '2';
            break;
        case 3:
            className += '3';
            break;
        case 4:
            className += '4';
            break;
        case 6:
            className += '6';
            break;
        case 12:
            className += '12';
            break;
        default:
            className += '6';
            break;
    }
    return (
        <button className={className} onClick={e => {e.preventDefault(); window.location.href = props.link ? props.link : "#"}}>
            <img src={props.image} alt="placeholder" className="post-image" />
            <h3 className="post-title">{props.title}</h3>
            <p>{props.subtitle}</p>
        </button>
    );
}

export default PostCard;