
const http = require('http')
const formidable = require('formidable')

const POST = 4893

// simple http server that receives a multipart request,
// counts the number of bytes in the request and echoes that
// number back to the client
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method === 'POST') {
    const form = formidable()

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
      }

      console.info('uploaded', files.file.size)

      res.writeHead(200)
      res.end(`${files.file.size}`)
    })
  } else {
    res.writeHead(200)
    res.end(`<!DOCTYPE html><html><meta charset="utf-8"><head><title>uploads</title></head><body>Hello</body></html>`)
  }
})
server.listen(POST, () => {
  console.log(`Server is running on http://127.0.0.1:${POST}`);
})
