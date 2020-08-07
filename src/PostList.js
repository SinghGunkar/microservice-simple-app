import React, { useState, useEffect } from "react"
import axios from "axios"
import CommentCreate from "./CommentCreate"
import CommentList from "./CommentList"

export default () => {
    const [posts, setPosts] = useState(0)

    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:6006/posts")
        console.log("Post data: ", res.data)
        setPosts(res.data)
    }

    useEffect(() => {
        // Hit Api
        fetchPosts()
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
        console.log(posts)
        return (
            <div className="card" style={{ width: "100%", marginBottom: "20px" }} key={post.id}>
                <div className="card-body">
                    <h3>{post.postText}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    })

    return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>
}
