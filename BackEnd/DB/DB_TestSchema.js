const mongoose = require("mongoose");
const schema   = mongoose.Schema;

module.exports = () => {
    const hellbeanssg = schema({
        _id         : "string",
        Year        : "string",
        Month       : "string",
        Day         : "string",
        Hour        : "string",
        Minute      : "string",
        Second      : "string",
        Price       : "number",
        OCvalue     : "number"
    },{
        versionKey : false 
    });
    return mongoose.model("Member", hellbeanssg);
};
