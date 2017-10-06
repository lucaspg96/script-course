//var db = require('./db_file_config.js');
var db = require('./db_mongo_config.js');

exports.list = function(callback){

	db.getContacts(function(err,data){
		if(err){
			callback(err)
		}
		else{
			callback(data)
		}
	})

};

exports.get = function(id, callback){
	db.getContact(id,function(err,data){
		if(err){
			callback(err)
		}
		else{
			callback(data)
		}
	})
};

exports.save = function(contact,callback){
	db.addContact(contact,function(err,data){
		if(err){
			callback(err)
		}
		else{
			callback(data)
		}
	})
};

exports.update = function(data, callback){
	db.updateContact(data,function(err,data){
		if(err){
			callback(err)
		}
		else{
			callback(data)
		}
	})
};

exports.delete = function(id, callback){
	db.removeContact(id,function(err,data){
		if(err){
			callback(err)
		}
		else{
			callback(data)
		}
	})
};