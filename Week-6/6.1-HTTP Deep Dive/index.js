const express = require('express');

// Create an instance of express
const app = express();

// Middleware that helps to parse JSON data
app.use(express.json());

const users = [];
// users is an array of objects containing {username, password, token}

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(409).send({
            msg: "Account already signed in"
        });
    } else {
        users.push({
            username: username,
            password: password
        });

        res.status(200).send({
            msg: "You've successfully signed up!"
        });
    }

});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const uniqueToken = generateToken();
        user.token = uniqueToken;

        console.log(user);

        res.status(200).send({
            msg: "You've now signed in!"
        });
    } else {
        res.status(403).send({
            msg: "Incorrect username or password!"
        });
    }
});

app.delete('/logout', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let user = users.find(user => user.username === username && user.password === password);

    if (user && user.token) {
        user.token = "";
        console.log(user);

        res.status(200).send({
            msg: "You've successfully logged out!"
        });
    } else {
        res.status(403).send({
            msg: "Invalid username or password!"
        });
    }
});

app.get('/admin', (req, res) => {
    res.status(200).json(users);
});


app.listen(3000, () => {
    console.log(`Server is live on Port 3000`);
});