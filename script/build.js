#!/usr/bin/env node

const npmUser = require('npm-user')
const usernames = require('owners').map(o => o.username)
const db = require('level')('./db', {valueEncoding: 'json'})
const Bottleneck = require('bottleneck')
const limiter = new Bottleneck({
  maxConcurrent: 5
})

console.log(`found ${usernames.length} usernames in 'owners' package`)

async function saveProfile (username) {
  const profile = await npmUser(username)
  if (profile) {
    console.log(username)
    await db.put(username, profile)
  } else {
    console.error(`${username} (failed)`)
  }
}

usernames.forEach(username => {
  limiter.schedule(saveProfile, username)
})

limiter.on('idle', () => {
  console.log('done')
  process.exit()
})