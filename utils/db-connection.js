const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'expenseapp',
    'root',
    'harmesh15',{
        host:"localhost",
        dialect:'mysql'
    }
);

  
 (async ()=>{
    try{
         await sequelize.authenticate()
         console.log("connection created completed");
    }catch(error){
        console.log(error);
    }
 })();

 module.exports = sequelize;
