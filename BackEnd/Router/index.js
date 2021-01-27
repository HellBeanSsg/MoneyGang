const express = require("express");
const router = express.Router();

/* DB_Connection */
const DB_Connect    = require("../DB/DB_connect");
DB_Connect();

/* DB_Schema */
const Student_Sch   = require("../DB/DB_TestSchema.js");
const hellbeanssg   = Student_Sch();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/DB", (req, res) => {
    hellbeanssg.find(function(error, member){
        if(error){
            res.send(error);
        }else{
            res.json(member);
        }
    });
});
 
module.exports = router;