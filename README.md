# Awesome Movie
A movie review web app built with the MEAN stack - MongoDB, ExpressJS, AngularJS and NodeJS 

## Main technologies
- **Front-end**
  - [AngularJS](https://angularjs.org/)
  - [Bootstrap](http://getbootstrap.com/)
  - [Bower](http://bower.io/)
- **Back-end**
  - [Node.js](https://nodejs.org/en/)
  - [Express](http://expressjs.com/)
  - [MongoDB](https://www.mongodb.org/)
  - [Mongoose](http://mongoosejs.com/)
  - [Passport](http://passportjs.org/)
  
### Build
- clone the repo `git clone https://github.com/lucia1219cs/AwesomeMovie-Web-Application.git`
- `cd AwesomeMovie-AngularJS` 
- install bower dependencies with `bower install`
- run `gulp` in Angular folder, get the whole content of the dist folder and copy it in the public folder of server application (e.g. `AwesomeMovie-NodeJS/public`)
- `cd AwesomeMovie-NodeJS`
- install node dependencies with `npm install`
- make sure MongoDB is up and running
- start Restful API server with `npm start`
- view in browser at `http://localhost:3000`
