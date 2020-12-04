// The featured card is a preview card for a post that has been featured.
// There will likely only be 2 or 3 featured cards on the blog's homepage.

function FeatureCard(props) {
    return (
        <button className="jumbotron feature-card" onClick={e => {e.preventDefault(); window.location.href = props.link ? props.link : "#"}}
            style={{background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${props.image})`,
                    backgroundPosition: "center center"}}>
            <h3>{props.title}</h3>
            <p>{props.subtitle}</p>
        </button>
    );
}

export default FeatureCard;