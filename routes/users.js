var express = require('express');
var router = express.Router();
// We're going to want to generate some UUIDs, so...
const uuidv4 = require('uuid/v4');

// For this simple example, let's just keep our data in memory.
var usersDbMock = {};

// Create a seed user and add 'em to the "db".
var user1 = {
    id: "1", // For easier demonstration, we'll give the seed users very simple IDs.
    firstName: 'Pat',
    lastName: 'Blair',
    email: 'pat@somewhere.com'
};
usersDbMock[user1.id] = user1;
// Create another seed user.
var user2 = {
    id: "2",
    firstName: 'Conan',
    lastName: 'Blair',
    email: 'conan@freemail.com'
};
usersDbMock[user2.id] = user2;

/**
 * The GET handler that returns all the users.
 * @param {IncomingMessage} req - The request object.
 * @param {ServerResponse} res - The response object.
 * @param {function} next - The next handler function in the pipeline.
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
 * The GET handler that returns a specific user by ID.
 * @param {IncomingMessage} req - The request object.
 * @param {ServerResponse} res - The response object.
 * @param {function} next - The next handler function in the pipeline.
 */
router.get('/:id', function(req, res, next){
    // Sanity check (if we didn't get an ID)...
    if(!req.params.id){
        res.status(400).send('Bad request (missing id).');
        return; // Bail out now.
    }
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
 * The POST handler that lets the caller create a new user.
 * @param {IncomingMessage} req - The request object.
 * @param {ServerResponse} res - The response object.
 * @param {function} next - The next handler function in the pipeline.
 */
router.post("/", function(req, res) {
    // If we don't have everything we need...
    if(!req.body.firstName || !req.body.lastName || !req.body.email) {
        // ...let the caller know the deal.
        res.status(400).send('Bad request (missing parameter).');
    } else {
        // We have all the facts, so create a new user.
        var newUser = {
            id: uuidv4(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        // Add the user to our "database".
        usersDbMock[newUser.id] = newUser;
        // Let the caller see what she just created.
        res.json(newUser);
    }
});

/**
 * The PUT handler that lets the caller update an existing user.
 * @param {IncomingMessage} req - The request object.
 * @param {ServerResponse} res - The response object.
 * @param {function} next - The next handler function in the pipeline.
 */
router.put("/:id", function(req, res) {
    // Sanity check (if we don't see an ID)...
    if(!req.params.id){
        res.status(400).send('Bad request (missing id).');
        return; // Bail out now.
    }
    // If we don't have everything we need...
    if(!req.body.firstName || !req.body.lastName || !req.body.email) {
        // ...let the caller know the deal.
        res.status(400).send('Bad request (missing parameter).')
    } else {
        // Otherwise, let's create a new record to replace the old one.
        var updatedUser = {
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        // Update the "database".
        usersDbMock[req.params.id] = updatedUser;
        // Return the updated details to the caller.
        res.json(updatedUser);
    }
});

/**
 * The DELETE handler that lets the caller delete an existing user.
 * @param {IncomingMessage} req - The request object.
 * @param {ServerResponse} res - The response object.
 * @param {function} next - The next handler function in the pipeline.
 */
router.delete("/:id", function(req, res) {
    // Sanity check (if we didn't get an ID)...
    if(!req.params.id){
        res.status(400).send('Bad request (missing id).');
        return; // Bail out now.
    }
    // Get the user the caller wants to delete.
    var deletedUser = usersDbMock[req.params.id];
    // If we found it...
    if(deletedUser){
        // ...it's gone!
        delete usersDbMock[deletedUser.id];
        // Let the caller know what they just deleted.
        res.json(deletedUser);
    }
    else
    {
        // We didn't find anything.
        res.status(404).send("Not found.")
    }
});

module.exports = router;
