var express = require('express');

var app = module.exports =  express();

var allowCors = function(req,res,next){

	res.header('Access-Control-Allow-Origin', 'localhost:'+3000);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');

	next();
}

app.use(allowCors);

app.listen(3000)