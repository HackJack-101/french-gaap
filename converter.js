const fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const SEPARATOR = ' ;;@separator@;; ';

const classes = [
    {
        class: 1,
        name: 'Classe 1 : Comptes de capitaux'
    }, {
        class: 2,
        name: 'Classe 2 : Comptes d’immobilisations'
    }, {
        class: 3,
        name: 'Classe 3 : Comptes de stocks et en-cours'
    }, {
        class: 4,
        name: 'Classe 4 : Comptes de tiers'
    }, {
        class: 5,
        name: 'Classe 5 : Comptes financiers'
    }, {
        class: 6,
        name: 'Classe 6 : Comptes de charges'
    }, {
        class: 7,
        name: 'Classe 7 : Comptes de produits'
    }
];
let finalResults = [];


classes.forEach((c) => {
    let extractedResults = [];
    let classFile = require("./assets/" + c.class + ".txt");
    let classLines = classFile.split("\n");


    classLines.forEach((classLine) => {
        classLine = classLine.replace(/ [-–] /i, SEPARATOR);

        let lineSplit = classLine.split(SEPARATOR);

        if(lineSplit.length !== 2){
            console.error('Error on lineSplit');
            console.error(lineSplit);
            process.exit(1);
        }

        let [code, name] = lineSplit;

        extractedResults.push({code, name});
    });

    extractedResults = extractedResults.sort((a, b) => {
        return a.code.localeCompare(b.code);
    });

    let formattedResults = [];

    extractedResults.forEach((line) => {
        let code = line.code.toString();
        let codeSize = code.length;
        let levels = [];

        for (let i = 1; i < codeSize; i++) {
            levels.push(code.substr(0, i + 1));
        }

        formattedResults.push({levels, name: line.name});
    });

    let classResults = {class: c.class, name: c.name, content: {}};

    formattedResults.forEach((el) => {
        let root = classResults.content;

        for (let levelIndex = 0, levelMax = el.levels.length; levelIndex < levelMax; levelIndex++) {
            if (!root[el.levels[levelIndex]]) {
                root[el.levels[levelMax - 1]] = {name: el.name};
                break;
            } else {
                if (!root[el.levels[levelIndex]].hasOwnProperty('content')) {
                    root[el.levels[levelIndex]].content = {};
                }
                root = root[el.levels[levelIndex]].content;
            }

        }
    });

    finalResults.push(classResults);
});

fs.writeFile("./results.json", JSON.stringify(finalResults, null, 4), function (err) {
    if (err) {
        return console.error(err);
    }

    console.log("The file was saved!");
});

