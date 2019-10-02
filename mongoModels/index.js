const mongoose = require('mongoose');
const user = require('./user');

module.exports =  () => {
    const mongoModels = {};

    mongoModels.user =  () => {
        return mongoose.model('user', user);
    };
    
  return mongoModels;
};