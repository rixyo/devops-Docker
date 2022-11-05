const mongoose=require("mongoose")
const postSchema=new mongoose.Schema({
    title:{
        String,
        require:[true,"Post must have title"],
        max:50
    },
    body:{
        String,
        require:[true,"Post must have body"],
        max:150

    },
    picture:{
        String
    },
    createdBy:{
    type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    }

},
{ timestamps: true }
)
module.exports = mongoose.model('Post', postSchema)