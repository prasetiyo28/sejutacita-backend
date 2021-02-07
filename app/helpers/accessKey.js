const redisCache = require('../lib/RedisCache');

exports.checkAccess = function (method) {
  return async (req, res, next) => {
    try {
      const key = req.header('access_token') || req.params.access_token || '';
      const redisData = await redisCache.getInAsync(key);
      if (!redisData) return MSG.sendResponse(res, 'ACCESS NOT FOUND');
      req.user = redisData.user;
      switch (method) {
        case 'admin':
          if (req.user.role !== 'admin') return MSG.sendResponse(res, 'USER_NOT_PERMITTED');
          break;
        case 'user':
          if (req.user.role !== 'user') return MSG.sendResponse(res, 'USER_NOT_PERMITTED');
          break;
        case 'all':
          break;
        default:
          return MSG.sendResponse(res, 'METHOD_NOT_ALLOWED');
          break;
      }
      next();
    } catch (error) {
      console.log(error);
      return MSG.sendResponse(res, 'ACCESS NOT FOUND');
    }
  };
};
