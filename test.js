const {expect} = require('chai')
const {describe, it, before} = require('mocha')
const profiles = require('.')

describe('ownerProfiles', () => {
  var owner

  before(async () => {
    owner = await profiles.get('juliangruber')
  })

  it('returns a user object if it exists', () => {
    expect(owner).to.be.an('object')
  })

  it('includes twitter', () => {
    expect(owner.twitter).to.be.a('string')
  })

  it('includes email', () => {
    expect(owner.email).to.be.a('string')
  })

  it('includes github', () => {
    expect(owner.github).to.be.a('string')
  })

  it('includes name', () => {
    expect(owner.name).to.be.a('string')
  })

  it('has lots of entries', function (done) {
    this.timeout(10 * 1000)
    let count = 0
    profiles.createReadStream()
      .on('data', (data) => {
        count++
      })
      .on('end', () => {
        expect(count).to.be.above(169 * 1000)
        done()
      })
  })
})
