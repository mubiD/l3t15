const express = require('express') //Require express.
const mongoose = require('mongoose'); //Require Mongoose
const app = express() //Store Expresses functionality in variable.
const Users = require('../models/modelsUsers.js'); //Require the Schema sent from modelsUsers.js
const Events = require('../models/modelsEvents.js'); //Require the Schema sent from modelsEvents.js
const jwt = require('jsonwebtoken') //Require jwt module.

const bodyParser = require('body-parser'); // Allows us access to the req.body object.
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); //converts everything that is being sent back to react to JSON(It stringifys whatever is being sent eg. res.json({"item": webProjectArr})).

const verify = async (req, res) =>{
    const auth = req.body.jwt; //The token is stored in state and is sent with the init object.
    //const token = auth.split(' ')[1] // This line of code isnt neccessary because the jwt is not in the headers, the jwt is in the body.
    console.log(`auth = ${auth}`); 
    try{
        const decoded = jwt.verify(auth, 'HALO') //The jwt is verified with the secret key(second parameter) | jwt stored in auth
        //console.log(`Decoded ID = ${decoded.id}`) // Logging the ID
        return decoded.id; //returns the user._id
    }catch (err) {
        return false //Return false 
    }
}

exports.findAll = async (req, res) => {
    const ver = await verify(req, res);
    if(ver){ 
        try{
            const events = await Events.find(); //await finding all the documents that exist within the collection/database.
            //console.log(`Events in findAll = ${events}`)
            res.send(events); //Send the relevant information that has been retrieved back to the frontend.
        } catch(error){
            console.log(`Error here 32 ${error}`)
            res.send({ message: `Retrieval failed: ${error}!` }) //Error.  
        }
    }
}

exports.testStatus =  (req, res) => {
    console.log('cool')
    res.status(200);  //Valid request
    res.send('Testing endpoint'); // Need to send somethin back in order for the test to have a status of 200.
}

exports.getUsersGlobal = async (req, res) => {
    const ver = await verify(req, res);
    if(ver){ 
        try{
            const users = await Users.find(); //await finding all the documents that exist within the collection/database.
            console.log(`Users in findAll = ${users}`)
            res.send(users); //Send the relevant information that has been retrieved back to the frontend.
        } catch(error){
            console.log(`Error here 32 ${error}`)
            res.send({ message: `Retrieval failed: ${error}!` }) //Error.  
        }
    }
}

exports.create = async (req, res) => {
    const ver = await verify(req, res);
    // Create and Save a new Event
    // accessing the req.body allows us to utilize values sent from the frontend.
    let newEvent = new Events({
        title: req.body.title,// {title} value which is sent over
        createdBy: req.body.createdBy,// {createdBy} value which is sent over
        description: req.body.description,// {description} value which is sent over
        location: req.body.location, // {location} value which is sent over
        dateOfEvent: req.body.dateOfEvent, // {dateOfEvent} value which is sent over
        timeOfEvent: req.body.timeOfEvent  // {timeOfEvent} value which is sent over
    });
    
    if(ver){
        try {
            await newEvent.save(); //await creating the individual document.
                const events = await Events.find(); //Updating frotends state in order to show the user that the document has been successfully added to the collection.
                res.send(events); //Send the relevant information back to the frontend.
        } catch(error) {
                console.log(error);
                res.send({ message: `Could not create new Car: ${error}!` }); //Error.
        }
    }
};


exports.deleteEvent = async (req, res) => {
    const ver = await verify(req, res);
    //await deleting the chosen document from the collection/database.
    //Use the _id to identify chosen document. 
    // Async - We neeed confoirmation from mongodb that the query has in actual fact been executed correctly, therefore mongodb returns a promise(mongoose.promise = global.promise).
    if(ver){
        await Events.deleteOne({ _id: req.body.id }, async (error) => {
            if (error) {
                res.status(503).send({ message: "something went wrong!" });
            } else {
                console.log("deleted!") 
                const events = await Events.find(); //Updating the frontends state in order to show the user that the document has been successfully added to the collection.
                res.send(events); //Send the relevant information that ha been retrieved back to the frontend.
            }
        });
    }
}


