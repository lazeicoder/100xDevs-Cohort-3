const express = require('express');

const app = express();
app.use(express.json());

const users = [];
// users is an array of objects containing {username, password, token}

app.post('/signup', (req, res) => {

});

app.post('/signin', (req, res) => {

});

app.listen(3000, () => {
    console.log(`Server is live on Port 3000`);
});