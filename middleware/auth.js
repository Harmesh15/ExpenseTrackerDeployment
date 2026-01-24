const jwt = require("jsonwebtoken");

const authorizationToken = async (req,res,next)=>{
   

   const authHeader = req.headers['authorization'];
    const token =  authHeader && authHeader.split(' ')[1]; // bearer

    if(!token) return res.status(401).json({message:"Acces token missing"});

        jwt.verify(token,"harmesh15",(err,user)=>{
         if(err){
            res.status(403).json({message:"Invalid or Expired token"});
         }
         // harmesh15 = process.env.JWT_SECRET; 
        
        req.user = user;
        next();
   });
}

module.exports = authorizationToken;