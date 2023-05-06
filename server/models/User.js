import mongoose from "mongoose";

const UserSchema = 
 mongoose.Schema(
    {
        username: {
            type: String,
            required: false,
            min: 2,
            max: 25
        },
        email: {
            type: String,
            required: true,
            min: 5,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 5,
            max: 25
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        address: {
            type: String,
            required: false,
            max: 50
        }
    },
    { timestamps: true }
)

const User = mongoose.model("User", UserSchema);
export default User;