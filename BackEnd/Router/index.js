const express = require("express");
const router = express.Router();

/* DB_Connection */
const DB_connect    = require("../DB/DB_connect");
const DB            = DB_connect();

/* DB_Schema */
const Student_Sch   = require("../DB/DB_TestSchema.js");
const HellBeanSsg   = Student_Sch();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/DB", (req, res) => {
    HellBeanSsg.find(function(error, member){
        if(error){
            res.send(error);
        }else{
            res.json(member);
        }
    });
});
 
module.exports = router;