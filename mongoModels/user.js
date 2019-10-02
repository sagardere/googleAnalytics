const mongoose = require('mongoose');

const user = new mongoose.Schema({
	email:String,
	dateOfBirth:String,
	loanAmount: Number,
	mobileNumber:String,
	monthlyIncome: Number,
	city: String,
	loanApproval: Boolean

},{strict:false});


module.exports = user;