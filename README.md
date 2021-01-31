# Simple API with JWT

This is a simple practical exercise of a API with JWT, using nodeJS, express, JWT, mongoDB and the latest ECMAScript features, transpiling code with babel and babel node.

## Considerations
* You must have NodeJS, npm and mongoDB installed in your computer.
* This project is only a practical exercise and should not be used in production.

## Installation

Clone the repository in your computer.
```git
git clone https://github.com/jvid18/simple-jwt.git
``` 
Move into the folder folder and install all the dependencies`.
```bash
cd simple-jwt
npm install
```
Create environment variables, you need 3 variables
```bash
PORT # To start the server
DB_URL # To connect to mongoDB database
SECRET_KEY # To encrypt the token
```

You can create the variables from your terminal or create an ``` .env ``` file and put them like this:

```bash
PORT=3000
DB_URL=mongodb://localhost/simplejwt
SECRET_KEY=secret123
```
Start the mongoDB server (in debian distributions).

```bash
sudo systemctl start mongod
```

You can see how to start the mongoDB service in your OS in the [documentation](https://docs.mongodb.com/manual/administration/install-community/).

#
Finally, start the server with the command ``` npm start ```.

## Usage
The project has 3 URL ``` /me ```, ``` /signin ``` and ``` /signup ```. For example:

``` bash
http://localhost:3000/signin # Method POST
# To get the token, send an email and password

http://localhost:3000/me # Method GET
# To get the user data, send header "x-access-token" with the token returned in the sing in.

http://localhost:3000/singup # Method POST
# Register user, send the data: username, email and password
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
