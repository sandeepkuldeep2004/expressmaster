const mongoose=require('mongoose');

const CustomerReviewSchema = new mongoose.Schema({
    id: {
      type: String,
      required: false,
    },
    headline: {
        type: String,
        required: false,
      },  
    comment: {
        type: String,
        required: false,
      },
    rating: {
        type: Number,
        required: false,
      },
    blocked: {
        type: Boolean,
        required: false,
      },
    alias: {
        type: String,
        required: false,
      }, 
    approvalStatus: {
        type: String,
        default: "INACTIVE",
        enum: ["ACTIVE", "INACTIVE","SUSPENDED"],
      },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required:false,
      },  
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:false,
      },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:false,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    modificationDate: {
      type: Date,
      default: Date.now,
    }
});


module.exports = mongoose.model('CustomerReview', CustomerReviewSchema)    