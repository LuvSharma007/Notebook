const mongoose = require('mongoose');
 
const contentSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},{ timestamps: true });

const content = mongoose.model('content',contentSchema);
module.exports = content;