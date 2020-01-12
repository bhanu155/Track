var mongoose=require("mongoose");

var dataSchema = new mongoose.Schema({
	
	numberOfNewUsers : [Number],
	numberOfUniqueUsers : [Number],
	domUsers : Number,
	intUsers : Number,
	browsersData : [ {brw: String, sessions:Number, bounceRate:Number} ],
	
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
	}
});

module.exports = mongoose.model("Data", dataSchema);