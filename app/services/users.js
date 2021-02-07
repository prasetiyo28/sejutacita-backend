const DB = require('../models');
const Users = DB.users;
const Roles = DB.roles;
const Sequelize = DB.Sequelize;
const Op = Sequelize.Op;

exports.getUserByEmailUsername = async params => {
  return Users.findOne({
    where: {
      [Op.or]: {
        email: params.username,
        username: params.username
      }
    },
    include: {
      model: Roles
    }
  });
};

exports.getUserById = async (userId) => {
  return Users.findOne({
    where: {
      id: userId
    },
    include: {
      model: Roles
    }
  });
};

exports.GetAllUser = async () => {
  return Users.findAll({
    include: {
      model: Roles
    }
  });
};

exports.checkExist = async params => {
  return Users.findOne({
    where: {
      [Op.or]: {
        email: params.email,
        username: params.username
      }
    }
  });
};

exports.createUser = async params => {
  return Users.create(params);
};

exports.updateUser = async params => {
  return Users.update(params, {
    where: {
      id: params.id
    }
  });
};

exports.delete = async userId => {
  return Users.destroy({
    where: {
      id: userId
    }
  });
};

exports.update = async params => {
  return Users.update(params, {
    where: {
      id: params.id
    }
  });
};
