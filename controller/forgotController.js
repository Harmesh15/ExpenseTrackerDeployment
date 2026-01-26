
const generateforgotpasswd =  (req,res)=>{
    const {email} = req.body;

    console.log("you send request successfully",email);
}

module.exports = {
    generateforgotpasswd
}