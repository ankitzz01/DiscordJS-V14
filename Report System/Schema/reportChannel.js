const { model, Schema} = require("mongoose")

module.exports = model("candydb", new Schema({

    Guild: String,
    Channel: String

}))
