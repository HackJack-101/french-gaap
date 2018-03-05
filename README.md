# french-gaap

List of the french generally accepted accounting principles, called Plan Comptable Général ([PCG](https://fr.wikipedia.org/wiki/Plan_comptable_g%C3%A9n%C3%A9ral_(France))).

## Installation

##### Using npm
```
npm install french-gaap
```

##### In Node.js

```
const gaap = require('./index.js');
```

## API

### getClass(classId: number)


##### Example
```
const gaap = require('./index.js');

console.log(gaap.getClass(1));

// Output

{
    "class": 1,
    "name": "Classe 1 : Comptes de capitaux",
    "content": {
        "10": {
            "name": "Capital et réserves",
            "content": {
                "101": {
                    "name": "Capital",
                    "content": {
                        "1011": {
                            "name": "Capital souscrit - non appelé"
                        },
                        "1012": {
                            "name": "Capital souscrit - appelé, non versé"
                        },
                        "1013": {
                            "name": "Capital souscrit - appelé, versé",
                            "content": {
                                "10131": {
                                    "name": "Capital non amorti"
                                },
                                "10132": {
                                    "name": "Capital amorti"
                                }
                            }
                        },
                        "1018": {
                            "name": "Capital souscrit soumis à des réglementations particulières"
                        }
                    }
                },
            [...]
            }
        }
    }   
}
```

### getDescription(id: number)



##### Example
```
const gaap = require('./index.js');

console.log(gaap.getHierarchy(2116));

// Output

"Compte d'ordre sur immobilisations"
```

### getHierarchy(id: number)



##### Example
```
const gaap = require('./index.js');

console.log(gaap.getHierarchy(29787));

// Output

{
    "class": "Classe 2 : Comptes d’immobilisations",
    "content": [
        {
            "code": "29",
            "name": "Dépréciations des immobilisations"
        },
        {
            "code": "297",
            "name": "Dépréciations des autres immobilisations financières"
        },
        {
            "code": "29787",
            "name": "Dépréciation du mali de fusion sur actifs financiers"
        }
    ]
}
```

