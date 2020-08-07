const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())
app.use(cors())

// data structure to hold comments by post id
const commentsByPostId = {}

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post("/posts/:id/comments", async (req, res) => {
    // generate random comment id
    const commentId = randomBytes(4).toString("hex")
    const postId = req.params.id
    const { comment } = req.body

    const comments = commentsByPostId[postId] || []

    comments.push({ id: commentId, comment: comment, status: "pending" })

    commentsByPostId[postId] = comments

    // port 5006 is the event bus
    await axios.post("http://localhost:5006/events", {
        type: "CommentCreated",
        data: {
            id: commentId,
            comment,
            postId: postId,
            status: "pending"
        }
    })

    console.log("Comments by post id: ", commentsByPostId)

    res.status(201).send({ comments })
})

app.post("/events", async (req, res) => {
    console.log("Event Received:", req.body.type)
    console.log("Data : ", req.body)

    const { type, data } = req.body

    if (type === "CommentModerated") {
        const { postId, id, status, comment } = data
        const comments = commentsByPostId[postId]

        const comment_test = comments.find(comment => {
            return comment.id === id
        })
        comment_test.status = status

        // port 5006 is the event bus
        await axios.post("http://localhost:5006/events", {
            type: "CommentUpdated",
            data: {
                id,
                status,
                postId,
                comment
            }
        })
    }

    res.send({})
})

app.listen(6001, () => {
    console.log("Comments service listening on port 6001")
})
