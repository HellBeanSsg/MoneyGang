const express = require("express");
const router = express.Router();

/* DB_Connection */
const db_connect    = require("../DB/DB_connect");
const db            = db_connect();

/* DB_Schema */
const student_sch   = require("../DB/DB_TestSchema.js");
const hellbeanssg   = student_sch();

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