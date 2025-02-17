import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},

});
const User = models.User || model("User", UserSchema);
//route is only running whne its getting called  so in mongoose library all models are sove and it prevent from redefinign models again if not then cretes new models
export default User;
