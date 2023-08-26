const mongoose = require( 'mongoose' )
const bcrypt = require( 'bcrypt' )

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: "String"
  },
  fileName: {
    type : "String"
  }
})

userSchema.statics.signup = async function(username, password , image , fileName) {

  if (!username || !password) {
    throw Error('All fields must be filled')
  }

  const exists = await this.findOne({ username })

  if (exists) {
    throw Error('Username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, password: hash, image, fileName })

  return user
}

userSchema.statics.login = async function(username, password) {

  if (!username || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ username })
  if (!user) {
    throw Error('Incorrect username')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)