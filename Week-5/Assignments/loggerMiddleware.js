const express = require('express');
const app = express();

const loggerMiddleware = (req, res, next) => {
    console.log(`Method is: ${req.method}`);
    console.log(`Timestamp is: ${new Date()}`);
    console.log(`URL is: ${req.url}`);

    next();
}

app.use(loggerMiddleware);

app.get('/user', (req, res) => {
    res.json({
        msg: "User logged in."
    });
});

app.get('/login', (req, res) => {
    res.json({
        msg: "Welcome to login page!"
    });
});

app.post('/new-post', (req, res) => {
    res.json({
        msg: "New post created!"
    });
});

app.put('/update-post', (req, res) => {
    res.json({
        msg: "Previous post updated"
    });
});

app.delete('/delete-post', (req, res) => {
    res.json({
        msg: "Selected post deleted!"
    });
});

app.listen(3000, () => {
    console.log(`Server is live on PORT: 3000`);
});