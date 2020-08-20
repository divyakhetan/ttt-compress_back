const express = require("express");
const app = express();


//to avoid cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


// char to int
let map27 = {};
// int to char
let array27 = new Array(27);


map27['0'] = 0;
array27[0] = '0';

for (let i = 1; i <= 26; i++) {
    map27[String.fromCharCode('a'.charCodeAt(0) + i - 1)] = i;
    array27[i] = String.fromCharCode('a'.charCodeAt(0) + i - 1)
}

let map53 = {};
let array53 = new Array(53);

map53['0'] = 0;
array53[0] = '0';

for (let i = 1; i <= 52; i++) {
    if (i <= 26) {
        map53[String.fromCharCode('a'.charCodeAt(0) + i - 1)] = i;
        array53[i] = String.fromCharCode('a'.charCodeAt(0) + i - 1)
    }
    else {
        map53[String.fromCharCode('A'.charCodeAt(0) + i - 1 - 26)] = i;
        array53[i] = String.fromCharCode('A'.charCodeAt(0) + i - 1 - 26)
    }

}

function basex_to_base10(x, input, numberSet) {
    let ans = 0;
    let n = input.length;
    for (let i = 0; i < n; i++) {
        ans += Math.pow(x, i) * numberSet[input[n - i - 1]];
    }
    return ans;
}

function base10_to_basex(x, decimal, numberSet) {
    let converted = "";
    let base = x;

    while (decimal > 0) {
        let c = numberSet[decimal % base];
        converted += c;
        decimal = Math.floor(decimal / base);
    }
    converted = converted.split('').reverse().join('')
    return converted;
}


app.get('/encode/', (req, res) => {
    var input = req.query.input;
    console.log("inpput is ", input)
    let decimal = basex_to_base10(27, input, map27)
    console.log("decimal ", decimal)
    let encoded = base10_to_basex(53, decimal, array53)
    console.log(encoded)
    res.json({ "word": input, "encoded": encoded })
})


app.get("/decode/", (req, res) => {
    let input = req.query.input;
    console.log(input)
    let decimal = basex_to_base10(53, input, map53)
    console.log(decimal)
    let decoded = base10_to_basex(27, decimal, array27)
    console.log("decoded ", decoded)
    res.json({ "word": input, "decoded": decoded })
})

app.listen(process.env.PORT || 3000, () =>
    console.log("listening on port 3000")
);
