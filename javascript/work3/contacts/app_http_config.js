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

server.get = function(route,callback){
	getHandlers[route] = callback;
}

server.post = function(route,callback){
	postHandlers[route] = callback;
}

server.put = function(route,callback){
	putHandlers[route] = callback;
}

server.delete = function(route,callback){
	deleteHandlers[route] = callback;
}

server.on('request',function(req,res){
	var path = url.parse(req.url).pathname;
	var method = req.method.toLowerCase()

	if(handlers[method] && handlers[method][path]){
		handlers[method][path](req,res)
	}
	else{
		res.writeHead(404, {});
	}
})

server.listen(3000)