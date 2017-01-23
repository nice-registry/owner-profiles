const path = require('path')
const fs = require('fs')

module.exports = {
  find: (username) => {
    const file = path.join(__dirname, `profiles/${username}.json`)
    return fs.existsSync(file) ? require(file) : null
  }
}
