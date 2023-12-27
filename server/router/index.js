const Router = require('express').Router;
const { body } = require('express-validator');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const router = new Router();

router.post('/registration',
    body('firstName').isLength({ min: 1, max: 32 }),
    body('lastName').isLength({ min: 1, max: 32 }),
    body('jobTitle').isLength({ min: 1, max: 32 }),
    body('email').isEmail(),
    body('password').isLength({ min: 1, max: 32 }),
    userController.registration
);
router.post('/login',  userController.login);
router.post('/r/logout', userController.logout);
router.post('/r/checkAuth',authMiddleware, userController.checkAuth);
router.get('/activate/:link', userController.activate);
router.get('/r/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
