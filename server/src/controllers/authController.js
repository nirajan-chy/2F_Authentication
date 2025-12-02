const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword, 
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      result: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// login

exports.Login = async (req , res )=>{
  try {
    const {email , password} = req.body;
    if(!email || !password) return res.status(401).json({
      success : false ,
      message: "Email and password required"
    });
    const user = await User.findOne({email});
    if(!user) return res.status(401).json({
      success : false ,
      message : "Invalid credintials"
    })
    const passwordChecked = await bcrypt.compare(password , user.password);
    if(!passwordChecked) return res.status(400).json({
      success : false ,
      message : "Invalid credintials"
    })
  } catch (error) {
    res.status(401).json({
      success : false ,
      message : error.message
    })
  }
}