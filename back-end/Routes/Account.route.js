const router = require("express").Router();
const accountController = require("../Controllers/Account.controller");

router.post('/createAccount',accountController.createAccount);
router.get('/getAllAccount',accountController.getAllAccount);
router.get('/getASingleAccount/:_id', accountController.getASingleAccount);
router.put('/updateAccount/:_id', accountController.updateAccount);
router.delete('/deleteAccount/:_id', accountController.deleteAccount);

module.exports = router;