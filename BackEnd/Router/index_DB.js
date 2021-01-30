/* configuration */
const express       = require("express");
const dbcrud        = require("../DB/DB_crud.js");
const db            = dbcrud();

/* router */
const routes        = express.Router;
const router        = routes();

/*
 * localhost:3000/DB/read1
 * find all
 * get test
 */
router.get("/read1", async (req, res) => {
    const promise = db.findall();
    let result = [];
    promise.then((promisevalue) => {
        for(let i = 0; i < Object.keys(promisevalue).length; ++i){
            let index   = parseInt(i, 10);
            let value1  = `${promisevalue[index].Name}`;
            let value2  = `${promisevalue[index].Age}`;
            result.push(
                {
                    Name : value1,
                    Age : value2
                }
            );
        }
        res.json(result);
    });
});

/*
 * localhost:3000/DB/read2/Name
 * find with Name
 * get test
 */
router.get("/read2/:Name", async (req, res) => {
    const member = await db.findbyname(req.params.Name);
    let result = [];
    for(let i = 0; i < Object.keys(member).length; ++i){
        let index   = parseInt(i, 10);
        let value1  = `${member[index].Name}`;
        let value2  = `${member[index].Age}`;
        result.push(
            {
                Name : value1,
                Age : value2
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
    const member = await db.findbyAge(req.body.Age);
    let result = [];
    for(let i = 0; i < Object.keys(member).length; ++i){
        let index   = parseInt(i, 10);
        let value1  = `${member[index].Name}`;
        let value2  = `${member[index].Age}`;
        result.push(
            {
                Name : value1,
                Age : value2
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
        const ResultForSave = await db.insert(req.body.Name, req.body.Age);
        res.json(ResultForSave);
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
        let value1  = `${req.body[i].Name}`;
        let value2  = `${req.body[i].Age}`;
        if(!value1){
            // if Name is empty.
            result.push(["Save Failed : Name is Empty", 
                {
                    Name : "undefined",
                    Age : value2
                }
            ]);
        }
        else if(!value2){
            result.push(["Save Failed : Age is Empty", 
                {
                    Name : value1,
                    Age : "undefined"
                }
            ]);
        }
        else{
            const ResultForSave = await db.insert(value1, value2);
            result.push(ResultForSave);
        }
    }
    res.json(result);
});

module.exports = router;