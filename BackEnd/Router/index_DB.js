import { Router as router } from "express";
import DB from "../DB/DB_secData.js";
import functions from "../functions.js";

const db = new DB();
const Router = router();
db.setTestModel();

let preprice = null, presecond = null, preminute = null;

Router.post("/read", async (req, res) => {
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let size = odate.length;
    let oyear = odate.shift(), cyear = cdate.shift();
    let omonth = odate.shift(), cmonth = cdate.shift();
    let oday = odate.shift(), cday = cdate.shift();
    let ohour = odate.shift(), chour = cdate.shift();
    let ominute = odate.shift(), cminute = cdate.shift();
    let osecond = odate.shift(), csecond = cdate.shift();
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

    else if (size === 3) {
        new Promise((resolve) => {
            let result = [];
            let year = oyear;
            let month = omonth;
            const loop = Number(cday) - Number(oday);
            for (let i = 0; i < loop; i++) {
                let day = Number(oday) + i;
                if (day < 10) { day = "0" + String(day); }
                else { day = String(day); }
                const promise2 = db.findday(year, month, day);
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

    else if (size === 4) {
        new Promise((resolve) => {
            let result = [];
            let year = oyear;
            let month = omonth;
            let day = oday;
            const loop = Number(chour) - Number(ohour);
            for (let i = 0; i < loop; i++) {
                let hour = Number(ohour) + i;
                if (hour < 10) { hour = "0" + String(hour); }
                else { hour = String(hour); }
                const promise2 = db.findhour(year, month, day, hour);
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

    else if (size === 5) {
        new Promise((resolve) => {
            let result = [];
            let year = oyear;
            let month = omonth;
            let day = oday;
            let hour = ohour;
            const loop = Number(cminute) - Number(ominute);
            for (let i = 0; i < loop; i++) {
                let minute = Number(ominute) + i;
                if (minute < 10) { minute = "0" + String(minute); }
                else { minute = String(minute); }
                const promise2 = db.findminute(year, month, day, hour, minute);
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

    else if (size === 6) {
        new Promise((resolve) => {
            let result = [];
            let year = oyear;
            let month = omonth;
            let day = oday;
            let hour = ohour;
            let minute = ominute;
            const loop = Number(csecond) - Number(osecond);
            for (let i = 0; i < loop; i++) {
                let second = Number(osecond) + i;
                if (second < 10) { second = "0" + String(second); }
                else { second = String(second); }
                const promise2 = db.findsecond(year, month, day, hour, minute, second);
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

Router.post("/push", (req, res) => {
    let date = req.body.Date.split("_");
    let splitedDate = date;
    let year = splitedDate.shift();
    let month = splitedDate.shift();
    let day = splitedDate.shift();
    let hour = splitedDate.shift();
    let minute = splitedDate.shift();
    let second = splitedDate.shift();
    let price = req.body.Price;
    if (!preprice) preprice = price;
    if (!preminute) preminute = minute;
    if (!presecond) {
        presecond = second;
        db.opinsert(date + "_0", price);
    }
    else {
        if (presecond !== second) {
            if (preminute !== minute) {
                let tmpsecond = Number(second) + 60;
                let tmpdate = year + "_" + month + "_" + day + "_" + hour;
                while (tmpsecond - 1 > Number(presecond)) {
                    if (tmpsecond - 1 > 59) {
                        if (tmpsecond - 61 < 10) {
                            tmpsecond--;
                            db.opinsert(tmpdate + "_" + minute + "_0" + (tmpsecond - 60) + "_0", preprice);
                            db.cpinsert(tmpdate + "_" + minute + "_0" + (tmpsecond - 60) + "_1", preprice);
                        }
                        else {
                            tmpsecond--;
                            db.opinsert(tmpdate + "_" + minute + "_" + (tmpsecond - 60) + "_0", preprice);
                            db.cpinsert(tmpdate + "_" + minute + "_" + (tmpsecond - 60) + "_1", preprice);
                        }
                    }
                    else {
                        tmpsecond--;
                        db.opinsert(tmpdate + "_" + preminute + "_" + tmpsecond + "_0", preprice);
                        db.opinsert(tmpdate + "_" + preminute + "_" + tmpsecond + "_1", preprice);
                    }
                }
            }
            else {
                let tmpsecond = Number(second);
                let tmpdate = year + "_" + month + "_" + day + "_" + hour + "_" + minute;
                while (tmpsecond - 1 > Number(presecond)) {
                    if (tmpsecond - 1 < 10) {
                        tmpsecond--;
                        db.opinsert(tmpdate + "_0" + tmpsecond + "_0", preprice);
                        db.cpinsert(tmpdate + "_0" + tmpsecond + "_1", preprice);
                    }
                    else {
                        tmpsecond--;
                        db.opinsert(tmpdate + "_" + tmpsecond + "_0", preprice);
                        db.cpinsert(tmpdate + "_" + tmpsecond + "_1", preprice);
                    }
                }
            }
            db.opinsert(date + "_0", price);
            presecond = second;
            preminute = minute;
            preprice = price;
        }
        else if (presecond === second) {
            db.cpinsert(date + "_1", price);
            preprice = price;
        }
        res.send("OK");
    }
});

export default Router;
