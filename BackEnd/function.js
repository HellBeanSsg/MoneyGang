module.exports = () => {
    return {
        jsonsort : (arg1, arg2) => {
            if(arg1._id === arg2._id) { return 0 } return arg1._id > arg2._id ? 1 : -1;
        },
        pushtojson : (arg1) => {
            let result = [];
            arg1.forEach((element) => {
                result.push(element);
            })
            return result;
        },
        checkresult : (arg1) => {
            return arg1.length === 0 ? 0 : 1;
        }
    };
};
