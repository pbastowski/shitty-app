/**
 * Nuxt stuff here
 */
const { Nuxt, Builder } = require('nuxt-edge')

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

module.exports = async function start(app) {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    // Build only in dev mode
    if (config.dev) {
        console.log('DEV MODE')
        await new Builder(nuxt).build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)
}
