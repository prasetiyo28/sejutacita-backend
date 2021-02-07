const Users = require('../services/users');
const bcrypt = require('bcrypt');

exports.getAllUser = async (req, res, next) => {
  try {
    const result = await Users.GetAllUser();
    return MSG.sendResponse(res, 'GET_ALL_USER_SUCCESS', result, true);
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'GET_ALL_USER_FAILED');
  }
};

exports.userProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await Users.getUserById(user.user_id);
    return MSG.sendResponse(res, 'GET_PROFILE_SUCCESS', result, true);
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'GET_PROFILE_FAILED');
  }
};

exports.userById = async (req, res, next) => {
  try {
    const userId = req.params.id_user;
    const result = await Users.getUserById(userId);
    return MSG.sendResponse(res, 'GET_PROFILE_SUCCESS', result, true);
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'GET_PROFILE_FAILED');
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const params = req.body;
    const user = await Users.checkExist(params);
    if (user) return MSG.sendResponse(res, 'EMAIL_ALREADY_EXIST');

    params.password = bcrypt.hashSync(params.password, 10);
    params.id_role = 1;

    const result = await Users.createUser(params);
    return MSG.sendResponse(res, 'CREATE_USER_SUCCESS', result, true);
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'CREATE_USER_FAILED');
  }
};

exports.update = async (req, res, next) => {
  try {
    const params = req.body;
    const result = await Users.update(params);
    return MSG.sendResponse(res, 'UPDATE_USER_SUCCESS', result, true);
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'UPDATE_USER_FAILED');
  }
};

exports.delete = async (req, res, next) => {
  try {
    const userId = req.params.id_user;
    const result = await Users.delete(userId);
    return MSG.sendResponse(res, 'DELETE_USER_SUCCESS', result, true);
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(res, 'DELETE_USER_FAILED');
  }
};
