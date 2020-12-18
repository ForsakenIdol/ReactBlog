export default function BlogAbout() {
    return (
        <div className="blog-about">
            <h1>About</h1>
            <hr style={{marginBottom: "4rem", height: "0.15rem", width: "3%"}} color="#555" />
            <p style={{fontSize: "1.5rem"}} >
                Looking for the old blog layout? It's at my <a href="https://forsakenidol.com/blog" target="_blank" rel="noreferrer" className="inline-link">main</a> page.
            </p>
            <hr style={{marginTop: "4rem", marginBottom: "3rem", height: "0.1rem", width: "3%"}} color="#555" />
            <div className="container description" style={{textAlign: "center"}} >
                <div className="col-4" style={{textAlign: "left"}}>
                    <p>This blog incorporates a ground-up rewrite of the content management system (CMS) that is currently integrated into the monolith architecture of <a href="https://forsakenidol.com/" target="_blank" rel="noreferrer" className="inline-link">my website</a>. The main goal of this rewrite is to create a separate, modular application which my website can link to on a subdomain - likely <code>blog.forsakenidol.com</code> or something similar. If you have any tips on how I can improve this application, or you just want to say hello, check out my contact page!</p>
                </div>
                <div className="col-4" style={{textAlign: "left"}} >
                <p>While a blog rewrite was long overdue, the reason why it took so long to do so was because I was (among other things) in the process of learning a bunch of new topics and frameworks in web development. Eventually, I completed the React.js tutorial, created a Docker image out of it, and realized that trying to rewrite my blog in React.js was an excellent way to practise using this framework.</p>
                </div>
                <div className="col-4" style={{textAlign: "left"}}>
                    <p>This application is still very much in early development, and so although it possesses the full functionality of the previous monolithic blog, it may be prone to bugs! If you encounter an issue when browsing this blog, please let me know via my contact form. Bonus points if you can explain the nature of the problem, and what you were doing before you encountered the problem - these details may help me pinpoint the source of the issue. Aside from that, thanks for checking out my blog, and I hope you took something away from what you read here!</p>
                </div>
            </div>
        </div>
    );
}
