import { Router as router } from "express";
import DB from "../DB/DB.js";
import functions from "../functions.js";

const db = new DB();
db.connect();
db.setTestModel();
const Router = router();

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
    /*
    else if (odate.length === 3) {
        let promise1 = null, promise2 = null;
        let loop = Number(cday) - Number(oday);
        let year = oyear;
        let month = omonth;
        let day = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                day = Number(oday) + i;
                if (day < 10) { day = "0" + String(day) };
                promise2 = db.findday("testmodel", year, month, day);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        // promise1.then((data) => { console.log(data) });
    }
    else if (odate.length === 4) {
        let promise1 = null, promise2 = null;
        let loop = Number(chour) - Number(ohour);
        let year = oyear;
        let month = omonth;
        let day = oday;
        let hour = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                hour = Number(ohour) + i;
                if (hour < 10) { hour = "0" + String(hour); }
                const promise = db.findhour("testmodel", year, month, day, hour);
                promise.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        // promise1.then((data) => { console.log(data) });
    }
    else if (odate.length === 5) {
        let promise1 = null, promise2 = null;
        let loop = Number(cminute) - Number(ominute);
        let year = oyear;
        let month = omonth;
        let day = oday;
        let hour = ohour;
        let minute = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                minute = Number(ominute) + i;
                if (minute < 10) { minute = "0" + String(minute); }
                promise2 = db.findminute("testmodel", year, month, day, hour, minute);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        // promise1.then((data) => { console.log(data) });
    }
    else {
        let promise1 = null, promise2 = null;
        let loop = Number(csecond) - Number(osecond);
        let year = oyear;
        let month = omonth;
        let day = oday;
        let hour = ohour;
        let minute = ominute;
        let second = null;
        let result = [];
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                second = Number(osecond) + i;
                if (second < 10) { second = "0" + String(second); }
                promise2 = db.findsecond("testmodel", year, month, day, hour, minute, second);
                promise2.then((data) => {
                    if (data.length !== 0) {
                        data.sort(functions.jsonsort);
                        result.push(functions.pushtojson(data));
                        resolve();
                    }
                });
            });
        }
        // promise1.then(() => { console.log(result) });
    }*/
});

export default Router;
