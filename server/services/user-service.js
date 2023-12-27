const UserModel = require('../db-models/user');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const mailService = require('./mail-service');
const errorsNames = require('../exceptions/errors-names');
const { DataTypes } = require('sequelize');

class UserService {
    static async changeAndUpdate (user, param, value) {
        user.set(param, value);
        return await user.save();
    }

    static async getTokensForUser (user) {
        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { user: userDto };
    }

    static async deleteUser (user) {
        return await UserModel.destroy({ where: { email: user.email } });
    }

    static async checkUserRegistration (user) {
        if ((user && (user.activationStatus && process.env.TEST_VAR_REREG_UNCONF_EMAIL == 1)) || (user && process.env.TEST_VAR_REREG_UNCONF_EMAIL != 1)) {
            throw ApiError.BadRequest(errorsNames.emailAlreadyExists);
        } else if (user && (!user.activationStatus && process.env.TEST_VAR_REREG_UNCONF_EMAIL == 1)) {
            await UserModel.destroy({ where: { email: user.email } });
        }
    }

    static async checkUserLogin (user, password) {
        if (!user) {
            throw ApiError.BadRequest(errorsNames.emailNotFound);
        }
        if (!user.activationStatus && process.env.TEST_VAR_LOGIN_AFTER_EMAIL_CONFIRMATION === 1) {
            throw ApiError.BadRequest(errorsNames.emailUnconfirmed);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest(errorsNames.incorrectPass);
        }
    }

    async registration (firstName, lastName, jobTitle, email, password) {
        let user = await UserModel.findOne({ where: { email: email } });
        await UserService.checkUserRegistration(user);
        user = await UserModel.create({ firstName, lastName, jobTitle, email, password: await bcrypt.hash(password, 3) });
        //await mailService.sendActivationMail(email, `${process.env.API_URL}${process.env.API_PATH}/activation/${user.activationLink}`);
        return UserService.getTokensForUser(user);
    }

    async resendMail (email) {
        const user = await UserModel.findOne({ where: { email: email } });
        if (!user) {
            throw ApiError.BadRequest(errorsNames.emailNotFound);
        }
        UserService.changeAndUpdate(user, 'activationStatus', true);
        user.activationLink = DataTypes.UUIDV4;
        await mailService.sendActivationMail(email, `${process.env.API_URL}${process.env.API_PATH}/activate/${user.activationLink}`);
    }

    async activate (activationLink) {
        const user = await UserModel.findOne({ where: { activationLink: activationLink } });
        if (!user) {
            throw ApiError.BadRequest(errorsNames.incorrectActivationLink);
        }
        UserService.changeAndUpdate(user, 'activationStatus', true);
    }

    async login (email, password) {
        const user = await UserModel.findOne({ where: { email: email } });
        await UserService.checkUserLogin(user, password);
        UserService.changeAndUpdate(user, 'lastLoginDate', new Date());
        return UserService.getTokensForUser(user);
    }

    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async checkAuth(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        return await UserModel.findOne({ where: { id: userData.id } });
    }
    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findOne({ where: { id: userData.id } });
        return UserService.getTokensForUser(user);
    }

    async getAllUsers () {
        const users = await UserModel.findAll();
        return users;
    }
}

module.exports = new UserService();
