const router = require('express').Router();

const AuthController = require('../controllers/AuthController');
const AccessMidleware = require('../helpers/accessKey');


router.post('/login', AuthController.login);
router.get('/logout', AccessMidleware.checkAccess("all"), AuthController.logout);
router.get('/ping', AuthController.ping);

module.exports = router;
