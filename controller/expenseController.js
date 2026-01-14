
const { where } = require("sequelize");
const Expense = require("../models/expenseModel");

const addExpense = async (req,res)=>{
   try{
        const {amount,category,description} = req.body;

        if(!amount || !category || !description){
          return res.send(  alert("all fields require"))
        }

    const expense = await Expense.create({
        amount:amount,
        category:category,
        description:description
    })

    res.status(201).json(expense);

   }catch(error){
    res.status(500).send(error)
   }
}




const deleteExpense = async (req,res)=>{
    try{
        const deleteExpense = await Expense.destroy({
        where:{
            id:req.params.id
        }
    })
    res.status(200).send("user delete succesfully");

    }catch(error){
        res.status(500).send(error)
    }

}


const getExpense = async (req,res)=>{
    
      try{
        const getexpense = await Expense.findAll();
        res.status(200).json(getexpense);
      }catch(error){
        res.status(500).send(error);
      }
}


// const updateExpense = async (req,res)=>{

//     const updateWith = req.body;
//     const updateId = req.params.id;

//     const updatedVal = Expense.findOne
// }

module.exports = {
    addExpense,
    deleteExpense,
    getExpense
}