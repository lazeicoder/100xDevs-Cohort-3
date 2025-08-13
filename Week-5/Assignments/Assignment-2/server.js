const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

// This is using CORS middleware
// app.use(cors());

// Also, we can do this without cross origin
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.post('/sum', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a + b 
    });
});

app.listen(3000, () => {
    console.log(`Server is live on PORT 3000`);
});