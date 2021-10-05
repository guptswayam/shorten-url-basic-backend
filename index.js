const express = require("express")
const app = express();
const cors = require("cors")
const db = require("./models/index")
const {createHash, decodeHash} = require("./utils/hashGenerator")
// https://stackoverflow.com/questions/11326598/how-do-url-shorteners-guarantee-unique-urls-when-they-dont-expire


db.sequelize.authenticate().then(() => {
    console.log("database connected!")
}).catch(err => {
    console.log(err)
})

app.use(express.json())
app.use(cors({origin: true}))



app.post("/shortenUrl", async (req, res) => {
    const {originalUrl} = req.body
    const [url, created] = await db.Url.findOrCreate({where: {url: originalUrl}})
    res.json({shortUrl: "http://localhost:5000/get/" + createHash(url.id)})
})


app.get("/get/:hash", async (req, res) => {
    const hash = req.params.hash
    const url = await db.Url.findOne({where : {id: decodeHash(hash)}})

    res.redirect(url.url)

})

app.get("/urls", async (req, res) => {
    const urls = await db.Url.findAll()

    res.json(urls)

})


app.listen(5000, () => {
    console.log("Server Started!")
})