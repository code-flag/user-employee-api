const mongoose = require("mongoose");

/** ___________________________PAYEE PERSONAL INFO________________________ */

const PersonalInfoSchema = mongoose.Schema({
  name:{type: String, required: true},
  email:{type: String, required: true},
  phone_no:{type: String, required: true},
});

/** ___________________________PAYEE BANK DETAILS_________________________ */

const BankDetailsSchema = mongoose.Schema({
  bank_name: {type: String, required: true},
  account_no: {type: String, required: true},
  account_type: {type: String, required: true},
});

const BenefitsSchema = mongoose.Schema({
  bonus: {type: String, default: 0, required: true}
});

/** ___________________________PAYEE MAIN SCHEMA___________________________ */

const PayeeSchema = mongoose.Schema({
  payee_id: String,
  personal_info: PersonalInfoSchema,
  bank_detail: BankDetailsSchema,
  amount: {type: String, required: true},
  tax: {type: Number, default: 1},
  benifit_status: {type: Boolean, default: false},
  benefits: [BenefitsSchema]
});

/**
 * _____________________PAYROLL Schedule Setting SCHEMA_________________________
 */

 const ScheduleSetting = mongoose.Schema({
    period: {type: String, default: 'monthly'},
    last_period: { type: Date, default: Date.now },
    next_period: { type: Date, default: Date.now },
});

/**
 * _____________________PAYROLL Schedule SCHEMA_________________________
 */

const ScheduleSchema = mongoose.Schema({
  userId: String,
  actionTime: Date,
  timeCreated: { type: Date, default: Date.now },
});

/**
 * _____________________History SCHEMA_________________________
 */

const HistorySchema = mongoose.Schema({
  userId: String,
  payroll: [PayeeSchema],
  timeCreated: { type: Date, default: Date.now },
});

/** __________________________USER FULL SCHEMA_____________________ */

const UserSchema = mongoose.Schema({
  userId: { type: String, required: true },
  payroll: [PayeeSchema],
  timeCreated: { type: Date, default: Date.now },
  schedule_setting: [ScheduleSetting],
  schedule_status: {type: Boolean, default: true}
});

UserPayroll = mongoose.model("UserPayroll", UserSchema);
PHistory = mongoose.model("History", HistorySchema);
Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = {UserPayroll, PHistory, Schedule};
