const mongoose = require("mongoose")

const shortUrlSchema = new mongoose.Schema({
    originalUrl : String,
    hash: String,
    expiryTime: Date
})

shortUrlSchema.set("timestamps", true)

const ShortUrl = mongoose.model("urls", shortUrlSchema)

module.exports = ShortUrl