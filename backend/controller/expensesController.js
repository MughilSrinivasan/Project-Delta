const Expenses = require( '../models/expensesModel' )

const getMonthNumber = ( month ) =>
{
    switch ( month )
    {
        case "January":
        case "january":
            return 0;
        case "February":
        case "february":
            return 1;
        case "March":
        case "march":
            return 2;
        case "April":
        case "april":
            return 3;
        case "May":
        case "may":
            return 4;
        case "June":
        case "june":
            return 5;
        case "July":
        case "july":
            return 6;
        case "August":
        case "august":
            return 7;
        case "September":
        case "september":
            return 8;
        case "October":
        case "october":
            return 9;
        case "November":
        case "november":
            return 10;
        case "December":
        case "december":
            return 11;
        default:
            return -1;
    }
}

const getExpenses  = async ( req, res ) => {
    const username = req.user.username

    const expenses = await Expenses.find({username},{"formData" : 1, "_id" : 0}).sort({year : 1, monthNumber : 1})

    res.status(200).json(expenses)
}


const createExpenseData  = async (req, res) => {
    const { year, month, formData } = req.body

    //console.log(data)

    if ( !year || !month )
        return res.status(404).json({error: 'Please enter year and month...'})
    
    const monthNumber = getMonthNumber( month )
    
    if ( monthNumber == -1 )
        return  res.status(404).json({error: 'Please enter full name of month properly...'})

    try {
        const username = req.user.username
        const expenseData = await Expenses.create({ year, monthNumber , formData , username})
        res.status(200).json(expenseData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getExpenses, 
    createExpenseData 
}