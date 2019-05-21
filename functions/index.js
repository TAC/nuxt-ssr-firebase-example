const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/assets/'
  }
}
const nuxt = new Nuxt(config)

async function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  await nuxt.ready()
  return nuxt.render(req, res)
}

const app = express()
app.use(handleRequest)

exports.ssr = functions.https.onRequest(app)
