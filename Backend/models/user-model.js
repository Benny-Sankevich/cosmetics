const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Missing First Name."],
        minLength: [3, "First name must be minimum 3 chars."],
        maxLength: [20, "First name can`t exceed 20 chars."],
        match: [/^[A-Zא-ת].*$/, "First name  must start with a capital letter."]
    },
    lastName: {
        type: String,
        required: [true, "Missing Last Name."],
        minLength: [3, "Last name must be minimum 3 chars."],
        maxLength: [20, "Last name can`t exceed 20 chars."],
        match: [/^[A-Zא-ת].*$/, "Last name must start with a capital letter."]
    },
    email: {
        type: String,
        required: [true, "Missing Email."],
        unique: [true, "Email already exist."],
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Email must be valid."]
    },
    phoneNumber: {
        type: String,
        required: [true, "Missing phone number."],
        unique: [true, "Phone number already exist."],
        match: [/^\d{10}$/, "Phone number must be 10 digits."]
    },
    imageName: {
        type: String,
        required: [true, "Missing image name."],
    },
    oldImageName: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    createdDate: {
        type: String,
    },
    lastModified: {
        type: String,
    },
},
    {
        versionKey: false,
        id: false
    });

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;