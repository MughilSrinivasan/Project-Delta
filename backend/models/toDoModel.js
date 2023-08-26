const mongoose = require('mongoose')

const Schema = mongoose.Schema

const toDoSchema = new Schema({
  activity : {
    type: String,
    required: true
  },
  description : {
    type: String
  },
  username: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('toDo', toDoSchema)