const mongoose = require('mongoose');
const express = require('express');
 const config = require('./config');
 const app = express();
const TodoRoute = require('./routes/todo'); 

app.use(express.json());
app.use(express.urlencoded( {extended:true} ));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
});

app.use('/todos', TodoRoute.route);
app.set('view engine','ejs');

//  view is same directory is set default and autimmatically get accessed
app.get('/',(req,res)=>{       
    res.render(__dirname+"/views");
});

app.use(express.static(__dirname+"/public"));

//first connect with database using URL, then to Server with given port(Uses promises)
connectDB(config.db_url).then(() => {
    listen(config.PORT);
});

function listen(PORT){
    app.listen(PORT, (err) => {
        if(err){
            console.error('An error occurred while connecting to server');
            console.error(err);
            return;
        }
        console.info('Server successfully connected');

    });
}

function connectDB(URL){
    mongoose.connection.on('error', (err) => {
        console.error('An error occurred during database connection');
        console.error(err);
    });

    mongoose.connection.once('open', () => {
        console.info('Database successfully connected');
    });

    return mongoose.connect(URL,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false}); //return promises
}