var express= require("express");
var router= express.Router();
var Candidate= require("../models/candidate");
var mongoose=require("mongoose");
var csv= require("fast-csv");

//Index route: To show the home page to upload file
router.get("/", function(req, res){
   res.render("home"); 
});

//CREATE route - Route to create/add new Candidate data to database
router.post("/", function(req, res){
    if (!req.files)
            return res.status(400).send('No files were uploaded.');
            var candidateFile = req.files.file;
            var name = candidateFile.data.name;
            var phoneNumber = candidateFile.data.phone_number;
            var email = candidateFile.data.email_id;
            //Candidate.findOne
            Candidate.findOne({name:name}, function(err, data){
                if(err) console.log(err);
                if ( data){
                console.log("Name already exisst");
                } 
            })
            Candidate.findOne({phone_number:phoneNumber}, function(err, data){
                if(err) console.log(err);
                if ( data){
                console.log("Phone number already exisst");
                } 
            })
            Candidate.findOne({email_id:email}, function(err, data){
                if(err) console.log(err);
                if ( data){
                console.log("Email already exisst");
                } 
            })
        var candidate = [];
        csv
         .fromString(candidateFile.data.toString(), {
             headers: true,
             ignoreEmpty: true
         })
         .on("data", function(data){
             data['_id'] = new mongoose.Types.ObjectId();
              
             candidate.push(data);
         })
         .on("end", function(){
             Candidate.create(candidate, function(err, documents) {
                if (err) {throw err;}
                res.redirect("candidate");
             });
        res.send(candidate.length + ' Candidates have been successfully uploaded.');
    });
});

//Show route - shows/read all the records of Candidate
router.get("/candidate", function(req, res){
    Candidate.find({},function(err, candidate){
        if(err){
            throw err;
        } else {
            res.render("candidate",{candidate:candidate});
        }
    });
});

//Delete Route -  Delete Candidate Data, if not required
router.delete("/candidate/:id", function(req, res){
   Candidate.findByIdAndRemove(req.params.id, function(err){
     if(err){
         throw err;
         res.redirect("/upload/candidate");
     }  else {
         res.redirect("/upload/candidate");
     }
   });
});

//Exporting to the app.js
module.exports =router;
