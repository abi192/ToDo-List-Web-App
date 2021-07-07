//Struture of the object class 'Todo'

const mongoose = require('mongoose');           //fetchig mongoose
const name = 'Todo';

const TodoSchema = new mongoose.Schema({       //declaring TodoSchema
    title:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        required:true,
        default:false
    }
});

mongoose.model(name, TodoSchema);           //Todo Model is made accessed by 'name'
module.exports = {name};                    //'name' is exported to fetch the model