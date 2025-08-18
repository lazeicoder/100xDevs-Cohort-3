const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

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
        
    } else {
        res.send({
            msg: "Unauthorized credentials."
        });
    }
});

app.get('/me', (req, res) => {
    const token = req.headers.token;
});

app.listen(3000, () => {
    console.log(`Server is live on Port 3000`);
});