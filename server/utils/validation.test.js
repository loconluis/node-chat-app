/* eslint-env mocha */
const expect = require('expect')

const {isRealString} = require('./validation')

describe('isRealString test', () => {
  // should reject non-string values
  it('Should reject non-string values', () => {
    let name = 1234
    expect(isRealString(name)).toNotBe(true)
  })

  it('Should reject string with only spaces', () => {
    let res = isRealString('             ')
    expect(isRealString(res)).toNotBe(true)
  })

  it('Should allow string with non-space charcaters', () => {
    let res = isRealString('           guatemala         ')
    expect(res).toBe(true)
  })
})
