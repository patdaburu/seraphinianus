var express = require('express');
var router = express.Router();
// We're going to want to generate some UUIDs, so...
const uuidv4 = require('uuid/v4');


// For this simple example, let's just keep our data in memory.
var usersDbMock = {}

// Create a seed user and add 'em to the "db".
var user1 = {
    id: "1", // For easier demonstration, we'll give the seed users very simple IDs.
    firstName: 'Pat',
    lastName: 'Blair',
    email: 'pat@daburu.net'
};
usersDbMock[user1.id] = user1;
// Create another seed user.
var user2 = {
    id: "2",
    firstName: 'Conan',
    lastName: 'Blair',
    email: 'captain.conan@gmail.com'
};
usersDbMock[user2.id] = user2;

/**
 * Get all the users.
 */
router.get('/', function(req, res, next) {
    // Get the values (the users) from the array.
    var users = Object.keys(usersDbMock).map(function(key){
        return usersDbMock[key];
    });
    // Return 'em.
    res.json(users);
});

/**
 * Get a user by id.
 */
router.get('/:id', function(req, res, next){
    // Let's try to get the user for the ID the caller supplied.
    var user =  usersDbMock[req.params.id];
    // If we found the user...
    if(user) {
        // ...great! Return it to the caller.
        res.json(user);
    } else {
        // Otherwise, this is a miss.
        res.status(404).send('Not found.');
    }
});

/**
 * Add a new user.
 */
router.post("/", function(req, res) {
    if(!req.body.firstName || !req.body.lastName || !req.body.email) {
        return res.send({"status": "error", "message": "missing a parameter"});
    } else {
        var newUser = {
            id: uuidv4(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        usersDbMock[newUser.id] = newUser;
        return res.json(newUser);
    }
});

/**
 * Update an existing user.
 */
router.put("/:id", function(req, res) {
    if(!req.params.id){
        return res.send({"status": "error", "message": "missing the id parameter"});
    }
    if(!req.body.firstName || !req.body.lastName || !req.body.email) {
        return res.send({"status": "error", "message": "missing a parameter"});
    } else {
        var updatedUser = {
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        usersDbMock[req.params.id] = updatedUser;
        return res.json(updatedUser);
    }
});

/**
 * Delete a user.
 */
router.delete("/:id", function(req, res) {
    if(!req.params.id){
        return res.send({"status": "error", "message": "missing the id parameter"});
    }
    var deletedUser = usersDbMock[req.params.id];
    if(deletedUser){
        delete usersDbMock[deletedUser.id];
        res.json(deletedUser);
    }
    else
    {
        res.status(404).send("Not found.")
    }
});




module.exports = router;
