/* configuration */
const express       = require("express");
const db_crud       = require("../DB/DB_crud.js");
const db            = db_crud();

/* router */
const routes        = express.Router;
const router        = routes();

/*
 * localhost:3000/DB/read1
 * find all
 * get test
 */
router.get("/read1", async (req, res) => {
    const member = await db.find_all();
    let result = [];
    for(let i = 0; i < Object.keys(member).length; ++i){
        result.push(
            {
                Name : member[i].Name,
                Age : member[i].Age
            }
        );
    }
    res.json(result);
});

/*
 * localhost:3000/DB/read2/Name
 * find with Name
 * get test
 */
router.get("/read2/:Name", async (req, res) => {
    const member = await db.find_by_name(req.params.Name);
    let result = [];
    for(let i = 0; i < Object.keys(member).length; ++i){
        result.push(
            {
                Name : member[i].Name,
                Age : member[i].Age
            }
        );
    }
    res.json(result);
});

/*
 * localhost:3000/db/read3
 * find with Age
 * post test
 */
router.post("/read3/", async (req, res) => {
    const member = await db.find_by_Age(req.body.Age);
    let result = [];
    for(let i = 0; i < Object.keys(member).length; ++i){
        result.push(
            {
                Name : member[i].Name,
                Age : member[i].Age
            }
        );
    }
    res.json(result);
});

/* 
 * localhost:3000/db/testinput/one 
 * insert one element
 * post test
 */
router.post("/insert/one", async (req, res) => {
    if(!req.body.Name || !req.body.Age){
        res.send("Not enough information for modeling.");
    }else{
        const ResultForSave = await db.insert_one(req.body.Name, req.body.Age);
        let result = [];
        result.push([ResultForSave, 
            {
                Name : req.body.Name,
                Age : req.body.Age
            }
        ]);
        res.json(result);
    }
});

/* 
 * localhost:3000/db/testinput/one 
 * insert many element
 * post test
 * DB 저장은 동기여야 할까 비동기여야 할까??
 * 비동기식으로 저장할때는 결과값이 전달이 안된다. -> 그냥 시켜놓고 따른일을 하러감.
 * 동기로 하면 결과를 받아볼수 있다. -> 결과가 리턴될때까지 기다린다.
 */
router.post("/insert/many", async (req, res) => {
    let result = [];
    for(let i = 0; i < req.body.length; ++i){
        switch(true) {
            case !req.body[i].Name:
                // if Name is empty.
                result.push(["Save Failed : Name is Empty", 
                    {
                        Name : "undefined",
                        Age : req.body[i].Age
                    }
                ]);
                break;
            case !req.body[i].Age:
                // if Age is empty.
                result.push(["Save Failed : Age is Empty", 
                    {
                        Name : req.body[i].Name,
                        Age : "undefined"
                    }
                ]);
                break;
            case !(!req.body[i].Name && !req.body[i].Age):
                const ResultForSave = await db.insert_one(req.body[i].Name, req.body[i].Age);
                result.push([ResultForSave, 
                    {
                        Name : req.body[i].Name,
                        Age : req.body[i].Age
                    }
                ]);
                break;
            default:
        }
    }
    res.json(result);
})

module.exports = router;