module.exports = () => {
    return {
        showresult : (arg1) => {
            return new Promise((resolve) => {
                let result = [];
                arg1.forEach((element) => {
                    result.push(
                        {
                            Name : element.Name,
                            Age : element.Age
                        }
                    );
                })
                resolve(result);
            });
        }
    };
};
