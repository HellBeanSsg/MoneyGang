import { Router as router } from "express";
import DB from "../DB/DB.js";
import functions from "../functions.js";

const db = new DB();
const Router = router();
db.connect();
db.setTestModel();

// let preprice = null, presecond = null, preminute = null;

Router.post("/read", async (req, res) => {
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let size = odate.length;
    let oyear = odate.shift(), cyear = cdate.shift();
    let omonth = odate.shift(), cmonth = cdate.shift();
    // let oday = odate.shift(), cday = cdate.shift();
    // let ohour = odate.shift(), chour = cdate.shift();
    // let ominute = odate.shift(), cminute = cdate.shift();
    // let osecond = odate.shift(), csecond = cdate.shift();
    if (size === 1) {
        new Promise((resolve) => {
            let result = [];
            const loop = Number(cyear) - Number(oyear);
            for (let i = 0; i < loop; i++) {
                let year = String(Number(oyear) + i);
                const promise2 = db.findyear(year);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    if (i === loop - 1) {
                        resolve(result);
                    }
                });
            }
        }).then((data) => { res.json(data); });
    }

    else if (size === 2) {
        new Promise((resolve) => {
            let result = [];
            let year = oyear;
            const loop = Number(cmonth) - Number(omonth);
            for (let i = 0; i < loop; i++) {
                let month = Number(omonth) + i;
                if (month < 10) { month = "0" + String(month); }
                else { month = String(month); }
                const promise2 = db.findmonth(year, month);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    if (i === loop - 1) {
                        resolve(result);
                    }
                });
            }
        }).then((data) => { res.json(data); });
    }
});

export default Router;
