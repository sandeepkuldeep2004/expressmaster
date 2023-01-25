const mongoose = require('mongoose')

const AuditLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  systemIPAddress: {
    type: String,
    required: false,
  },
  origin: {
    type: String,
    required: false,
  },
  failedLoginAttempt: {
    type: Number,
    required: false,
  },
  loginDate: {
    type: Date,
  },
  logOutDate: {
    type: Date,
  }
});
module.exports = mongoose.model('AuditLog', AuditLogSchema)
