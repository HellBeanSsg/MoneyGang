const mongoose = require("mongoose");

module.exports = () => {
    const hellbeanssg = mongoose.Schema({
        name    : "string",
        age     : "number",
    });
    return mongoose.model("Member", hellbeanssg);
};