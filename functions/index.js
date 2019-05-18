const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')

const config = {
  dev: false,
  debug: true,
  buildDir: 'nuxt',
  build: {
    publicPath: '/assets/'
  }
}
const nuxt = new Nuxt(config)

function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, promise => {
      promise.then(resolve).catch(reject)
    })
  })
}

const app = express()
app.use(handleRequest)

exports.ssr = functions.https.onRequest(app)
