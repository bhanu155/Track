var middlewareObj={};
var Data=require("../models/data");

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated())
		{
			return next();
		}
	res.redirect('/login');
};

middlewareObj.checkDataOwnership = function(req, res, next){
	//is user logged in ?
	if(req.isAuthenticated()){
		Data.findById(req.params.id, (err, foundData)=>{
		if(err)
			{
				res.redirect("back");
			}
		else
			{
				// Is the data is owned by the logged in user ?
				if(foundData.author.id.equals(req.user._id))
					{
						next();
					}	
				else
					{
						res.send("back");
					}
			}
		});
	}	
	else
	{
		res.redirect("back");
	}
};

module.exports= middlewareObj;