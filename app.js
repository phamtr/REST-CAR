const express =require('express');
const logger =require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/databse');

const app =express();
const users = require('./routes/users');
// database
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) =>{
    if(err){
        console.log('Could Not connect to database', err);
    }else{
        //console.log(config.secret);
        console.log('Connected to database: ' + config.db);
    }
});

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
//

//Routes
app.use('/users', users);

// catch 404 Errors
app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler Function
app.use((err, req, res, next) =>{
    const error =app.get('env') === 'development'? err: {};
    const status = err.status || 500;

    //respond client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // Respond to ourselve
    console.error(err);
});

// Start the server
const port =app.get('port') || 3000;
app.listen(port, ()=> console.log(`Server is listening on port ${port}`));
