require('dotenv').config();
const Sequelize = require("sequelize");

  const sequelize = new Sequelize(
    process.env.DB_NAME,      // expense_tracker
    process.env.DB_USER,      // root ya jo DB username hai
    process.env.DB_PASSWORD,  // harmesh15 ya jo password hai
    {
        host: process.env.DB_HOST,  // localhost ya render DB host
        port: process.env.DB_PORT || 3306, // optional, default MySQL port
        dialect: 'mysql',
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



 // const sequelize = new Sequelize(
//    'expense_tracker',
//     'root',
//     'harmesh15',{
//         host:"localhost",
//         dialect:'mysql'
//     }
// );