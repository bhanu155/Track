var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var methodOverride=require("method-override");
var passport=require("passport");
var	localStrategy=require("passport-local");
var User=require('./models/user'); // user schema
var Data=require('./models/data'); // Data Schema
var middleware=require("./middleware"); // Middleware functions

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// Connect to database
mongoose.connect("mongodb://localhost:27017/tracker", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


app.use(express.static(__dirname + "/public")); //linking css/scripts
app.use(methodOverride('_method'));

//	PASSPORT CONFIG.
app.use(require("express-session")({
	secret: "tpm",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	next();
});

// Data.create({
// 	numberOfNewUsers : [500, 600, 700, 200, 150, 600, 1000, 300, 450, 600, 350, 270],
// 	numberOfUniqueUsers : [700, 200, 970, 400, 50, 2000, 1200, 100, 40, 300, 250, 720],
// 	domUsers : 1230,
// 	intUsers : 580,
// 	browsersData : [	
// 					{brw:'iPhone 7',sessions:1088, bounceRate:52.80},
// 					{brw:'iPhone X',sessions:200, bounceRate:47.54}, 
// 					{brw:'Pixel 3',sessions:2500, bounceRate:47.54},
// 					{brw:'Chrome',sessions:2005, bounceRate:47.54},
// 					{brw:'Safari',sessions:1555, bounceRate:47.54},
// 					{brw:'Firefox',sessions:1600, bounceRate:47.54},
// 					{brw:'Opera',sessions:1800, bounceRate:47.54}

// 				],
// 	author:{
// 			id: "5d77d47dd3737e0ad7c8e079",
// 			username:"bhanu"
// 		}
	
// 	}, (err, data)=>{
// 		if(err)
// 			{
// 				console.log(err);
// 			}
// 		else
// 			{
// 				console.log("created new dataset !");
// 				console.log(data);
// 			}
// 	});

app.get("/",(req, res)=>{
	res.render("landing");
});

app.get("/dashboard", middleware.isLoggedIn, (req, res)=>{
	Data.find({}, (err, allData)=>{
		if(err)
			{
				console.log(err);
				res.redirect('/');
			}
		else
			{	
				res.render("interface/dashboard", {allData});
			}
	});
});
app.get("/heatmap",(req, res)=>{
	res.render("interface/heatMap.ejs");
});
app.get("/sess_rec",(req, res)=>{
	res.render("interface/sess_rec.ejs");
});


//Auth routes
//------------------------------------------------------------------
//	REGISTER
app.get('/register', (req, res)=>{
	res.render("register");
});
app.post('/register', (req, res)=>{
	var newUser= new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user)=>{
		if(err)
			{
				console.log(error);
				return res.render('/register');
			}
		passport.authenticate("local")(req, res, ()=>{
			res.redirect('/dashboard');
		});
	});
});

//	LOGIN
app.get('/login', (req, res)=>{
	res.render("login");
});
app.post('/login', passport.authenticate("local", {
	successRedirect:"/dashboard",
	failureRedirect:"/login"
}), (req, res)=>{
});

//	LOGOUT
app.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/');
});

//------------------------------------------------------------------


//=====================REST API for data============================

//INDEX ROUTE ('/data')
app.get('/data', middleware.isLoggedIn,  (req, res)=>{
	Data.find({}, (err, allData)=>{
		if(err)
			{
				console.log(err);
				res.redirect('/login');
			}
		else
			{
				res.render("/dashboard", {data: allData});
			}
	});
});


//CREATE route
app.post('/data', middleware.isLoggedIn, (req, res)=>{
	var data=req.body.data;
	Data.create(data, (err, createdData)=>{
		if(err)
			{
				console.log(err);
			}
		else
			{
				res.redirect('/dashboard');
			}
	});
});

//SHOW route - particular session info
app.get('/data/:id', middleware.isLoggedIn, (req, res)=>{
	Data.findById(req.params.id, (err, foundData)=>{
		if(err)
			{
				console.log(err);
			}
		else
			{
				res.render("/dashboard", {data: foundData});
			}
	});
});

//UPDATE route
app.put('/data/:id',	middleware.checkDataOwnership, (req, res)=>{

	Data.findById(req.params.id, (err, updatedData)=>{
		
		//update the data here
		
		res.redirect('/dashboard/' + updatedData._id);	
	
	});
});
	


//DESTROY route
app.delete('/data/:id', middleware.checkDataOwnership, (req, res)=>{
	Data.findByIdAndRemove(req.params.id, (err)=>{
		res.redirect('/dashboard');
	});
});



//==================================================================

app.listen(9000,(req, res)=>{
	console.log("server active on port 9000");
});