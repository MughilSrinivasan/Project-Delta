const express = require('express')
const {
    getToDos, 
    getToDo, 
    createToDo, 
    deleteToDo, 
    // updateToDo
} = require( '../controller/toDoController' )
const authCheck = require( '../middleware/authCheck' )

const router = express.Router()

router.use(authCheck)

router.get('/', getToDos)

router.get('/:id', getToDo)

router.post('/', createToDo)

router.delete('/:id', deleteToDo)

// router.patch('/:id', updateToDo)

module.exports = router