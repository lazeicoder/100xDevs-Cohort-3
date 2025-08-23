const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, 'users.json');

const JWT_KEY = "authforjwt";

const app = express();

app.use(express.json());

const users = [];


app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    
    const userDetails = users.find(user => user.username === username && user.password === password && user.email === email);

    if(userDetails) {
        res.send({
            msg: "Account already exists."
        });
    } else {
        users.push({
            username: username,
            password: password,
            email: email
        });

        res.send({
            msg: "Sign Up successfull."
        });
    }
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const isUserPresent = users.find(user => user.username === username && user.password === password);

    if(isUserPresent) {
        const userToken = jwt.sign({
            username, 
            email 
        }, JWT_KEY);

        res.send({
            msg: "Signed In successfully",
            token: userToken
        });
    } else {
        res.send({
            msg: "Unauthorized!"
        });
    }
});

app.get('/me', (req, res) => {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_KEY);

    const username = decodedData.username;
    const email = decodedData.email;

    const userData = users.find(user => user.username === username && user.email === email);

    if (userData) {
        res.send({
            msg: "Already Logged In",
            userInfo: {
                username: userData.username,
                email: userData.email 
            }
        });

    } else {
        res.send({
            msg: "No data found!"
        });
    }
});


app.listen(3000, () => {
    console.log(`Port is live on PORT: 3000`);
});