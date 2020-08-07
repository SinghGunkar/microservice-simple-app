const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")
const axios = require("axios")
const colors = require("colors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get("/posts", (req, res) => {
    res.send(posts)
})

// post creation
app.post("/posts", async (req, res) => {
    // generate random id for a post
    const id = randomBytes(4).toString("hex")
    const { postText } = req.body

    // creation of post object
    posts[id] = {
        id,
        postText
    }

    console.log("Single post object created: ".green, posts[id])
    console.log("Post object with all posts: ".green, posts)
    console.log("_________________________________")

    // send individual post to event bus
    await axios.post("http://localhost:5006/events", {
        type: "PostCreated",
        data: {
            id,
            postText
        }
    })

    res.status(201).send({})
})

app.post("/events", async (req, res) => {
    console.log("Received Event", req.body.type)

    res.status(201).send({ data: "From posts/index.js" })
})

app.listen(5000, () => {
    console.log("Post's service listening on port 5000")
})
