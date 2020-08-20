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


function to_decimal(input) {
    let ans = 0;
    let n = input.length;
    for (let i = 0; i < n; i++) {
        ans += Math.pow(27, i) * ((input[n - i - 1].charCodeAt(0) - 'a'.charCodeAt(0)) + 1);
    }
    return ans;
}


function eq(c) {
    if (c == 0) return '0';
    if (c >= 1 && c <= 26)
        return String.fromCharCode(c - 1 + 'a'.charCodeAt(0));
    if (c >= 27 && c <= 52)
        return String.fromCharCode(c - 26 - 1 + 'A'.charCodeAt(0));
}


function toBase53(decimal) {
    let converted = "";
    let base = 53;

    while (decimal > 0) {
        let c = eq(decimal % base);
        converted += c;
        decimal = Math.floor(decimal / base);
    }
    converted = converted.split('').reverse().join('')
    return converted;
}

app.get('/encode/', (req, res) => {
    var input = req.query.input;
    console.log("inpput is ", input)
    let decimal = to_decimal(input)
    console.log("decimal ", decimal)
    let encoded = toBase53(decimal)
    console.log(encoded)

    res.json({ "word": input, "encoded": encoded })
})

function val(c) {
    if (c == '0') return 0;
    else if (c >= 'a' && c <= 'z') return (c.charCodeAt(0) - 'a'.charCodeAt(0) + 1);
    else return (c.charCodeAt(0) - 'A'.charCodeAt(0) + 26 + 1);
}

function base53_to_decimal(encoded) {
    let ans = 0;
    n = encoded.length;
    for (let i = 0; i < n; i++) {
        ans += Math.pow(53, i) * val(encoded[n - i - 1]);
    }

    return ans;
}

function eq_27(x) {
    if (x == 0) return '0';
    if (x >= 1 && x <= 26) return String.fromCharCode(x - 1 + 'a'.charCodeAt(0));
}

function get_decoded(decimal) {
    let decoded = "";
    let base = 27;

    while (decimal > 0) {
        let c = eq_27(decimal % base);
        decoded += c;
        decimal = Math.floor(decimal / base);
    }

    decoded = decoded.split('').reverse().join('')
    return decoded;
}
app.get("/decode/", (req, res) => {
    let input = req.query.input;
    console.log(input)
    let decimal = base53_to_decimal(input)
    console.log(decimal)
    let decoded = get_decoded(decimal)
    console.log("decoded ", decoded)
    res.json({ "word": input, "decoded": decoded })
})

app.listen(process.env.PORT || 3000, () =>
    console.log("listening on port 3000")
);
