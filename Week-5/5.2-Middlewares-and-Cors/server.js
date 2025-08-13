const express = require("express");

const app = express();

// logs the method, timestamp and the url

const loggerMiddleware = (req, res, next) => {
    console.log(`Method is: ${req.method}`);
    console.log(`Timestamp is: ${new Date()}`);
    console.log(`The requested url is: ${req.url}`);
    next();
}

app.use(loggerMiddleware);

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a - b
    })
});

app.listen(3000, () => {
    console.log(`Server is live on PORT 3000`);
});