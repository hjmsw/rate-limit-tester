# rate-limit-tester
Simple express app for simulating a rate limited API. Useful for testing your rate limit handling logic without calling the real API.

## Example Succesful (200) Request
```bash
➜  ~ curl -X POST -v http://localhost:3000/test
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> POST /test HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.82.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< X-RateLimit-Limit: 2
< X-RateLimit-Remaining: 2
< X-RateLimit-Reset: Mon Aug 08 2022 18:31:28 GMT+0100 (British Summer Time)
< Content-Type: application/json; charset=utf-8
< Content-Length: 13
< ETag: W/"d-omrXeIgYnMXWlzu4GORfRIYoxcE"
< Date: Mon, 08 Aug 2022 17:30:28 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"success":1}% 
```

## Example Unsuccesful (429) Request
```bash
➜  ~ curl -X POST -v http://localhost:3000/test
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> POST /test HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.82.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 429 Too Many Requests
< X-Powered-By: Express
< X-RateLimit-Limit: 2
< X-RateLimit-Remaining: 0
< X-RateLimit-Reset: Mon Aug 08 2022 18:26:41 GMT+0100 (British Summer Time)
< Content-Type: application/json; charset=utf-8
< Content-Length: 57
< ETag: W/"39-H4hyu8gsU2ZSapEd9yPtH9LIKjo"
< Date: Mon, 08 Aug 2022 17:29:35 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"errors":[{"field":null,"message":"too many requests"}]}%
```
