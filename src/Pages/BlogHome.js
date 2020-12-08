import React from 'react';

import TitleCard from '../Components/TitleCard';
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
            let titles = []; let subtitles = []; let images = []; let links = [];
            let featuredTitles = []; let featuredSubtitles = [];
            let featuredImages = []; let featuredLinks = []
            for (let i = 0; i < result.length; i++) {
                titles.push(result[i].title);
                subtitles.push(result[i].subtitle);
                images.push(result[i].image_link);
                links.push(result[i].link);
                if (result[i].featured) {
                    featuredTitles.push(result[i].title);
                    featuredSubtitles.push(result[i].subtitle);
                    featuredImages.push(result[i].image_link);
                    featuredLinks.push(result[i].link);
                }
            }
            this.setState({
                featuredTitles: featuredTitles,
                featuredSubtitles: featuredSubtitles,
                featuredImages: featuredImages,
                featuredLinks: featuredLinks,
                titles: titles,
                subtitles: subtitles,
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
        this.getBlogData("http://localhost:8080/api/blog/posts");
    }

    render() {
        console.log("Loading blog home!");
        return (
            <div className="blog-home">
                <TitleCard />
                <FeaturedBox 
                    titles={this.state ? this.state.featuredTitles : []}
                    subtitles={this.state ? this.state.featuredSubtitles : []}
                    images={this.state ? this.state.featuredImages : []}
                    links={this.state ? this.state.featuredLinks : []}
                />
                <PostBox 
                    titles={this.state ? this.state.titles : []}
                    subtitles={this.state ? this.state.subtitles : []}
                    images={this.state ? this.state.images : []}
                    links={this.state ? this.state.links : []}
                />
            </div>
        );
    }

}

export default BlogHome;