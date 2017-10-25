/* eslint-env mocha */
const expect = require('expect')
const { generateMessage, generateLocationMessage } = require('./message')

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

describe('generateLocationMessage', () => {
  it('Should generate correct location-message object', () => {
    let from = 'Luis'
    let lat = '14'
    let lng = '21'
    const url = 'https://www.google.com/maps?q=14,21'
    const msg = generateLocationMessage(from, lat, lng)
    expect(msg.url).toMatch(url)
    expect(msg).toInclude({from, url})
    expect(msg.createdAt).toBeA('number')
  })
})
