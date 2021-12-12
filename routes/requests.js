const express = require('express'); //Require express.
const app = express() //Store Expresses functionality in variable.
const opManipulation = require('../controllers/controllers.js'); //Require the functionality within controllers.js.

app.post("/getEvents", opManipulation.findAll); //Read documents from MainAdmin.js.

app.post("/getUsersGlobal", opManipulation.getUsersGlobal); //Get users.

app.post('/Signin', opManipulation.loginUser); //Login user to application.

app.post('/Signup', opManipulation.createUser); //Create user.

app.post("/addEvent", opManipulation.create); //Create documents.

app.delete("/deleteEvent", opManipulation.deleteEvent); //Delete documents with deleteEvent.

app.put("/updateEvent", opManipulation.updateEvent); //Update individual documents.

app.put("/updateUsersGlobal", opManipulation.updateUsersGlobal); //Update all documents.

app.get("/test", opManipulation.testStatus); //Update all documents.

module.exports = app; //Exporting app an its methods ie post, put, get and delete.