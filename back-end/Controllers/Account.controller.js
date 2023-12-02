
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
    getAccountByAccountType: async (req, res) => {
        try {
            const page = req.params.page; // Trang được yêu cầu (mặc định là trang 1)
            const perPage = 10; // Số tài khoản mỗi trang

            const accounts = await accountModel
                .find({ account_type: req.params.account_type })
                .skip((page - 1) * perPage) // Bỏ qua các tài khoản đã lấy trước đó
                .limit(perPage); // Giới hạn số lượng tài khoản được trả về

            res.status(200).json(accounts);
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
    },
    singin: async(req,res)=>{
        try {
            const { email, pass } = req.body;
            const account = await accountModel.findOne({ email: email });
            if (account != null && account.pass === pass) {
                res.status(200).json(account);
            }
            else{
                res.status(404).json("Sai tài khoản hoặc mật khẩu");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    pageNumber: async(req,res)=>{
        try {
            const countAccount = await accountModel.find({account_type:req.params.account_type}).countDocuments();
            const pageNumber = Math.ceil(countAccount/10);
            res.status(200).json(pageNumber)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = accountController;