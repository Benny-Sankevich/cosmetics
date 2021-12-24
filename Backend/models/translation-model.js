const mongoose = require("mongoose");

const TranslationSchema = mongoose.Schema({
    code: {
        type: String,
        required: [true, "Missing code."],
        minLength: [2, "Code must be minimum 2 chars."],
        maxLength: [40, "Code can`t exceed 40 chars."],
    },
    value: {
        type: String,
        required: [true, "Missing value."],
        minLength: [2, "Value must be minimum 2 chars."],
        maxLength: [50, "Value can`t exceed 50 chars."],
        match: [/^[A-Zא-ת].*$/, "Value  must start with a capital letter."]
    },
    languageCode: {
        type: String,
        required: [true, "Missing language code."],
        minLength: [2, "Language code must be minimum 2 chars."],
        maxLength: [20, "Language code can`t exceed 20 chars."],
    },
    moduleName: {
        type: String,
        required: [true, "Missing module name."],
        minLength: [2, "Module name must be minimum 2 chars."],
        maxLength: [20, "Module name can`t exceed 20 chars."],
        match: [/^[A-Zא-ת].*$/, "Module name  must start with a capital letter."]
    }
},
    {
        versionKey: false,
        id: false
    });

const TranslationModel = mongoose.model("TranslationModel", TranslationSchema, "translations");

module.exports = TranslationModel;