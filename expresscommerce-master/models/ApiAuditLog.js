const mongoose = require('mongoose')

const ApiAuditLogSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  tokenUsed: {
    type: String,
    required: true,
  },
  apiURI: {
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
  creationdate: {
    type: Date,
    default: Date.now,
  }
});
module.exports = mongoose.model('ApiAuditLog', ApiAuditLogSchema)
