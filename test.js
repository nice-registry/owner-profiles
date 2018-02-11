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

  // it('includes homepage', () => {
  //   expect(owner.homepage).to.be.a('string')
  // })

  it('includes name', () => {
    expect(owner.name).to.be.a('string')
  })
})
