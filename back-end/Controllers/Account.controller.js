
const accountModel = require("../Models/Account.model");

const accountController = {
    createAccount: async(req,res)=>{
        try {
            const newAccount = new accountModel(req.body);
            await newAccount.save().then((account)=>{
                res.status(201).json(account);
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllAccount: async(req,res)=>{
        try {
            const allAccount = await accountModel.find({});
            res.status(200).json(allAccount);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getASingleAccount: async(req,res)=>{
        try {
            const id_account = req.params._id;
            await accountModel.findById(id_account).then((account)=>{
                res.status(200).json(account);
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateAccount: async(req,res)=>{
        try {
            const id_account = req.params._id;
            const updateAccount = req.body;
            const newAccount =  await accountModel.findByIdAndUpdate(id_account,updateAccount,{new:true});
            res.status(200).json(newAccount);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    deleteAccount: async(req,res)=>{
        try {
            const id_account = req.params._id;
            await accountModel.findByIdAndDelete(id_account);
            res.status(200).json("Deleted account successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = accountController;