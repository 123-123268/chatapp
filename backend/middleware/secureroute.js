import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const secureroute = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).send("Access denied. No token provided");
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if(!decoded){
        return res.status(401).send("Access denied. Invalid token");
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).send("User not found");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default secureroute;
