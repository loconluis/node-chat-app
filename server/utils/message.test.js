/* eslint-env mocha */
const expect = require('expect')
const { generateMessage } = require('./message')

describe('generateMessage', () => {
  it('Should generate correct message object', () => {
    let from = 'Luis'
    let text = 'What\'s Up?'
    let msg = generateMessage(from, text)

    expect(msg.from).toMatch(from)
    expect(msg.text).toMatch(text)
    expect(msg.createdAt).toBeA('number')
  })
})
