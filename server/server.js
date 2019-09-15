const path = require('path')
const cookieParser = require('cookie-parser')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt-edge')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// view engine setup
// app.set('views', path.join(__dirname, '../views'))
// app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Configure route handlers
app.use('/', (req, res, next) => {
    if (req.url !== '/') return next()
    res.render('index', { title: 'Express' })
})

// app.use('/users', (req, res, next) => {
//     res.send('respond with a resource')
// })

// Import and Set Nuxt.js options
let config = require('../frontend/nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

start()

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}
