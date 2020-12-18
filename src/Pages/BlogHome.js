import React from 'react';

import TitleCard from '../Components/TitleCard';
import FeaturedBox from '../Sections/FeaturedBox';
import PostBox from '../Sections/PostBox';

// The constructor can later initialize this component with state regarding the blog post information.
// For now, we'll hardcode everything.
class BlogHome extends React.Component {

    getBlogData(address) {
        fetch(address).then(response => {
            if (!response.ok) {throw new Error("Blog response was not ok.");}
            return response.json();
        }).then(result => {
            let domain = "http://localhost:3000";
            let titles = []; let subtitles = []; let images = []; let links = [];
            let featuredTitles = []; let featuredSubtitles = [];
            let featuredImages = []; let featuredLinks = []
            for (let i = 0; i < result.length; i++) {
                titles.push(result[i].title);
                subtitles.push(result[i].subtitle);
                images.push(result[i].image_link);
                links.push(domain + "/post/" + result[i].id);
                if (result[i].featured) {
                    featuredTitles.push(result[i].title);
                    featuredSubtitles.push(result[i].subtitle);
                    featuredImages.push(result[i].image_link);
                    featuredLinks.push(domain + "/post/" + result[i].id);
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
        }).catch(error => {console.log("Error during fetch: " + error)});
    }

    // Setting state in componentDidMount will trigger a re-render, just like it did for my weather app.
    componentDidMount() {
        // Here we'll fetch the data from our server and set state using that data (this.setState()).
        this.getBlogData("http://localhost:5000/api/blog/posts");
    }

    render() {
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
                <p className="container" style={{marginBottom: "3rem"}}>Looking for the old blog layout?
                It's <a href="https://forsakenidol.com/blog" target="_blank" rel="noreferrer" className="inline-link">here</a>.</p>
            </div>
        );
    }

}

export default BlogHome;