exports.updateEvent = async (req, res) => {
    const ver = await verify(req, res);
    if(ver){
    
        try {
        //Find the Event Object(document) that you're wanting to update inside the collection/database.
        const event = await Events.findById({ _id: req.body.id }); 
        //console.log(`updateEvent before update = ${event}`);
        //Compare req.body's fields with that of the Object found.
        //Create variables to store each field which has changed.
        //if event.make = req.body.titleUpdate or req.body.titleUpdate = null, => then event.title does not need to be updated, else update the value to what the user entered(req.body.titleUpdate)
        const titleNew = (event.title === req.body.titleUpdate || !req.body.titleUpdate) ? event.title: req.body.titleUpdate; 
        const createdByNew = (event.createdBy=== req.body.createdByUpdate || !req.body.createdByUpdate) ? event.createdBy: req.body.createdByUpdate;
        const descriptionNew = (event.description === req.body.descriptionUpdate || !req.body.descriptionUpdate) ? event.description: req.body.descriptionUpdate;
        const locationNew = (event.location === req.body.locationUpdate || !req.body.locationUpdate) ? event.location: req.body.locationUpdate;
        const dateOfEventNew = (event.dateOfEvent === req.body.dateOfEventUpdate || !req.body.dateOfEventUpdate) ? event.dateOfEvent: req.body.dateOfEventUpdate;
        const timeOfEventNew = (event.timeOfEvent === req.body.timeOfEventUpdate || !req.body.timeOfEventUpdate) ? event.timeOfEvent: req.body.timeOfEventUpdate;
 
        await Events.findByIdAndUpdate({ _id: req.body.id },
         {
             //Save the variables based on the comparison above to the database
             title: titleNew,// {title} value which is sent over
             createdBy: createdByNew,// {createdBy} value which is sent over
             description: descriptionNew,// {description} value which is sent over
             location: locationNew, // {location} value which is sent over
             dateOfEvent: dateOfEventNew, // {dateOfEvent} value which is sent over
             timeOfEvent: timeOfEventNew  // {timeOfEvent} value which is sent over 
         });
            const events = await Events.find(); //Store the updated Object within a variable.
            //console.log(`updateEvent after update = ${event}`);
            res.send(events); //Send the relevant information that has been updated back to the frontend.
        } catch(error) {
            res.send({ message: `something went wrong! ${error}` }) //If the [try] fails, the error is absorbed and caught within this [catch] block.
        }
    }
}


exports.updateUsersGlobal = async (req, res) => {
    const ver = await verify(req, res);
    if(ver){
        try {
            // const users = await Users.find();
            
            let users = req.body.users; //Store the array of documents in a variable.
            // Iterate through the items array and update the _ids one at a time.
            users.forEach (async item => {
                await Users.findByIdAndUpdate({ _id: item._id },
                    {$set: {
                        username: item.username, 
                        password: item.password,
                        role: item.role 
                    }});
        });
        // const ownerNew = (car.owner === req.body.ownerGlobal || !req.body.ownerGlobal) ? car.owner: req.body.ownerGlobal; (POSSIBLY NOT NEEDED)
        const usersFull = await Users.find(); //Store the updated Object within a variable.
        console.log(`usersFull = ${usersFull}`);
        res.send(usersFull); //Send the relevant information that has been updated back to the frontend.
        } catch(error) {
            res.send({ message: `something went wrong! ${error}` }) //If the [try] fails, the error is absorbed and caught within this [catch] block.
        }
    }
} 


exports.loginUser = async (req, res) => {
    const username = req.body.username; //Store the username that has been sent from the frontend
    const password = req.body.password; //Store the password that has been sent from the frontend
    const user = await Users.findOne({username: username}); //Find a user within the db that matches the users usename on the frontend.

    //console.log(user);
    if(user !== null && (username === user.username && password === user.password)){ //Checking to see if the users username and password matches the information in the db, if so, run block.
        // The purpose of the null condition is to check if the findOne method actually returned 'something' from the mongoDB db. ***** NB ***** 
        payload = {
            'name' : username, //Username intialized in the frontend.
            'id' : user._id, //Users id from document within the db.
            "role": user.role
        }
        const token = jwt.sign(JSON.stringify(payload), 'HALO', {algorithm: 'HS256'}); //create the JWT.
        //console.log(`In loginUser token = ${token}`);
        res.send({'token': token, 'role': user.role, 'name': username}) // Send the token back to the frontend.
    }else{
        console.log("invalid");
        res.status(403).send({"err" : "Incorrect login!"})
    }
}


exports.createUser = async (req, res) => {
    // Create and Save a new User
    // accessing the req.body allows us to utilize values sent from the frontend.
    let newUser = new Users({
        username: req.body.username,// {username} value which is sent over
        password: req.body.password1,// {password} value which is sent over
    })
    try {
        await newUser.save(); //await creating the individual document.
                const newlyCreatedUser = await Users.find(); //Updating frontends state in order to show the user that the document has been successfully added to the collection.
                //console.log(`Newly created = ${newlyCreatedUser}`)
                res.send(newlyCreatedUser); //Send the relevant information back to the frontend.
    } catch(error) {
                console.log(error);
                res.send({ message: `Could not create new  User: ${error}!` }); //Error.
    }
};

// :)