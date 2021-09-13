const express = require("express")
const app = express();
const uuid = require("uuid")
const mongoose = require("mongoose");
const ShortUrl = require("./shortenUrl");
const schedule = require('node-schedule');
const cors = require("cors")

app.use(express.json())
app.use(cors({origin: true}))
mongoose.connect("mongodb://localhost:27017/shorten-urls", {
    
}).then(() => {
    console.log("database connected!")
})
console.log(uuid.v1())
async function getHashByDB(originalUrl) {
    return ShortUrl.findOneAndUpdate({originalUrl}, {expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000)}, {new: true})
}

app.post("/shortenUrl", async (req, res) => {
    const {originalUrl} = req.body

    const hashObj = await getHashByDB(originalUrl)

    if(hashObj)
        return res.status(200).json({shortenUrl: "http://localhost:5000/get/" + hashObj.hash})

    const shortenHash = uuid.v1()

    const shorturlObj = ShortUrl.create({
        originalUrl, hash: shortenHash,
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    return res.status(200).json({shortenUrl: "http://localhost:5000/get/" + shortenHash})
})


app.get("/get/:hash", async (req, res) => {
    const hash = req.params.hash

    const shortenObj = await ShortUrl.findOne({
        hash
    })

    res.redirect(shortenObj.originalUrl)

})


const job = schedule.scheduleJob('*/30 * * * *', async function(){
    await ShortUrl.deleteMany({expiryTime: {$lt: new Date()}})
});

app.listen(5000, () => {
    console.log("Server Started!")
})