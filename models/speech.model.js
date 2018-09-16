const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const speechSchema = new Schema({
	name: {type: String, required: true, unique: true},
	code: {type: String, required: true, unique: true},
	words: [String]
});

speechSchema.index({words: "text"});

const Model = mongoose.model('Speech', speechSchema);
module.exports = Model;