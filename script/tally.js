#!/usr/bin/env node

require('make-promises-safe')
require('dotenv-safe').load()

const db = require('../lib/db')
const path = require('path')
const fs = require('fs')
const packageJsonPath = path.join(__dirname, '../package.json')
const packageJson = require(packageJsonPath)
const tally = {
  total: 0,
  email: 0,
  name: 0,
  github: 0,
  twitter: 0
}

db.createReadStream()
.on('data', ({key: username, value: profile}) => {
  tally.total++
  if (profile.email) tally.email++
  if (profile.name) tally.name++
  if (profile.github) tally.github++
  if (profile.twitter) tally.twitter++
})
.on('end', () => {
  packageJson.tally = tally
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('updated tally in package.json')
})
