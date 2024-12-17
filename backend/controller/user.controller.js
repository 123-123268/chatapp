import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import createTokenandSaveCookie from "../jwt/generatetoken.js";
export const signin = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;
  try {
    if (!fullname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirmPassword don't match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    const newUser = await new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      // createTokenandSaveCookie(newUser._id, res);
      res.status(201).json({ message: "User create successfully", user:{fullname:newUser.fullname,email:newUser.email,_id:newUser._id} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mesage: "error something went wrong" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    // createTokenandSaveCookie(user._id, res);
    res.status(200).json({
      message: "User login successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mesage: "error something went wrong" });
  }
}; 
export const logout = async (req, res) => {
  try {
    // res.clearCookie("jwt");
    res.status(201).json({ message: "User logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mesage: "error something went wrong" });
  }
};
export const allUsers=async(req,res)=>{
  try {
    // const logginedUser=req.user._id;
    const logginedUser=req.params.id;
    const filteredusers = await User.find({_id:{$ne: logginedUser}}).select("-password");
    res.status(200).json( filteredusers );
    } catch (error) {
      console.log(error);
      res.status(500).json({ mesage: "error something went wrong" });
      }
}