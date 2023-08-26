const express = require('express')
const {
    getExpenses, 
    createExpenseData 
    } = require( '../controller/expensesController' )
const authCheck = require( '../middleware/authCheck' )

const router = express.Router()

router.use(authCheck)

router.get('/', getExpenses)

router.post('/', createExpenseData )

module.exports = router