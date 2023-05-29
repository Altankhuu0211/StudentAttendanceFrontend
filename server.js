const next = require('next')
const { createSecureServer } = require('http2')
const fs = require('fs')
const { parse } = require('url')

const port = 3000;
const dev = process.env.NODE_ENV !== 'production'

// Init the Next app:
const app = next({ dev })
const handle = app.getRequestHandler()

// Create the secure HTTPS server:
// Don't forget to create the keys for your development
const options = {
    key: fs.readFileSync('/Users/altankhuusukhbaatar/Documents/projects/StudentAttendanceFrontend/secrets/private.key.pem'),
    cert: fs.readFileSync('/Users/altankhuusukhbaatar/Documents/projects/StudentAttendanceFrontend/secrets/certificate.pem'),
}

const server = createSecureServer(options);


app.prepare().then(() => {
    server.on('error', (err) => console.error(err))
    server.on('request', async (req, res) => {
        // res.end(req.url);
        const parsedUrl = parse(req.url, true)
        await handle(req, res, parsedUrl);
        // app.render(req, res, req.url || '/', req.query)
    })
    server.listen(port)

    console.log(`Listening on HTTPS port ${port}`)
})