import { Router as router } from "express";
import db from "../DB/DB.js";
import functions from "../functions.js";

const DB = new db();
DB.connect();
DB.setTestModel();
const Router = router();

let preprice = null, presecond = null, preminute = null;

Router.post("/read", async (req, res) => {
    let oyear = null, cyear = null;
    let omonth = null, cmonth = null;
    let oday = null, cday = null;
    let ohour = null, chour = null;
    let ominute = null, cminute = null;
    let osecond = null, csecond = null;
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let i = 0;
    odate.forEach((element) => {
        switch (i) {
            case 0:
                oyear = element;
            case 1:
                omonth = element;
            case 2:
                oday = element;
            case 3:
                ohour = element;
            case 4:
                ominute = element;
            case 5:
                osecond = element;
            default:
                i++;
        }
    });
    i = 0;
    cdate.forEach((element) => {
        switch (i) {
            case 0:
                cyear = element;
            case 1:
                cmonth = element;
            case 2:
                cday = element;
            case 3:
                chour = element;
            case 4:
                cminute = element;
            case 5:
                csecond = element;
            default:
                i++;
        }
    });
    if (odate.length === 1) {
        console.log("index_db 실행")
        let promise1 = null, promise2 = null;
        let loop = Number(cyear) - Number(oyear);
        let year = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                year = String(Number(oyear) + i);
                promise2 = DB.findyear("testmodel", year);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data); console.log("index_db 실행 끝"); });
    }
    else if (odate.length === 2) {
        let promise1 = null, promise2 = null;
        let loop = Number(cmonth) - Number(omonth);
        let year = oyear;
        let month = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                month = Number(omonth) + i;
                if (month < 10) month = "0" + String(month);
                promise2 = DB.findmonth("testmodel", year, month);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
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
                if (day < 10) day = "0" + String(day);
                promise2 = DB.findday("testmodel", year, month, day);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
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
                if (hour < 10) hour = "0" + String(hour);
                const promise = DB.findhour("testmodel", year, month, day, hour);
                promise.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
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
                if (minute < 10) minute = "0" + String(minute);
                promise2 = DB.findminute("testmodel", year, month, day, hour, minute);
                promise2.then((data) => {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
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
                if (second < 10) second = "0" + String(second);
                promise2 = DB.findsecond("testmodel", year, month, day, hour, minute, second);
                promise2.then((data) => {
                    if (data.length !== 0) {
                        data.sort(functions.jsonsort);
                        result.push(functions.pushtojson(data));
                        resolve();
                    }
                });
            });
        }
        promise1.then(() => { console.log(result) });
    }
});

export default Router;