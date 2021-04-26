# playwright file uploads

> Using `FormData` objects with `fetch` and `Blob`s created from `Uint8Array`s doesn't upload the whole blob with Firefox running under playwright.

## Setup

```console
$ git clone https://github.com/achingbrain/playwright-ff-uploads.git
$ cd playwright-ff-uploads
$ npm i
```

## The problem

This repo contains a node server in [index.js](./index.js) that accepts a multipart request, counts the number of bytes in the multipart part and echoes that number back to the client.

It also contains [test.js](./test.js) that runs using Playwright and creates a multipart request, appends a `Blob` created from a `Uint8Array` of zeros, uploads it and inspects the response to see if the right number of bytes were received.

It repeats this process ten times as sometimes it will work in FF and sometimes it will not.

Change `DATA_SIZE` in [test.js](./test.js) to something small like `10` and it works in FF but larger values like `Math.pow(2, 20)` do not.

Finally it has [client/index.html](./client/index.html) which performs the same operation but outside of any testing framework or extra code.

The uploads work in Playwright/Chrome, fail in Playwright/Firefox but the same code works as expected if run in Firefox without any extra code.

## To replicate:

1. Start the echo server:

```console
$ npm run start:server
```

2. Perform uploads using Playwright (start the echo server first):

```console
$ npm test

> playwright-ff-uploads@1.0.0 test
> node test.js

chromium 0 ok
chromium 1 ok
chromium 2 ok
chromium 3 ok
chromium 4 ok
chromium 5 ok
chromium 6 ok
chromium 7 ok
chromium 8 ok
chromium 9 ok
Error: firefox 0 not ok - uploaded 0 expected 1048576
    at main (/Users/alex/test/upload/test.js:29:15)
```

3. Perform uploads in a browser (start the echo server first):

```console
$ npm run start:client

> playwright-ff-uploads@1.0.0 start:client
> http-server ./client -p 4894

Starting up http-server, serving ./client
Available on:
  http://127.0.0.1:4894
  http://192.168.2.50:4894
Hit CTRL-C to stop the server
```

Now open http://127.0.0.1:4894 in a browser with the console open to see the upload reports.
