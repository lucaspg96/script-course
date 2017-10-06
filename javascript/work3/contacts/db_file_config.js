var fs = require('fs')

function loadData(callback){
	return fs.readFile("data.json",function(err,data){
				callback(err,JSON.parse(data))
			})

}

function saveData(json,callback){
	fs.writeFile("data.json", JSON.stringify(json), 'utf8', callback); 
}

function validadeContact(contact){
	return 	contact.name &&
			contact.address &&
			contact.phone &&
			contact.email
}


function getContact(id,callback){
	loadData(function(err,data){
		if(err){
			callback(err)
		}
		else{
			if(data[id])
				callback(false,data[id])
			else
				callback(false,{})
		}
	})
}

function getContacts(callback){
	loadData(function(err,data){
		if(err){
			callback(err)
		}
		else{
			callback(false,data)
		}
	})
}

function addContact(contact,callback){
	loadData(function(err,data){
		if(err){
			callback(err)
		}
		else{
			if(validadeContact(contact)){
				var id = new Date().getTime()
				data[new Date().getTime()] = {
					"_id":id,
					name: contact.name,
					address: contact.address,
					phone: contact.phone,
					email: contact.email,
					image: "uploads/"+id
				}
				

				saveData(data,function(err){
					if(err){
						callback(err)
					}
					else{
						callback(false,data[id])
					}
				})
			}
			else{
				callback({"err":"Bad formated contact"})
			}
			
		}
	})
}

function updateContact(contact,callback){
	loadData(function(err,data){
		if(err){
			callback(err)
		}
		else{
			old = data[contact["_id"]]

			for(var key in contact){
				if(key!="_id")
					old[key] = contact[key]
			}

			saveData(data,function(err){
				if(err){
					callback(err)
				}
				else{
					callback(false,old)
				}
			})
			
		}
	})
}

function removeContact(id,callback){
	loadData(function(err,data){
		if(err){
			callback(err)
		}
		else{
			var old = data[id]
			delete data[id]

			saveData(data,function(err){
				if(err){
					callback(err)
				}
				else{
					callback(false,old)
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

