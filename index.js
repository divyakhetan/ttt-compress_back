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

app.get('/encode/', (req, res) => {
    var input = req.query.input;
    console.log("inpput is ", input)
    input = input + " ";

    var encoded = "";
    var count = 1;

    for (var i = 0; i < input.length; i++) {
        if (input[i] == input[i + 1]) {
            count++;
        }

        else {
            encoded += input[i];
            if (count != 1) encoded += count.toString();
            count = 1;
        }
    }
    encoded = encoded.substring(0, encoded.length - 1)
    console.log("encoded is ", encoded);

    res.json({ "word": input, "encoded": encoded })
})


app.get("/decode/", (req, res) => {
    var input = req.query.input;
    console.log(input)
    var decoded = "";
    var index = 0;

    while (index < input.length) {
        if ((input[index] >= 'a' && input[index] <= 'z') && ((index == (input.length - 1)) || (input[index + 1] >= 'a' && input[index + 1] <= 'z'))) {
            decoded += input[index];
            index++;
        }

        else if ((input[index] >= '0' && input[index] <= '9')) {
            var count = "";
            count += input[index];
            var temp = index + 1;
            while (input[temp] >= '0' && input[temp] <= '9') {
                count += input[temp];
                temp++;
            }
            for (var j = 0; j < parseInt(count); j++) {
                decoded += input[index - 1];
            }
            index = temp;
        }

        else index++;
    }

    console.log("decoded", decoded)
    res.json({ "word": input, "decoded": decoded })



})

app.listen(process.env.PORT || 3000, () =>
    console.log("listening on port 3000")
);
