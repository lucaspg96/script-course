var app = require('./app_config.js');
var url = require('url')
var controller = require('./controller.js');

function getJSONData(req,res,callback){
	var info = ""
	req.on('data', function (data) {
            info += data;
    });
    
    req.on('end', function () {
    	try{
	    	var data = JSON.parse(info)
	        callback(JSON.parse(info))
	    }
	    catch(err){
	    	res.end({"err":err.toString()});
	    }
    });
}

app.get('/', function(req, res){
	res.end('Servidor On!');
});

//---------------------------------------------------

app.get('/contact', function(req, res){
	var q = url.parse(req.url, true).query;
	
	if(q["id"]){
		var id = q["id"];

		controller.get(id, function(resp){
			res.end(JSON.stringify(resp));
		});
	}

	else{
		controller.list(function(resp){
			res.end(JSON.stringify(resp));
		});
	}

});

//---------------------------------------------------

app.post('/contact', function(req, res){

	getJSONData(req,res,function(data){
		controller.save(data,function(resp){
			res.end(JSON.stringify(resp));
		});
	})	
	
});

//---------------------------------------------------

app.put('/contact', function(req, res){

	getJSONData(req,res,function(data){
		var contact = {"id":data["id"]}
		
		if(data.name)
			contact.name = data.name
		if(data.address)
			contact.address = data.address
		if(data.phone)
			contact.phone = data.phone
		if(data.email)
			contact.email = data.email

		controller.update(contact, function(resp){
			res.end(JSON.stringify(resp));
		});
	})
});

//---------------------------------------------------

app.delete('/contact', function(req, res){
		
	getJSONData(req,res,function(data){

		controller.delete(data["id"],function(resp){
			res.end(JSON.stringify(resp));
		});
	})
});