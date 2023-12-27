const { validationResult } = require('express-validator');
const userService = require('../services/user-service');
const ApiError = require('../exceptions/api-error');
const errorsNames = require('../exceptions/errors-names');

class UserController {
    async registration (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(errorsNames.validationError, errors.array()));
            }
            const { firstName, lastName, jobTitle, email, password } = req.body;
            const userData = await userService.registration(firstName, lastName, jobTitle, email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/api/r/' });
            res.cookie('accessToken', userData.accessToken, { maxAge: 5 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    
    async checkAuth (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.checkAuth(refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login (req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true , path: '/api/r/' });
            res.cookie('accessToken', userData.accessToken, { maxAge: 5 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken', {path: '/api/r/'})
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate (req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true , path: '/api/r/' });
            res.cookie('accessToken', userData.accessToken, { maxAge: 5 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers (req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}
module.exports = new UserController();
