const router = require("express").Router();
const accountController = require("../Controllers/Account.controller");

router.post('/createAccount',accountController.createAccount);
router.get('/getAllAccount',accountController.getAllAccount);
router.get('/getASingleAccount/:_id', accountController.getASingleAccount);
router.put('/updateAccount/:_id', accountController.updateAccount);
router.delete('/deleteAccount/:_id', accountController.deleteAccount);
router.post("/singin",accountController.singin);
router.get('/getAccountByAccountType/:account_type&:page',accountController.getAccountByAccountType);
router.get('/pageNumber/:account_type',accountController.pageNumber)

module.exports = router;