const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handleEvent = (type, data) => {
    if (type === "PostCreated") {
        const { id, postText } = data

        posts[id] = { id, postText, comments: [] }
        console.log("Data object (PC): ", posts)
    }

    if (type === "CommentCreated") {
        const { id, comment, postId, status } = data

        const post = posts[postId]
        post.comments.push({ id, comment, status })
        console.log("Data object (CC): ", posts)
    }

    if (type === "CommentUpdated") {
        const { id, comment, postId, status } = data

        const post = posts[postId]
        const comment_test = post.comments.find(comment => {
            return comment.id === id
        })

        comment_test.status = status
        comment_test.comment = comment
        console.log("Data object (CU): ", posts)
    }
}

app.get("/posts", (req, res) => {
    console.log("Posts object sent: ", posts)
    res.send(posts)
})

app.post("/events", (req, res) => {
    const { type, data } = req.body

    handleEvent(type, data)

    res.send({})
})

app.listen(6006, async () => {
    console.log("Query service listening on 6006")

    const res = await axios.get("http://localhost:5006/events")

    for (let event of res.data) {
        console.log("Processing event: ", event.type)
        console.log("Event looks like this: ", event)
        handleEvent(event.type, event.data)
    }
})
