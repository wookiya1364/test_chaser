const http = require("http");
const { parse } = require("url");
const next = require("next");

const https = require("https");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;
const HTTPS_PORT = 3001;
const httpsOptions = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
};

app.prepare().then(() => {
    http.createServer((req, res) => {
        const parsedURL = parse(req.url, true);
        handle(req, res, parsedURL);
    }).listen(PORT, (err) => {
        if (err) {
            throw err;
        } else {
            console.log(`Ready on http://localhost:${PORT}`);
        }
    });

    //Add https
    https
        .createServer(httpsOptions, function (req, res) {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl);
        })
        .listen(HTTPS_PORT, (err) => {
            if (err) throw err;
            console.log(`> Ready on https://localhost:${HTTPS_PORT}`);
        });
});
