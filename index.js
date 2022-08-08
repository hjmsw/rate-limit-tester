var express = require("express");
var app = express();

//Set rate limit and reset interval here
const limit = 2;
const interval = 60;

var remaining = limit + 1;
var reset = new Date();
reset.setSeconds(reset.getSeconds() + interval);

app.use((req, res, next) => {
    const currentDate = new Date();
    if (remaining == 0 && currentDate > reset) {
        remaining = limit + 1;
        reset = new Date();
        reset.setSeconds(reset.getSeconds() + interval);
    }

    remaining = Math.max(remaining-1, 0);

    res.append('X-RateLimit-Limit', limit)
    res.append('X-RateLimit-Remaining', remaining);
    res.append('X-RateLimit-Reset', reset);
    next();
});

app.listen(3000, () => {
 console.log("Rate Limit Test Server running on port 3000");
});

app.post("/test", (req, res, next) => {
    if (remaining == 0) {
        res.status(429);
        res.json({
            "errors": [
                {
                    "field": null,
                    "message": "too many requests"
                },
            ]
        });
    } else {
        res.status(200);
        res.json({'success': 1});
    }
});