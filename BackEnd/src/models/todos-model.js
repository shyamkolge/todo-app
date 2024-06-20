const {Schema , model} = require('mongoose');


const todoSchema = new Schema(
{
     title : {
        type : String , 
        require : true,
     },

     body : {
        type : String , 
        require : true,
     },

     isChecked : {
        type : String,
        default : false
     }
     

})

const todoModel = model("todoModel" , todoSchema);

module.exports = todoModel;