var mongoose=require("mongoose");

// Creating CandidateSchema 
var candidateSchema= new mongoose.Schema({
   candidate_id:{
      type:String,
   },
   name:{
      type:String,
      required: "Name cant be empty"
   },
   email_id:{
      type:String,
      required: "Email can't be empty.",
      unique: true
   },
   phone_number:{
      type:String,
      required:"Phone number cant be empty",
   },
   candidates_data:[candidates_data],
   created_date:{
      type: Date,
   },
   created_by:{
      type:String,
   },
   modified_date:{
      type: Date,
   },
   modified_by:{
      type:String,
   }
});

var candidates_data = new mongoose.Schema({
   ctc:[ctc_object],
   candidateExperience:{
      type:String,
   },
   company:[company],
   location:[location],
   linkedIn:{
      type:String,
   }
})

var ctc_object = new mongoose.Schema({
   value:{
      type:String,
   },
   ctcUnit:{
      type:String,
   },
   ctcCurrency:{
      type:String,
   }
})

var company = new mongoose.Schema({
   name:{
      type:String,
   }
})

var location = new mongoose.Schema({
   city:{
      type:String,
   }
})

//Exporting Candidate Schema
module.exports= mongoose.model("Candidate", candidateSchema);