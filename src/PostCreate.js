import React, { useState } from "react"
import axios from "axios"

export default () => {
    // Declare a new state variable, which we'll call "count"
    const [postText, setPostText] = useState("")

    const onSubmit = async event => {
        event.preventDefault()

        // make request
        await axios.post("http://localhost:5000/posts", {
            postText
        })

        setPostText("")
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>
                        <h2>Title</h2>
                    </label>
                    <input value={postText} onChange={e => setPostText(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
