import React, { useState } from "react"
import axios from "axios"

export default ({ postId }) => {
    const [comment, setComment] = useState("")

    const onSubmit = async event => {
        event.preventDefault()

        // send to comments service
        await axios.post(`http://localhost:6001/posts/${postId}/comments`, {
            comment
        })

        setComment("")
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Comment</label>
                    <input value={comment} onChange={e => setComment(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
