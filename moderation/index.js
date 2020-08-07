const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())

app.post("/events", async (req, res) => {
    console.log("TESTING", req.body)

    const { type, data } = req.body

    if (type === "CommentCreated") {
        const status = data.comment.includes("orange") ? "rejected" : "approved"

        await axios.post("http://localhost:5006/events", {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                comment: data.comment
            }
        })
    }

    console.log(req.body)

    res.send({})
})

app.listen(4500, () => {
    console.log("Moderation service listening on 4500")
})
