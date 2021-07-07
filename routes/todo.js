const express = require('express');
const route = express.Router();
const TodoController = require('../controllers/todo');

//All functions can give error on wrong inputs,
// so we have to handle them using error and catch

//getAll
route.get('/', (req,res) =>{                   
    TodoController.getAll().then((data)=> 
    res.json(data)                            // sends json data
    ).catch((err)=>{
        console.error('Error in fetching Todo Table');
        console.error(err);
        res.json({'error':'Error in fetching Todo Table'});
    });                            
});

//add
route.post('/',(req,res) =>{                                                                                
    TodoController.add(req.body.title).then((data) =>{
    res.redirect('/todos/' + data._id);     
    });
});

//getById
route.get('/:id', (req,res) =>{
    TodoController.getById(req.params.id).then((data) =>
     res.json(data)
     ).catch((err)=>{
        console.error('Error in fetching the id:',req.params.id);
        console.error(err);
        res.json({'error':`Could not fetch data for id ${req.params.id}`});
    });
});

//removeByID
route.delete('/:id', (req,res) =>{
    TodoController.remove(req.params.id).then((data)=>
     res.json(data) 
     ).catch((err) =>{
         console.error('Invalid id',req.params.id);
         console.error(err);
         res.json({'error':`Invalid id ${req.params.id}`});
     });
});

//update
route.put('/:id', (req,res) =>{
    let obj ={};
    if(req.body.title !== undefined)
        obj.title = req.body.title;
    if(req.body.done !== undefined)
        obj.done = req.body.done;
    TodoController.update(req.params.id,obj).then((data) =>
     res.json(data) 
     ).catch((err) =>{
        console.error('Invalid id',req.params.id);
        console.error(err);
        res.json({'error':`Invalid id ${req.params.id}`});
    });
});

module.exports = {route};
