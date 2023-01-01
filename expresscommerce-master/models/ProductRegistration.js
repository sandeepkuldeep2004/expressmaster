const mongoose = require('mongoose')

const ProductRegistrationSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required:true,
  },
  invoiceNo: {
    type: String,
    required: false,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required:true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required:true,
  },
  warrantyProductCode: {
    type: String,
    required: false,
  },
  warrantyStartDate: {
    type: Date,
    required: false,
  },
  warrantyEndDate: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive'],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  }
  
});
module.exports = mongoose.model('ProductRegistration', ProductRegistrationSchema)
