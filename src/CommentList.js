import React, { useState, useEffect } from "react"
import axios from "axios"

export default ({ comments }) => {
    console.log("shrek: ", comments)

    const renderedComments = comments.map(comment => {
        let content

        console.log("khgkjh", comment)

        if (comment.status === "approved") {
            content = comment.comment
        }

        if (comment.status === "pending") {
            content = "This comment is awaiting moderation"
        }

        if (comment.status === "rejected") {
            content = "This comment has been rejected"
        }

        return <li key={comment.id}>{content}</li>
    })

    return <ul>{renderedComments}</ul>
}
