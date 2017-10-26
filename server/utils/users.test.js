/* eslint-env mocha */
const expect = require('expect')
const { Users } = require('./users')

describe('Users class', () => {
  let users

  beforeEach(() => {
    users = new Users()
    users.users = [
      {
        id: '1',
        name: 'Luis',
        room: 'React'
      },
      {
        id: '2',
        name: 'Monica',
        room: 'React'
      },
      {
        id: '3',
        name: 'Diego',
        room: 'Angular'
      }
    ]
  })

  it('Should add a new user', () => {
    // instance of the class Users
    let users = new Users()
    // create a user data object
    const user = {
      id: '123',
      name: 'Luis',
      room: 'Office Fam'
    }
    // Take the return of the addUser function
    let resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('Should remove a user', () => {
    const userRemoved = users.removeUser('1')

    expect(userRemoved.id).toBe('1')
    expect(users.users.length).toBe(2)
  })

  it('Should not remove a user', () => {
    const userRemoved = users.removeUser('12')

    expect(userRemoved).toNotExist()
    expect(users.users.length).toBe(3)
  })

  it('Should find a user', () => {
    const userFound = users.getUser('2')

    expect(userFound).toEqual(users.users[1])
  })

  it('Should not find a user', () => {
    const userFound = users.getUser('4')

    expect(userFound).toNotExist()
  })

  it('Should return names for React room', () => {
    const userList = users.getUserList('React')

    expect(userList).toEqual(['Luis', 'Monica'])
  })

  it('Should return names for Angular room', () => {
    const userList = users.getUserList('Angular')

    expect(userList).toEqual(['Diego'])
  })
})
