# seraphinianus
A Node.js RESTful Web Services Example

This is far from a complete example or template, but it demonstrates a basic RESTful
service implemented with Node.js and Connect/Express.

## Some Notes About The Project
The project skeleton was created using `express-generator` and the minimum set of modifications
have been made to support the sample REST calls below.  In the interest of focusing on the
core concerns, this project *doesn't* demonstrate best coding practices, module documentation,
comprehensive error handling, unit testing, and so on.  For the sake of simplicity, the REST
endpoints that use the request body are looking for key value pairs (rather than JSON), but it
should be noted that Express is pretty flexible and their are a variety of npm packages that
are helpful in processing requests and responses pretty much any way you'd like.

## Starting the Server
This document assumes you have [Node](https://nodejs.org/en/) installed.  If not, you can find lots
of instruction online for installing Node on [Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows),
[Linux](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04), or
[OSX](http://blog.teamtreehouse.com/install-node-js-npm-mac).

Once Node is installed, install the modules specified in the project's [package.json](package.json) file by moving into
the project's root directory and running ``npm install``.

```
npm install
```

You can then run the server by calling the startup script from the project's root directory.

```sh
node bin/www
```

## Calling the Service

The examples below demonstrate querying the endpoints and show sample responses.

You can query the service using your favorite tool.  The examples below use 
[curl](https://www.tutorialspoint.com/unix_commands/curl.htm) for the purpose of keeping this
README simple.

### Get all the users.
```sh
curl localhost:3000/users
```
```json
[{
    "id": "1",
    "firstName": "Pat",
    "lastName": "Blair",
    "email": "pat@daburu.net"
}, {
    "id": "2",
    "firstName": "Conan",
    "lastName": "Blair",
    "email": "captain.conan@gmail.com"
}]
```


### Get a specific user.
```sh
curl localhost:3000/users/1
```
```json
{
    "id": "1",
    "firstName": "Pat",
    "lastName": "Blair",
    "email": "pat@daburu.net"
}
```


### Update a specific user.
```sh
curl -X PUT -d firstName=Danny -d lastName=Deckchair -d email=danny@daburu.net localhost:3000/users/1
```
```json
{
    "id": "1",
    "firstName": "Danny",
    "lastName": "Deckchair",
    "email": "danny@daburu.net"
}
```

### Add a new user.
*Note that the seed users were given simple integer IDs to make the demonstration a little smoother.
New users will have dynamically-generated UUID values for their IDs.*
```sh
curl -X POST -d firstName=Sandy -d lastName=Blair -d email=sblair9345@aol.com localhost:3000/users
```
```json
{
    "id": "b632cb3d-abe6-4d20-844e-8016b4bdfb5c",
    "firstName": "Sandy",
    "lastName": "Blair",
    "email": "sblair9345@aol.com"
}
```


### Delete an existing user.
```sh
curl -X DELETE localhost:3000/users/2
```
Again, to keep it simple, this handler is set up to return the deleted user to the caller, though 
there are other ways to acknowledge deletions.
```json
{
    "id": "2",
    "firstName": "Conan",
    "lastName": "Blair",
    "email": "captain.conan@gmail.com"
}
```

## Looking at the Code

If you want to take a look at how the requests are handled, there are just a couple of files that
have been modified from the generated project skeleton:  The middleware that establishes the 
modified routes is registered in [app.js](app.js), and the route handlers can be found in
[routes/users.js](routes/users.js).

