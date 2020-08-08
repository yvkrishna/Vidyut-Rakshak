var mongojs = require("mongojs");
var express=require("express");
var bodyParser=require('body-parser');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');
var passport = require('passport');
var MongoDBStore = require('connect-mongodb-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var flash=require("connect-flash");
const db = mongojs("mongodb://igkishore:igkigk1234@igk-shard-00-02.l0g6f.mongodb.net:27017s/vidyutRakshak?ssl=true&replicaSet=igk-shard-0&authSource=admin",["members","errorLocation"]);

var store = new MongoDBStore({
  uri: 'mongodb://igkishore:igkigk1234@igk-shard-00-02.l0g6f.mongodb.net:27017s/vidyutRakshak?ssl=true&replicaSet=igk-shard-0&authSource=admin',
  collection: 'sessions'
});

app.use(express.static("templates"));
app.set('view engine','ejs');
app.set('views', __dirname + '/templates');
app.set('views',__dirname);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'SmritiMakesMeBetter',
  saveUninitialized: true,
  resave: false,
  store: store
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

var logindata=null;
passport.use(new LocalStrategy({
    passReqToCallback: true
  },
  function(req,username, password, done) {
  	var mongojs = require("mongojs");
	const db = mongojs("mongodb://igkishore:igkigk1234@igk-shard-00-02.l0g6f.mongodb.net:27017s/vidyutRakshak?ssl=true&replicaSet=igk-shard-0&authSource=admin",["members"]);

	var object={
		id:username,
	}
	db.members.find(object,function(err,data){
		if(err)
		{
			console.log(err);
		}
		else
		{
			if(data.length>0)
			{ 	
				logindata=data;
				const hash=data[0].password.toString();
				bcrypt.compare(password, hash, function(err, res) {
				    if(res === true){
				    	return done(null,logindata[0]);
				    }
				    else{
				    	return done(null, false,req.flash('error','Invalid Username Or Password'));
				    }
				});
			}
			else{
				return done(null, false,req.flash('error','Invalid Username Or Password'));
			}
		}
	});
  }
));

app.get('/account',function(req,res){
	if(req.isAuthenticated()){
		db.members.find({email:req.user.email},function(err,userdata){
			res.render('profile',{data:[{userdata}]});
		})
	}else{
		res.redirect('/');
	}
});

app.post("/save-basic-profile",function(req,res){
	if(req.isAuthenticated()){
			var obj={
					name:req.body.fname,
					email:req.body.username,
					mobile:req.body.mobile
				}
			db.members.update({email:req.user.email,id:req.user.id},{$set:{name:obj.name,email:req.body.username,mobile:req.body.mobile}},function(err,data){
					req.user["email"] = req.body.username;
					req.user["name"] = req.body.fname;
					req.user["mobile"] = req.body.mobile
					res.redirect("/account");
			})
		}else{
			res.redirect('/login');
		}
	});

app.get("/login",function(req,res){
	if(req.isAuthenticated()){
		res.redirect('/');
	}else{
		var errors = req.flash().error
		error = JSON.stringify(errors)
		res.render("login",{data:error});
	}
});

app.get('/navigator.svg',function(req,res){
	if(req.isAuthenticated()){
		res.sendFile(__dirname+"/navigator.svg")
	}else{
		res.redirect('/login');
	}
})

app.get('/blub.jpg',function(req,res){
	if(req.isAuthenticated()){
		res.sendFile(__dirname+"/blub.jpg");
	}else{
		res.redirect('/login');
	}
})

app.get("/checkAnomly/:voltVal/:currentVal",function(req,res){
	const MODEL_URL = '/model.json';
    const model = await tf.loadLayersModel(MODEL_URL);
    //console.log(model.summary());
    const input = tf.tensor2d([10.0], [1,1]);
    var result = model.predict(input);
    if(result>0.5){
		// anomly detected
		// result = 1;
		// user should then send the location to route '/sendLoc'
		res.send("anomly detected");
	}else{
		// casual thing ( not an anomly )
		// result = 0;
		res.send("no anomly detected");
	}
})

app.get('/sendLoc/:lat/:lng/:errName/:errDisc',function(req,res){
	var error = {
		latitude:req.params.lat,
		longitude:req.params.lng,
		errName:req.params.errName,
		errDisc:req.params.errDisc
	}
	db.errorLocation.insert(error,function(err,data){
		if(err) throw err
		res.send("Thank you. Your Location has been recorded")
	})
})

app.get('/profile.svg',function(req,res){
	if(req.isAuthenticated()){
		res.sendFile(__dirname+"/profile.svg")
	}else{
		res.redirect('/login');
	}
})

app.get("/register",function(req,res){	
  if(req.isAuthenticated()){
		res.redirect('/');
	}else{
		res.sendFile(__dirname+"/register.html");
	}
});

app.get("/",function(req,res){
	if(req.isAuthenticated()){

  //  get data from database
    db.errorLocation.find({},function(err,errorData){
      res.render('index',{data:[
        {errors:errorData},
        {user_details:req.user}
      ]})
    })
  }
  else{
      res.redirect('/login');
  }
});

app.get('/signout',function(req,res){
	req.logout()
	req.session.destroy();
	res.redirect('/login');
})

app.post('/login-done',passport.authenticate('local',{
	successRedirect : '/',
	failureRedirect : '/login',
	failureFlash: true
}));

var registerationdata=null;
app.post("/register-done",function(req,res){

	if(req.query.password_1==req.query.password_2)
	{		
		bcrypt.genSalt(10, function(err, salt){
   			bcrypt.hash(req.body.password_1, salt, function(err, hash) {
					var obj={
						name:req.body.fullname,
						email:req.body.username,
						password:hash,
						id:req.body.id,
            			mobile:req.body.mobile
					}
					var checkobj={
						id:req.body.id,
						name:req.body.fullname,
						mobile:req.body.mobile
					}
					console.log(checkobj);
					db.members.findOne(checkobj,function(err,data){
						console.log(data);
						if(err)
						{
							console.log("err with members");
						}
						else
						{
							if(data != null)
							{ 
								db.members.update(data,{$set:{password:hash,email:req.body.username}},function(err,data){
									if(err) throw err
									res.redirect("/");
								})
							}
							else
							{
								res.send("Sorry You are not an employee of the Electrical Department");
							}

						 }
							})
						});
					})
	}
	else
	{
		res.send("passwords do not match");
	}
});



// db.sessions.remove({},function(err,data){
// 	console.log("successfully removed all sessions");	
// })

passport.serializeUser(function(id, done) {
  done(null,id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});


function authenticationMiddleware() {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
} 

app.set('port',process.env.PORT||8000)

var server = app.listen(app.get('port'),function(){
console.log("server started at port "+app.get('port').toString())
})
