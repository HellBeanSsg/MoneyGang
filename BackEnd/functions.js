function jsonsort(arg1, arg2) {
    if (arg1._id === arg2._id) { return 0; }
    return arg1._id > arg2._id ? 1 : -1;
}

function pushtojson(arg1) {
    let result = [];
    arg1.forEach((element) => {
        result.push(element);
    });
    return result;
}

function checkresult(arg1) {
    return arg1.length === 0 ? 0 : 1;
}

function ocinsert(flag, presecond, tmpsecond, tmpdate, minute, preprice) {
    if (flag === 1) {
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
}

export default { jsonsort, pushtojson, checkresult ,ocinsert};
