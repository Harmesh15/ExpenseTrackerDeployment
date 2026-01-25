const GeminiApi = require("@google/genai");
require("dotenv").config();
const Expense = require("../models/expenseModel");
const users = require("../models/userModel");
const sequelize = require("sequelize");

const addExpense = async (req, res) => {
    console.log("addexpense hit");
    console.log("user id ", req.user.userId);

     try {

     const { amount, description } = req.body;
    
       const ai = new GeminiApi.GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
    
       const response = await ai.models.generateContent({
          "model" : "gemini-3-flash-preview",
          "contents":`one word category for this expense ${description}`
       })
      
    const categoryval = response.text;

        const expense = await Expense.create({
            amount: amount,
            category: categoryval,
            description: description,
            userId: req.user.userId
        })

         const user = await users.findOne({
            where: { id: req.user.userId },
            attributes: ['totalExpense']
        });
       
    
        const totalExpense = Number(user.totalExpense);
        const amountval = Number(req.body.amount);

        const updatetExpense = (totalExpense + amountval);  

        await users.update({totalExpense:updatetExpense},{where:{id:req.user.userId}})


        res.status(201).json(expense);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


const getExpense = async (req, res) => {
    console.log("refresh par chala")
    try {
        const getexpense = await Expense.findAll();

        res.status(200).json(getexpense);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}




const deleteExpense = async (req, res) => {
    console.log("hii from delete controller")
    try {
        const expenseId = req.params.id;
        const deleteExpense = await Expense.destroy({
            where: {
                id: expenseId,
                userId: req.user.userId
            }
        })

        if (!deleteExpense) {
            return res.status(404).json({
                message: "Expense not found or unauthorized"
            });
        }

        res.status(200).json({ message: "Expense delete successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateExpense = async (req, res) => {

    const updateId = req.params.id;
    const { amount, category, description } = req.body;

    try {

        const updateVal = Expense.findOne({
            where: {
                id: updateId,
                userId: req.user.userId
            }
        })

        if (!updateVal) {
            return res.status(404).json({
                message: "Expense not found or not authorized"
            });
        }

        updateVal.amount = amount ?? updateVal.amount;  // ?? isliye use kiya hai   if null / undefined → old value preserved
        updateVal.category = category ?? updateVal.category;
        updateVal.description = description ?? updateVal.description;

        await updateVal.save();
        res.status(200).json({ message: "update successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "value not updated server error" })
    }
}


const premiumUserFuncon = async (req, res) => {
    console.log("show primum chala controller m")
    try {
        // const response = await Expense.findAll({
        //     attributes: [
        //         [sequelize.col("name"), "name"],
        //         [sequelize.fn("SUM", sequelize.col("Expense.amount")), "total_amount"]
        //     ],
        //     include: [
        //         {
        //             model: users,
        //             attributes: []
        //         }
        //     ],
        //     group: [
        //         "name"
        //     ],
        //     order: [
        //         [sequelize.fn("SUM", sequelize.col("Expense.amount")), "DESC"]
        //     ],
        //     raw: true
        // })


        const response = await users.findAll({
            attributes:['name','totalExpense'],
            order:[['totalExpense', "DESC"]],
            raw:true

        })

        console.log(response.data);
        res.status(200).json(response);
    }    catch (error) {
        console.log(error.original);
        res.status(500).json(error.message);
    }
    // try {
    //     const response = await Expense.findAll({

    //         attributes: [
    //             "userId",
    //             [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"]
    //         ],
    //         include:[
    //             {
    //                 model:users,
    //                 attributes:["name"]
    //             }
    //         ],
    //         group: ["Expense.userId", "users.id"],
    //         order: [[sequelize.fn("SUM", sequelize.col("amount")), "DESC"]],
    //         raw: true
    //     })

    //     res.status(200).json({response});
    //     }

}



module.exports = {
    addExpense,
    deleteExpense,
    getExpense,
    updateExpense,
    premiumUserFuncon
}