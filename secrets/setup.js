'use strict'

// npm install mkcert --save-dev
const mkcert = require('mkcert')
const fs = require('fs')

console.log('Initializing...')
;(async function retriveSertificataes() {
  const ca = await mkcert.createCA({
    organization: 'Able Soft',
    countryCode: 'MN',
    state: 'Ulaanbaatar',
    locality: 'Sukhbaatar',
    validityDays: 365,
  })

  const cert = await mkcert.createCert({
    domains: ['127.0.0.1', 'localhost'],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert,
  })

  fs.writeFileSync('./secrets/private.key.pem', cert.key, {
    encoding: 'utf8',
    flag: 'w',
  })
  fs.writeFileSync('./secrets/certificate.pem', cert.cert, {
    encoding: 'utf8',
    flag: 'w',
  })

  console.log('success.', cert)
})()
