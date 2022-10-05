import mongoose from "mongoose";

const { Schema } = mongoose;

const generalUserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const generalUser = mongoose.model("generalUser", generalUserSchema);

// TODO: Encryption for the password field is not yet implemented.

//CustomerUserSchema.pre();

export default generalUser;
