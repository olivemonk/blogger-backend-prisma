const prisma = require('../prisma/index')
const jwt = require('jsonwebtoken')

const isLoggedIn = async (req,res,next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      res.send('You are not logged in')
      throw new Error('You are not logged in') // send a response and close next
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      }
    })
    //ou can do more checks
    next()
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = isLoggedIn;