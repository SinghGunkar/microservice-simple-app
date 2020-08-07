const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const colors = require("colors")

const app = express()
app.use(bodyParser.json())

const events = []

app.post("/events", (req, res) => {
    const event = req.body

    events.push(event)

    // send to posts service
    axios.post("http://localhost:5000/events", event)

    // send to comments service
    axios.post("http://localhost:6001/events", event)

    // // send to query service
    axios.post("http://localhost:6006/events", event)

    // send to moderation service
    axios.post("http://localhost:4500/events", event)

    console.log("Event object: ", event)

    res.send({ status: "Ok" })
})

app.get("/events", (req, res) => {
    res.send(events)
})

app.listen(5006, () => {
    console.log("Event-bus service listening on port 5006")
})
