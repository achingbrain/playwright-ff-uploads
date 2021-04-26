# playwright file uploads

> Using `FormData` objects with `fetch` and `Blob`s created from `Uint8Array`s doesn't upload the whole blob with Firefox running under playwright.

This repo contains a node server in [index.js](./index.js) that accepts a multipart request, counts the number of bytes in the part and echoes that number back to the client.

It also contains a mocha test in [test.js](./test.js) that creates a multipart request, appends a `Blob` created from a `Uint8Array` of zeros, uploads it and inspects the response to see if the right number of bytes were recieved.

Finally it has [client/index.html](./client/index.html) which performs the same operation but outside of any testing framework or extra code.

The test passes in Chrome, fails in Firefox but the same code works as expected if run in Firefox without any extra code.

## Setup

```console
$ git clone https://github.com/achingbrain/playwright-ff-uploads.git
$ cd playwright-ff-uploads
$ npm i
```

## To replicate:

1. Start the echo server:

```console
$ npm run start:server
```

2. Run the test under chrome (start the echo server first):

```console
$ npm run test:chromium

> playwright-ff-uploads@1.0.0 test:chromium
> pw-test test.js --browser chromium

✔ chromium set up
✔ Bundling tests
'window.webkitStorageInfo' is deprecated. Please use 'navigator.webkitTemporaryStorage' or 'navigator.webkitPersistentStorage' instead.
http://127.0.0.1:3000/bundle-out.js:25602

  test
attempt 0
attempt 1
...etc
attempt 9
    ✓ should upload (205ms)
  1 passing (210ms)
```

3. Run the test under firefox (start the echo server first):

```console
$ npm run test:firefox

> playwright-ff-uploads@1.0.0 test:firefox
> pw-test test.js --browser firefox

✔ firefox set up
✔ Bundling tests

  test
attempt 0
attempt 1
    1) should upload
  0 passing (100ms)
  1 failing
  1) test
       should upload:
     Data size mismatch - sent 1048576, server counted 753664 bytes

  require_test</</<@http://127.0.0.1:3000/bundle-out.js:25650:19
  async*callFn@http://127.0.0.1:3000/bundle-out.js:21562:28
  require_mocha</</Runnable.prototype.run@http://127.0.0.1:3000/bundle-out.js:21551:17
  * more stack trace here *
```

4. Run the test in a browser (start the echo server first)

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

Now open http://127.0.0.1:4894 in a browser with the console open
