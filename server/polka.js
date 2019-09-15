const { join } = require('path')
const polka = require('polka')

const { PORT = 4000 } = process.env

const dir = join(__dirname, '../public')
const serve = require('serve-static')(dir)

// Prepare Nuxt
const { Nuxt, Builder } = require('nuxt-edge')
let config = require('../frontend/nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)

const builder = new Builder(nuxt) // Build only in dev mode

builder.build().then(() => {
    polka()
        .get('/health', (req, res, next) => {
            res.end('OK')
        })

        .use(serve)

        .use((req, res, next) => {
            if (req.url === '/health' || !config.dev) return next()
            return nuxt.render(req, res, next)
        })

        .listen(PORT, err => {
            if (err) throw err
            console.log(`> Running on localhost:${PORT}`)
        })
})
