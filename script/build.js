#!/usr/bin/env node

const npmUser = require('npm-user')
const usernames = require('owners').map(o => o.username)
const db = require('../lib/db')
const Bottleneck = require('bottleneck')
const humanInterval = require('human-interval')
const limiter = new Bottleneck({
  maxConcurrent: 5
})

const jobStartTime = Date.now()
const jobDuration = humanInterval('45 minutes')

const TTL = humanInterval('7 days')

console.log(`found ${usernames.length} usernames in 'owners' package`)

async function saveProfile (username) {

  if (Date.now() > jobStartTime + jobDuration) {
    console.log('time is up! exiting')
    process.exit()
  }

  let existingProfile

  try {
    existingProfile = await db.get(username)
  } catch (e) {
    // no worries
  }

  if (existingProfile && existingProfile.updatedAt) {
    if (new Date(existingProfile.updatedAt).getTime() + TTL > Date.now()) {
      console.log(`${username} (up to date; skipping)`)
      return
    } 
  }

  const profile = await npmUser(username)
  if (profile) {
    console.log(username)
    profile.updatedAt = new Date()
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