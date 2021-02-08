const redisCache = require('../lib/RedisCache');
const md5 = require('md5');
const Users = require('../services/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.login = async (req, res, next) => {
  try {
    const params = req.body;
    const user = await Users.getUserByEmailUsername(params);

    if (!user) return MSG.sendResponse(res, 'EMAIL_NOT_FOUND');

    const checkPassword = await bcrypt.compare(params.password, user.password);
    if (checkPassword === false) return MSG.sendResponse(res, 'PASSWORD_NOT_MATCH');

    const result = { user_id: user.id, username: user.username, email: user.email, role: user.role.role };
    const currentTime = new Date().toISOString();
    const random = Math.random().toString();
    const accessKey = md5(currentTime + random);
    const authToken = { access_key: accessKey, user: result };
    redisCache.set(accessKey, authToken);
    redisCache.expire(accessKey, 86400);
    result.access_token = accessKey;

    return MSG.sendResponse(res, 'LOGIN_SUCCESS', result, true);
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'LOGIN_FAILED');
  }
};

exports.register = async (req, res, next) => {
  try {
    const validate = validationResult(req);
    if (!validate.isEmpty()) { return MSG.sendResponse(res, 'REGISTER_FAILED', validate.array()); }

    const params = req.body;
    const user = await Users.checkExist(params);
    if (user) return MSG.sendResponse(res, 'USERNAME_EMAIL_ALREADY_EXIST');

    params.password = bcrypt.hashSync(params.password, 10);
    const result = await Users.createUser(params);
    return MSG.sendResponse(res, 'REGISTER_SUCCESS', result);
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'REGISTER_FAILED');
  }
};

exports.cek = async (req, res, next) => {
  try {
    return MSG.sendResponse(res, 'CEK_SUCCESS', req.user);
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'CEK_FAILED');
  }
};

exports.logout = async (req, res, next) => {
  try {
    const user = req.user;
    const key = req.header('access_token');
    redisCache.del(key);
    return MSG.sendResponse(res, 'LOGOUT_SUCCESS');
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'LOGOUT_FAILED');
  }
};

exports.ping = async (req, res, next) => {
  return MSG.sendResponse(res, 'Pong');
};
