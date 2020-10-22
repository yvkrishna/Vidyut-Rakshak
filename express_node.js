var ab=require("express");
var a=require("fs");
var ch=ab();
ch.use(ab.static("public"));
ch.get('/first',function(req,res){
	res.sendFile(__dirname+"/public/login.html");
})

ch.listen(5000,function(){
	console.log("jhdsvc");
})