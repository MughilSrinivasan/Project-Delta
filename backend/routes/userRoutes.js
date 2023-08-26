const express = require( 'express' )
const multer = require( "multer" );

const { loginUser, signupUser , getUsers } = require('../controller/userController')
const authCheck = require( '../middleware/authCheck' )


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/project/frontend/src/images");
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + "_" + file.originalname );
    },
});

const upload = multer({ storage: storage });

const router = express.Router()

router.post('/login' , loginUser)

router.post( '/signup', upload.single("image") , signupUser )

router.use(authCheck)

router.get( '/users', getUsers)

module.exports = router