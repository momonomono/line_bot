const https = require("https");
const express = require("express");

const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN

const app = express();

const config = {
    channelSecret : "",
    channelAccessToken : ""
}

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.sendStatus(200)
})

app.post("/webhook", function(req, res) {
  
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})