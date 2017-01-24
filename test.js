const expect = require('chai').expect
const describe = require('mocha').describe
const it = require('mocha').it
const profiles = require('.')

describe('ownerProfiles', () => {
  describe('find(username)', () => {
    const zeke = profiles.find('zeke')

    it('returns a user object if it exists', () => {
      expect(zeke).to.be.an('object')
    })

    it('includes twitter', () => {
      expect(zeke.twitter).to.exist
    })

    it('includes email', () => {
      expect(zeke.email).to.exist
    })

    it('includes github', () => {
      expect(zeke.github).to.exist
    })

    it('includes homepage', () => {
      expect(zeke.homepage).to.exist
    })

    it('includes name', () => {
      expect(zeke.name).to.exist
    })

    it('returns null for nonexistent users', () => {
      expect(profiles.find('zeke-the-other')).to.equal(null)
    })
  })
})
