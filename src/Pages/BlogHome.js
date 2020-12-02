import React from 'react';

import TitleCard from '../Components/TitleCard';
import Navbar from '../Components/Navbar';
import FeaturedBox from '../Sections/FeaturedBox';

// The constructor can later initialize this component with state regarding the blog post information.
// For now, we'll hardcode everything.
class BlogHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="blog-home">
                <Navbar />
                <TitleCard />
                <FeaturedBox />
            </div>
        );
    }

}

export default BlogHome;