import { Component } from 'react';
export default class BlogAbout extends Component {

    componentDidMount() {this.props.handleStatus();}

    render() {
        let hrclass = "";
        return (
            <div className="blog-about">
                <h1>About</h1>
                <hr className={hrclass} style={{marginBottom: "4rem", height: "0.15rem", width: "3%"}} color="#555" />
                <p style={{fontSize: "1.5rem"}} >
                    Looking for the old blog layout? It's at my <a href="https://forsakenidol.com/blog" target="_blank" rel="noreferrer" class="inline-link">main</a> page.
                </p>
                <hr className={hrclass} style={{marginTop: "4rem", marginBottom: "3rem", height: "0.1rem", width: "3%"}} color="#555" />
                <div className="container description" style={{textAlign: "center"}} >
                    <div className="col-4" style={{textAlign: "left"}}>
                        <p>This blog is a ground-up rewrite of the blog content management system (CMS) that is currently integrated into the monolith architecture of <a href="https://forsakenidol.com/" target="_blank" rel="noreferrer" className="inline-link">my website</a>. The main goal of this rewrite is to create a separate, modular application which my website can link to on a subdomain - likely <code>blog.forsakenidol.com</code> or something similar. If you have any tips on how I can improve this application, or you just want to say hello, check out my contact page!</p>
                    </div>
                    <div className="col-4" style={{textAlign: "left"}} >
                    <p>While a blog rewrite was long overdue, the reason why it took so long to do so was because I was (among other things) in the process of learning a bunch of new topics and frameworks in web development. Eventually, I completed the React.js tutorial, created a Docker image out of it, and realized that trying to rewrite my blog in React.js was an excellent way to practise using this framework.</p>
                    </div>
                    <div className="col-4" style={{textAlign: "left"}}>
                        <p>React.js is a powerful frontend JavaScript library for building dynamic user interfaces which rely on 3 things - components (parts of a page in layman's terms), props (values passed to a component), and state (internal values tracked by a component). Combined with <code>react-router</code>, fast loading, multi-page Node.js applications can be easily created, such as this blog.</p>
                    </div>
                </div>
            </div>
        );
    }
}