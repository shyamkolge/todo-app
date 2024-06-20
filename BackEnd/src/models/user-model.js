const {Schema , model} = require('mongoose');
const argon2 = require('argon2');


const userSchema = new Schema(
{
     name : {
        type : String , 
        require : true,
     },

     email : {
        type : String , 
        require : true,
        unique: true,
        lowercase : true,
        trim : true,
     },

     password : {
        type : String,
        require : true 
     }
     

})

userSchema.pre('save', async function (next) {

    if(!this.isModified('password')) return next();

    this.password =  await argon2.hash(this.password);

     next();
})

userSchema.methods.isPasswordCorrect = async function(password){
   return  await argon2.verify(password, this.password)
}



const userModel = model("user" , userSchema);

module.exports = userModel;