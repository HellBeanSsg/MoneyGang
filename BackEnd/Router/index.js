const express       = require("express");
const router        = express.Router();

/* DB_Connection */
const dbconnect     = require("../DB/DB_connect");
dbconnect();

/* DB_Schema */
const studentsch    = require("../DB/DB_TestSchema.js");
const hellbeanssg   = studentsch();

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