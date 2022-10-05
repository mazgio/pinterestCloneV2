import mongoose from 'mongoose';

//Mongoose Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String], //Array of Strings
    selectedFile: String, //File Image is a String 
    likes: { type: [String], default: [] }, //default = additional information
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

var PostPin = mongoose.model('PostPin', postSchema); //model(1st parameter,2nd parameter)

export default PostPin;