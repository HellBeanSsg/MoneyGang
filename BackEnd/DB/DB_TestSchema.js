const mongoose = require("mongoose");

module.exports = () => {
    const hellbeanssg = mongoose.Schema({
        Name    : "string",
        Age     : "number",
    });
    return mongoose.model("Member", hellbeanssg);
};