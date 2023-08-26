const User = require( '../models/userModels' )
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '5d' })
}

const loginUser = async (req, res) => {
const {username, password} = req.body

  try {
    const user = await User.login(username, password)

    const token = createToken( user._id )
    
    const id = user._id

    const fileName = user.fileName

    res.status(200).json({username, token , id , fileName})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const signupUser = async (req, res) => {
  
  try {

    const username = req.body.username
    const password = req.body.password
    console.log(req.file)
    const filename = req.file.filename
    const user = await User.signup(username, password , req.file.path , filename )

    const token = createToken( user._id )

    const id = user._id

    const imagePath = user.image

    
    res.status(200).json({username, token , id , imagePath , filename})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getUsers =async (req, res) => {
  const userData = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } }
        ],
      }
    : {};

  const users = await User.find( userData, { username: 1, image : 1 } ).find({ _id: { $ne: req.user._id } });
  
  res.status(200).send(users);
}


module.exports = { signupUser, loginUser,getUsers }