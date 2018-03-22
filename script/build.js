#!/usr/bin/env node

require('make-promises-safe')
require('dotenv-safe').load()

const npmUser = require('npm-user')
const usernames = require('owners').map(o => o.username)
const db = require('../lib/db')
const Bottleneck = require('bottleneck')
const humanInterval = require('human-interval')
const limiter = new Bottleneck({
  maxConcurrent: 3
})

const jobStartTime = Date.now()
const jobDuration = humanInterval(process.env.JOB_DURATION)
const TTL = humanInterval(process.env.PROFILE_TTL)

const freshProfiles = []

console.log(`${usernames.length} total users on npm`)

db.createReadStream()
.on('data', ({key: username, value: profile}) => {
  if (!profile) return
  if (!profile.updatedAt) return
  if (new Date(profile.updatedAt).getTime() + TTL < Date.now()) return
  freshProfiles.push(username)
})
.on('end', () => {
  console.log(`${freshProfiles.length} fresh profiles`)
  const usernamesToUpdate = usernames.filter(username => !freshProfiles.includes(username))
  console.log(`${usernamesToUpdate.length} outdated profiles`)

  usernamesToUpdate.forEach(username => {
    limiter.schedule(saveProfile, username)
  })

  limiter
    .on('idle', () => {
      console.log('done')
      process.exit()
    })
    .on('error', (err) => {
      console.log('bottleneck error', err)
      process.exit()
    })
})

async function saveProfile (username) {
  if (Date.now() > jobStartTime + jobDuration) {
    console.log('time is up! exiting')
    process.exit()
  }

  try {
    const profile = await npmUser(username)
    profile.updatedAt = new Date()
    const result = await db.put(username, profile)
    console.log(username, '(good)')
    return result
  } catch (err) {
    console.error(username, '(not found on npm)')
  }
}
