import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: String,
    email:{ type: String, unique: true },
    password:String,
    token:String
    
  });
  const SignupModal = mongoose.model('usersData', userSchema);
  export default SignupModal