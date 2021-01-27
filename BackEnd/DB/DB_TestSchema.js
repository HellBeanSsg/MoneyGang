const Mongoose = require("mongoose");

module.exports = () => {
    const hellbeanssg = Mongoose.Schema({
        name    : "string",
        age     : "number",
    });
    return Mongoose.model("Member", hellbeanssg);
};