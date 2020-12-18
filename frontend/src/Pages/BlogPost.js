import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import BlogBox from '../Sections/BlogBox';
import CommentForm from '../Components/CommentForm';
import CommentBox from '../Sections/CommentBox';

const BlogPost = ({ match, handleStatus }) => {
    const [post, setPost] = useState();
    const [access, setAccess] = useState();

    const { getPost, deletePost } = blogPostService();
    const history = useHistory();

    useEffect(async () => {
        handleStatus();
        const token = await verifyToken();
        setAccess(token);
        try {
            const post = await getPost(match.params.id);
            setPost(post);
        } catch {
            console.error('Failed to fetch post');
            history.replace('/');
        }
    }, []);

    if (!post) return <div className="blog-post"></div>;

    return (
        <div className="blog-post">
            <BlogBox id={post.id} post={post} admin={access === 'unique'} deletePost={deletePost} />
            <CommentForm post_id={post.id}/>
            <CommentBox comments={post.comments}/>
        </div>
    );
};

// -- cookies will replace the need for this
// -- maybe a user context if you still need access/roles

const verifyToken = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const response = await fetch("http://localhost:5000/payload", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({accessToken: localStorage.getItem("accessToken")})
    });
    if (!response.ok) throw Error('Failed to fetch token');

    const { status, payload } = await response.json();
    if (status === 'error') throw Error('Failed to fetch token');

    return payload.access;
}

// -- this should be in its own file

const BLOG_POST_API = 'http://localhost:5000/api/blog/posts'; // these should be the same URL, use method to differentiate
const BLOG_POST_API_SCUFFED_DELETE = 'http://localhost:5000/posts';

const blogPostService = () => ({
    getPost: async (id) => {
        const response = await fetch(`${BLOG_POST_API}/${id}`);
        if (!response.ok) throw Error(`Failed to fetch blog post [${response.status}]`); // TODO: we should use http status codes to indicate failure here
        const data = await response.json();
        const [post, comments, author] = data; // TODO: this should return nicely formatted data from the server
        return {
            ...post,
            author,
            comments,
        }
    },
    deletePost: async (id) => {
        const response = await fetch(`${BLOG_POST_API_SCUFFED_DELETE}/${id}`, { 
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, accessToken: localStorage.getItem("accessToken") }) 
        });
        if (!response.ok) throw Error(`Failed to delete blog post [${response.status}]`);
        const data = await response.json(); // use status codes, 200, 403/401, 404, etc to indicate success, authorization, not found here
        return data.status === 'success'; 
    },
    // add a create post function here
});


export default BlogPost;