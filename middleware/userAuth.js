// import jwt from "jsonwebtoken"
// const userAuth = async(req , res , next)=>{
//     const{token}=req.cookies;
//     if(!token){
//         return res.json({success: false, message:'Not Authorized... Login again'})
//     }try{
//         const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
//         if(tokenDecode.id){
//             req.body.userID = tokenDecode.id;
//             console.log(req.body.userID);
//         }else{
//             return res.json({success:false,message:'Not Authorized... Login again'})
//         }
//         next();
//     }catch(error){
//         res.json({success:false,message:error.message})
//     }
// }

// export default userAuth;

import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Please login." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "Not authorized. Invalid token." });
    }

    req.body.userID = decoded.id;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token. Please login again." });
  }
};

export default userAuth;