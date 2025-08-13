- In Express JS, `middlewares` refers to functions that have access to the request object `req`, response object `res`, and the `next` function in the application's `request-response cycle`.

- Applications of `middleware`:
    - It may or may not modify the `request` or `response` cycle.
    - It will either stop the request right there or forward the request to the real route handler. Can be conditioned.
    ```
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
    const sumHandler = (req, res, next) => {
        const a = parseInt(req.query.a);
        const b = parseInt(req.query.b);

        res.json({
            ans: a+b 
        });
    }

    app.get('/sum', requestIncrementer, sumHandler);

    // So when we reach the user endpoint, the request generated is calculated

    app.get('/user', (req, res) => {
        res.json({
            msg: "Endpoint reached!"
        });
    });

    app.listen(3000, () => {
        console.log(`Server is live on PORT: 3000`);
    });
    ```
    - It can also call the next `middleware` that is in the stack.

- Main use case of `Middleware` is : `Authentication`.


- CORS - Cross Origin Resource Sharing
    - It is the way in which our `frontend` talks to the `backend`. But, generally, the cross origin requests are blocked to prevent malicious scripts reading sensitive data secretly from another site.

    - So, `cors` acts as a middleware that allows the sites to send request is validated by the main site.
    Example: Suppose a website A `facebook.com` sends a fetch request to website B `apis.facebook.com`, then after validation, website B gives website A the access to the data of website B. Whereas, if website C `google.com` tries to fetch the data from website B, it gets rejected.