const fs = require('fs')
const path = require('path')
const owners = require('owners')
const RateLimiter = require('limiter').RateLimiter
const limiter = new RateLimiter(5, 'second')
const getProfile = require('../lib/get-profile')
const requireDir = require('require-dir')
const prefetchedProfiles = requireDir('../profiles')
const prefetchedUsernames = Object.keys(prefetchedProfiles)

console.log(`owners.length: ${owners.length}`)
console.log(`prefetchedUsernames.length: ${prefetchedUsernames.length}`)

let usernames = owners
  .map(o => o.username)
  .filter(username => !prefetchedUsernames.includes(username))

console.log(`usernames.length: ${usernames.length}`)

usernames.forEach(username => {
  limiter.removeTokens(1, () => {
    
  })
})
