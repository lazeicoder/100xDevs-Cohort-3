const jwt = require('jsonwebtoken');
const express = require('express');

const JWT_KEY = "secretofweb";

const app = express();

app.use(express.json());

app.post('/user', (req, res) => {
    const userName = req.body.username;
    const userId = req.body.id;

    const newToken = jwt.sign({
        username: userName,
        id: userId
    }, JWT_KEY);

    console.log(`Token generated: ${newToken}`);

    res.send({
        msg: "Successfully created token!",
        token: newToken 
    });
});

app.get('/user-validation', (req, res) => {
    const userToken = req.headers.token;
    const decodedData = jwt.verify(userToken, JWT_KEY);

    res.send({
        username: decodedData.username
    });
})

app.listen(3000, () => {
    console.log('Server live on port : 3000');
});