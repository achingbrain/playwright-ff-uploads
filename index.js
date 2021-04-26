
const http = require('http')
const formidable = require('formidable')

const POST = 4893

// simple http server that receives a multipart request,
// counts the number of bytes in the request and echoes that
// number back to the client
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.writeHead(200)

  if (req.method === 'POST') {
    const form = formidable()

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
      }

      res.end(`${files.file.size}`)
    })
  } else {
    res.end(`POST only pls`)
  }
})
server.listen(POST, () => {
  console.log(`Server is running on http://127.0.0.1:${POST}`);
})
