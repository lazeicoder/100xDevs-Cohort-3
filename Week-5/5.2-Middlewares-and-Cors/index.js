const express = require('express');
const PORT = 3000;

const app = express();

let requestCounter = 0;

// MiddleWare-1
const requestIncrementer = (req, res, next) => {
    requestCounter = requestCounter + 1;
    console.log(`Total number of requests made: ${requestCounter}`);

    const ageIs = req.query.age;

    if (ageIs >= 14) {
        next();
    } else {
        res.json({
            msg: "Access terminated!"
        });
    }
}

// MiddleWare-2
const sumHandler = (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a+b 
    });
}

app.get('/admin', (req, res) => {
    res.json({
        msg: `Total number of requests: ${requestCounter}`
    });
});


app.use(requestIncrementer);

app.get('/sum', sumHandler);

// So when we reach the user endpoint, the request generated is calculated

app.get('/user', (req, res) => {
    res.json({
        msg: "Endpoint reached!"
    });
});

app.listen(3000, () => {
    console.log(`Server is live on PORT: 3000`);
});