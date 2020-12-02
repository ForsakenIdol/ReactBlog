import './BlogHome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';

import TitleCard from '../Components/TitleCard';
import Navbar from '../Components/Navbar';

// The constructor can later initialize this component with state regarding the blog post information.
// For now, we'll hardcode everything.
class BlogHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar />
                <TitleCard />
            </div>
        );
    }

}

export default BlogHome;