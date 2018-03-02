const treeList = require('./tree_list.min');
const flatList = require('./flat_list.min');


module.exports = {
    getDescription: (code) => {
        code = code.toString();
        if (flatList.hasOwnProperty(code)) {
            return flatList[code];
        }
        return null;
    },
    getHierarchy: (code) => {
        code = code.toString();
        let levels = [];
        const classID = parseInt(code.charAt(0)) - 1;
        let result = {
            class: treeList[classID].name,
            content: []
        };

        let root = treeList[classID].content;
        for (let i = 1, codeSize = code.length; i < codeSize; i++) {
            let subCode = code.substr(0, i + 1);
            if (root[subCode]) {
                result.content.push({code: subCode, name: root[subCode].name});
                root = root[subCode].content;
            }
        }

        return result;
    },
    getClass: (classId) => {
        const result = treeList.filter((el) => {
            return el.class === classId
        });
        if (result.length === 1) {
            return result[0];
        }
        return null;

    },

    treeList,
    flatList,
};


