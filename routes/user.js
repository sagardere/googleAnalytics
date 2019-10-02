const async = require('async');
const config = require('../config/index.js');
const mongoModels = require("../mongoModels/index")();
const User = mongoModels.user();

module.exports = () => {
  var result = {};

  result.registration = async (req, res) => {
    console.log(">> Inside registration.");

    var dateOfBirth = (req && req.body && req.body.dateOfBirth) ? req.body.dateOfBirth : '';
    var email = (req && req.body && req.body.email) ? req.body.email : '';
    var loanAmount = (req && req.body && req.body.loanAmount) ? req.body.loanAmount : '';
    var mobileNumber = (req && req.body && req.body.mobileNumber) ? req.body.mobileNumber : '';
    var monthlyIncome = (req && req.body && req.body.monthlyIncome) ? req.body.monthlyIncome : '';
    var city = (req && req.body && req.body.city) ? req.body.city : '';
    var loanApproval = false;

    let userExist = await User.findOne({
      email: email
    });

    if (userExist) {
      return res.json({
        success: false,
        message: "Email Allready Exists."
      });
    }

    const user = new User({
      dateOfBirth: dateOfBirth,
      email: email,
      loanAmount: loanAmount,
      mobileNumber: mobileNumber,
      monthlyIncome: monthlyIncome,
      city: city,
      loanApproval: loanApproval
    });

    let newUser = await user.save();
    if (!newUser) {
      return res.json({
        success: false,
        message: "Error In User Registration."
      });
    }

    res.json({
      success: true,
      message: "User Registration Successfully.",
      data: newUser
    });
  };

  return result;
};