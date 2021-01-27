const mongoose = require("mongoose");

module.exports = () => {
    const HellBeanSsg = mongoose.Schema({
        name    : "string",
        age     : "number",
    });
    return mongoose.model("Member", HellBeanSsg);
}