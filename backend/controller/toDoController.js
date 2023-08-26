const ToDo = require('../models/toDoModel')
const mongoose = require('mongoose')

const getToDos = async ( req, res ) => {
  const username = req.user.username

  const toDos = await ToDo.find({username}).sort({createdAt: -1})

  res.status(200).json(toDos)
}

const getToDo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such to - do entry'})
  }

  const toDo = await toDo.findById(id)

  if (!toDo) {
    return res.status(404).json({error: 'No such to - do entry'})
  }

  res.status(200).json(toDo)
}

const createToDo = async (req, res) => {
  const {activity , description} = req.body

  let emptyFields = []

  if(!activity)
  emptyFields.push("Activity")

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const username = req.user.username
    const toDoData = await ToDo.create({ activity , description , username})
    res.status(200).json(toDoData)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteToDo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such toDo'})
  }

  const toDo = await ToDo.findOneAndDelete({_id: id})

  if(!toDo) {
    return res.status(400).json({error: 'No such toDo'})
  }

  res.status(200).json(toDo)
}

// const updateToDo = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({error: 'No such toDo'})
//   }

//   const toDo = await ToDo.findOneAndUpdate({_id: id}, {
//     ...req.body
//   })

//   if (!toDo) {
//     return res.status(400).json({error: 'No such toDo'})
//   }

//   res.status(200).json(toDo)
// }

module.exports = {
  getToDos,
  getToDo,
  createToDo,
  deleteToDo,
  // updateToDo
}