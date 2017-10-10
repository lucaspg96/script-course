var http = require('http');
var url = require('url');

var server = module.exports =  http.createServer();

var getHandlers = {};
var postHandlers = {};
var putHandlers = {};
var deleteHandlers = {};

var handlers = {
	"get": getHandlers,
	"post": postHandlers,
	"put": putHandlers,
	"delete": deleteHandlers
}

//receives and store the get handler for a route
server.get = function(route,callback){
	getHandlers[route] = callback;
}

//receives and store the post handler for a route
server.post = function(route,callback){
	postHandlers[route] = callback;
}

//receives and store the put handler for a route
server.put = function(route,callback){
	putHandlers[route] = callback;
}

//receives and store the delete handler for a route
server.delete = function(route,callback){
	deleteHandlers[route] = callback;
}

//receives the request
server.on('request',function(req,res){
	//get the route
	var path = url.parse(req.url).pathname;
	//get the verb
	var method = req.method.toLowerCase()

	//check if exists a handler
	if(handlers[method] && handlers[method][path]){
		//execute the handler
		handlers[method][path](req,res)
	}
	else{
		//handler not found
		res.writeHead(404, {});
		res.end();
	}
})

server.listen(3000)