import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
  },
  {
    timestamps: true
  }
);
const User = mongoose.model("users", UserSchema);
export default User;
