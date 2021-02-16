import { Router as router } from "express";
import DB from "../DB/DB.js";
import functions from "../functions.js";

const db = new DB();
db.connect();
db.setTestModel();
const Router = router();

// let preprice = null, presecond = null, preminute = null;

Router.post("/read", async (req) => {
    let oyear = null, cyear = null;
    let omonth = null, cmonth = null;
    let oday = null, cday = null;
    let ohour = null, chour = null;
    let ominute = null, cminute = null;
    let osecond = null, csecond = null;
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let index = 0;
    odate.forEach((element) => {
        if (index === 0) { oyear = element; }
        else if (index === 1) { omonth = element; }
        else if (index === 2) { oday = element; }
        else if (index === 3) { ohour = element; }
        else if (index === 4) { ominute = element; }
        else { osecond = element; }
        index++;
    });
    index = 0;
    cdate.forEach((element) => {
        if (index === 0) { cyear = element; }
        else if (index === 1) { cmonth = element; }
        else if (index === 2) { cday = element; }
        else if (index === 3) { chour = element; }
        else if (index === 4) { cminute = element; }
        else { csecond = element; }
        index++;
    });
    if (odate.length === 1) {
        new Promise((resolve) => {
            let result = [];
            const loop = Number(cyear) - Number(oyear);
            for (let i = 0; i < loop; i++) {
                console.log(index, loop)
                let year = String(Number(oyear) + i);
                const promise2 = db.findyear("testmodel", year);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    if (i === loop - 1) {
                        resolve(result);
                    }
                });
            }
        }).then((data) => { console.log(data) });
    }
    /*
    if (odate.length === 1) {
        // console.log("index_db 실행")
        let promise1 = null;
        const loop = Number(cyear) - Number(oyear);
        let year = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                year = String(Number(oyear) + i);
                const promise2 = db.findyear("testmodel", year);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        // promise1.then((data) => { console.log(data); });
    }
    else if (odate.length === 2) {
        let promise1 = null;
        let loop = Number(cmonth) - Number(omonth);
        let year = oyear;
        let month = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                month = Number(omonth) + i;
                if (month < 10) { month = "0" + String(month) };
                const promise2 = db.findmonth("testmodel", year, month);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        // promise1.then((data) => { console.log(data) });
    }
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
