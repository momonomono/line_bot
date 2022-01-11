const https = require("https");
const line = require("@line/bot-sdk");
const express = require("express");

const PORT = process.env.PORT || 3000


const config = {
    channelSecret: "3b57de0e68aa30e8fbd6516c0474b56e",
    channelAccessToken: "nYVJ00AE21h1B4ATVhSZqE0EZShWK6CsJyi3YBmeKjsh3IJl5D8WCqFNER/45p3AyllnYN96nwIfF4DF2kZt2FSbAk5Yp733mqZq485G97Bran6DJRfIsPjukwd5C1X8d19u0yMCl4DwUYBRGZ33SQdB04t89/1O/w1cDnyilFU="
}


const app = express();
const client = new line.Client(config);


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.post("/callback", line.middleware(config), function (req, res) {

    Promise
        .all(req.body.events.map(handleEvent))
        .then((result)=>res.json(result))
})

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text 
    });
}



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})