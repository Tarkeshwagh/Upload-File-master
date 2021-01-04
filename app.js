var express= require("express"),
    app = express(),
    bodyParser= require("body-parser"),
    mongoose=require("mongoose"),
    fileUpload= require("express-fileupload"),
    methodOverride= require("method-override");

// Candidate Routes 
var candidateRoutes=require("./routes/candidate");

// Connecting to the MongoDB database
mongoose.connect("mongodb://localhost/xlsupload");
mongoose.Promise= global.Promise;
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(fileUpload());

// using the Candidate routes in app.js
app.use("/upload", candidateRoutes);
console.log(process.env.PORT);
console.log(process.env.IP);
app.listen(process.env.PORT || 3000, function(){
    console.log("Process Started!!");
});
