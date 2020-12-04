import React from 'react';

import TitleCard from '../Components/TitleCard';
import Navbar from '../Components/Navbar';
import FeaturedBox from '../Sections/FeaturedBox';
import PostBox from '../Sections/PostBox';

// The constructor can later initialize this component with state regarding the blog post information.
// For now, we'll hardcode everything.
class BlogHome extends React.Component {

    getBlogData(address) {
        fetch(address).then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error("Featured blog response was not ok.");
            }
            return response.json();
        }).then(result => {
            console.log(result);
            let titles = []; let descriptions = []; let images = []; let links = [];
            let featuredTitles = []; let featuredDescriptions = [];
            let featuredImages = []; let featuredLinks = []
            for (let i = 0; i < result.length; i++) {
                titles.push(result[i].title);
                descriptions.push(result[i].description);
                images.push(result[i].image);
                links.push(result[i].link);
                if (result[i].featured) {
                    featuredTitles.push(result[i].title);
                    featuredDescriptions.push(result[i].description);
                    featuredImages.push(result[i].image);
                    featuredLinks.push(result[i].link);
                }
            }
            this.setState({
                featuredTitles: featuredTitles,
                featuredDescriptions: featuredDescriptions,
                featuredImages: featuredImages,
                featuredLinks: featuredLinks,
                titles: titles,
                descriptions: descriptions,
                images: images,
                links: links
            });
            console.log("Fetched featured data!");  
        }).catch(error => {console.log("Error during fetch: " + error)});
    }

    // Setting state in componentDidMount will trigger a re-render, just like it did for my weather app.
    componentDidMount() {
        console.log("Blog mounted!");
        // Here we'll fetch the data from our server, which will probably be on something like "localhost:8080", and set state using that data (this.setState()).
        this.getBlogData("http://localhost:8080/api/testblogddata");
    }

    render() {
        console.log("Loading blog home!");
        return (
            <div className="blog-home">
                <Navbar logged_in={false} />
                <TitleCard />
                <FeaturedBox 
                    titles={this.state ? this.state.featuredTitles : []}
                    descriptions={this.state ? this.state.featuredDescriptions : []}
                    images={this.state ? this.state.featuredImages : []}
                    links={this.state ? this.state.featuredLinks : []}
                />
                <PostBox 
                    titles={this.state ? this.state.titles : []}
                    descriptions={this.state ? this.state.descriptions : []}
                    images={this.state ? this.state.images : []}
                    links={this.state ? this.state.links : []}
                />
            </div>
        );
    }

}

export default BlogHome;