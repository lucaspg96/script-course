
var db_string = 'mongodb://localhost/contacts_db';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar'));

db.once('open',function(){
	var contactSchema = mongoose.Schema({
		name:String,
		email:String,
		address:String,
		phone:String,
		image:String
	});

	var model = mongoose.model('contacts', contactSchema);

	function validadeContact(contact){
		return 	contact.name &&
				contact.address &&
				contact.phone &&
				contact.email
	}


	function getContact(id,callback){
		model.findById(id, function(err, data){
			if(err){
				callback(err)
			}
			else{
				callback(false,data)
			}
		})
	}

	function getContacts(callback){
		model.find({}, function(err, data){
			if(err){
				callback(err)
			}
			else{
				callback(false,data)
			}
		})
	}

	function addContact(contact,callback){
		if(validadeContact(contact)){
			model({
				name: contact.name,
				address: contact.address,
				phone: contact.phone,
				email: contact.email
			}).save(function(err,contact){
				if(err){
					callback(err)
				}
				else{
					callback(false,contact)
				}
			})
		}
		else{
			callback({"err":"Bad formated contact"})
		}
	}

	function updateContact(data,callback){
		model.findById(data["id"],function(err,contact){
			if(err){
				callback(err)
			}
			else{

				for(var key in data){
					if(key!="_id")
						contact[key] = data[key]
				}

				contact.save(data,function(err,contact){
					if(err){
						callback(err)
					}
					else{
						callback(false,contact)
					}
				})
				
			}
		})
	}

	function removeContact(id,callback){
		model.findById(id,function(err,contact){
			if(err){
				callback(err)
			}
			else{
				contact.remove(function(err){
					if(err){
						callback(err)
					}
					else{
						callback(false,contact)
					}
				})
				
			}
		})
	}

	exports.getContact = getContact
	exports.getContacts = getContacts
	exports.addContact = addContact
	exports.updateContact = updateContact
	exports.removeContact = removeContact
});

