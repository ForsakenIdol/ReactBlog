import React from 'react';

import TitleCard from '../Components/TitleCard';
import Navbar from '../Components/Navbar';
import FeaturedBox from '../Sections/FeaturedBox';
import PostBox from '../Sections/PostBox';

// The constructor can later initialize this component with state regarding the blog post information.
// For now, we'll hardcode everything.
class BlogHome extends React.Component {

    // Setting state in componentDidMount will trigger a re-render, just like it did for my weather app.
    componentDidMount() {
        console.log("Blog mounted!");
        // Here we'll fetch the data from our server, which will probably be on something like "localhost:8080", and set state using that data (this.setState()).
    }

    render() {
        console.log("Loading blog home!");
        return (
            <div className="blog-home">
                <Navbar logged_in={false} />
                <TitleCard />
                <FeaturedBox />
                <PostBox />
            </div>
        );
    }

}

export default BlogHome;