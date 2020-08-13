import mongoose, { Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true
     },
     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar_url: String,
    todo_list: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}
    ]
})

export interface IUserSchema extends Document {
    name: string,
    email: string,
    password: string,
    avatar_url: string,
    todo_list: Types.Array<Types.ObjectId>
}

UserSchema.pre<IUserSchema>('save', async function() {
     const hashedPassword = await bcrypt.hash(this.password,8);
     this.password = hashedPassword;
})

export default mongoose.model<IUserSchema>("User", UserSchema);

