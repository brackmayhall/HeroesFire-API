# Heroes Fire API

Node web service for Heroes Fire

install through package.json
```
npm install
```

to get a list of heroes (this is hardcoded at the time)
```
navigate to http://localhost:8081/
```

to get individual hero json info hit the following URL
```
navigate to http://localhost:8081/{heroName}
```

## Required packages
* express
* request
* soupselect
* htmlparser

## Example json hero output
```
{
  "name": "Abathur",
  "role": "Melee Specialist",
  "franchise": "Starcraft",
  "price": {
    "usd": 9.99,
    "gold": "10k"
  },
  "stats": [
    {
      "type": "health",
      "value": 550,
      "offset": 50
    },
    {
      "type": "health regen",
      "value": 1.1445,
      "offset": 0.105
    },
    {
      "type": "atk speed",
      "value": 1.43,
      "offset": 0
    },
    {
      "type": "damage",
      "value": 18,
      "offset": 2
    }
  ]
}
```

## TODO
* finish data parsing for abilities and skins
* better error checking
* do not hard code hero slugs in index dir
