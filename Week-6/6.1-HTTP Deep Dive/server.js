const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'jwt@secret';

const app = express();

const users = [];

app.use(express.json());

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.send({
            msg: "Already signed up"
        });
    } else {
        users.push({
            username: username,
            password: password
        });

        console.log(users);
        res.send({
            msg: "You've successfully signed up."
        });
    }
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Converting the username into a jwt
        const token = jwt.sign({
            username: username 
        }, JWT_SECRET);

        // user.token = token;

        res.send({
            msg: "You're signed in!",
            token: token 
        });
    } else {
        res.send({
            msg: "Unauthorized credentials."
        });
    }

    console.log(users);
});

app.get('/me', (req, res) => {
    const token = req.headers.token;

    // This will get back the json object => {username, password}.
    const decodedInfo = jwt.verify(token, JWT_SECRET);

    const username = decodedInfo.username;

    const user = users.find(user => user.username === username);

    if (user) { 
        res.json({
            username: username,
            password: user.password 
        });
    }
});

app.get('/admin', (req, res) => {
    res.send(users);
})

app.listen(3000, () => {
    console.log(`Server is live on Port 3000`);
});