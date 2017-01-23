const fs = require('fs')
const path = require('path')
const cleanDeep = require('clean-deep')
const npmUser = require('npm-user')

module.exports = function getProfile (username) {
  return npmUser(username)
    .then(profile => {
      console.log(username)
      const filename = path.join(__dirname, `../profiles/${username}.json`)
      fs.writeFileSync(filename, JSON.stringify(cleanDeep(profile), null, 2))
      return Promise.resolve(true)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
