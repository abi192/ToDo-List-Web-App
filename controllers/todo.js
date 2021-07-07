//Controls CRUD operations

const mongoose = require('mongoose');
const TodoModel = require('../models/todo');
const Todo = mongoose.model(TodoModel.name);   // It is the object following TodoSchema

function add(title){
    const newTodo = new Todo({title:title});
    return newTodo.save();                        //return promise
}

function getById(id){
    return Todo.findById(id).exec();                 // mongoDB has _id as its attribute
}

function getAll(){
    return Todo.find({}).exec();              //model.find return a Query .exec() return promise
}

function remove(id){
    return Todo.findByIdAndDelete(id).exec();
}

function update(id,obj){
    // new:true returns updated obj otherwise by default the data before update
    return Todo.findByIdAndUpdate(id,obj,{new: true}).exec();   
}

module.exports = {add, getById, getAll, update, remove};
