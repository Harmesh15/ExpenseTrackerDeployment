const users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "all field required" })
        } 

        const hashedPass = await bcrypt.hash(password,10);

        const response = await users.create({
            name: name,
            email: email,
            password:hashedPass,
        })

        res.status(201).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};


const loginUser = async (req, res) => {
  console.log("login controller hit")
  try {
  
    const { email,password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await users.findOne({
      where: { email }
    });


      if (!user)  return res.status(400).json({ message: "invalid user" });
    
      const isMatched = await bcrypt.compare(password,user.password);
      if(!isMatched) return res.status(400).json({ message: "Wrong Password" })
         
        console.log(user.id,"this is id or find user from signlofin controller loginuser");

        const token = jwt.sign(
            {userId: user.id},
            "harmesh15",
             { expiresIn: "1h" }
        );

        console.log(token,"this is new token");
        res.json({message:"Login Successfull Token is",token});
    
  }catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    addUser,
    loginUser
}