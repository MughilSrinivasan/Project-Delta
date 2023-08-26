const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expensesSchema = new Schema( {
  year: {
    type: Number,
    required: true
  },
  monthNumber: {
    type: Number,
    required :true
  },
  formData : {
    type: Object,
  },
  username: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Expenses', expensesSchema)