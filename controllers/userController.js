// bring in prisma and cookie

const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");

// user signup

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check
    if (!name || !email || !password) {
      throw new Error("please provide all values");
    }
    const user = await prisma.User.create({
      data: {
        name,
        email,
        password,
      },
    });
    // send user a token
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = async (req, res) => {
  try {
    // take info from user
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("please provide all values");
    }
    // find a user based on email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // when there is no user
    if (!user) {
      throw new Error("no user found");
    }
    // check if password is correct
    if (user.password !== password) {
      throw new Error("password is incorrect");
    }
    //user is there and validation
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token"); // clear cookie of key value pair
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};
