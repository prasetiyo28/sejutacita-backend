const router = require('express').Router();

const UserController = require('../controllers/UserController');
const AccessMidleware = require('../helpers/accessKey');
// const Validator = require('../helpers/validation');

router.get('/', AccessMidleware.checkAccess('admin'), UserController.getAllUser);
router.get('/profile', AccessMidleware.checkAccess('all'), UserController.userProfile);
router.post('/create', AccessMidleware.checkAccess('all'), UserController.createUser);
router.get('/user-id/:id_user', AccessMidleware.checkAccess('admin'), UserController.userById);
router.delete('/user-id/:id_user', AccessMidleware.checkAccess('admin'), UserController.delete);
router.put('/update', AccessMidleware.checkAccess('admin'), UserController.update);

module.exports = router;
