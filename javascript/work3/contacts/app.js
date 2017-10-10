//pure http server
//var app = require('./app_http_config.js');
//express server (without body-parser)
var app = require('./app_express_config.js');

var url = require('url');
var fs = require('fs');
var formidable = require("formidable");

//application controller
var controller = require('./controller.js');

//this function receive the data from a pure JSON request
// function getJSONData(req,res,callback){
// 	var info = ""
// 	req.on('data', function (data) {
//             info += data;
//     });
    
//     req.on('end', function () {
//     	try{
// 	    	var data = JSON.parse(info)
// 	        callback(JSON.parse(info))
// 	    }
// 	    catch(err){
// 	    	res.end(err.toString());
// 	    }
//     });
// }

//this function receives data from a form-data/multipart request
function getJSONData(req, res,callback) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
    var data = {};
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('field', function (field, value) {
        // console.log("field: "+field);
        // console.log("value: "+value);
        data[field] = value;
    });
    
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        // console.log('Arquivo Carregado: ' + file.name);
    	data.file = file
    });

    form.on('end', function () {
        callback(data)
    });
}

//test route
app.get('/', function(req, res){
	res.end('Servidor On!');
});

//---------------------------------------------------
//get (a) contact
app.get('/contact', function(req, res){
	var q = url.parse(req.url, true).query;
	
	//if an id is sent, get one contact
	if(q["id"]){
		var id = q["id"];

		controller.get(id, function(resp){
			res.end(JSON.stringify(resp));
		});
	}
	//else, get all contacts
	else{
		controller.list(function(resp){
			res.end(JSON.stringify(resp));
		});
	}

});

//---------------------------------------------------
//add a new contact
app.post('/contact', function(req, res){

	getJSONData(req,res,function(data){
		//get the file original name
		data.file = "uploads/"+data.file.path.split('/').pop()
		controller.save(data,function(resp){
			//take the contact's id and rename the file
			fs.rename(data.file, resp.image, function(err) {
			    if(err){}
			    else{
			    	res.end(JSON.stringify(resp));
			    }
			});
			
		});
	})	
	
});

//---------------------------------------------------
//update the name/address/phone/email of an contact
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
//remove a contact by it's id
app.delete('/contact', function(req, res){
		
	getJSONData(req,res,function(data){

		controller.delete(data["id"],function(resp){
			res.end(JSON.stringify(resp));
		});
	})
});