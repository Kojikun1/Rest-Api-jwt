import mongoose, { Types, Schema, Document } from 'mongoose'
import aws from "aws-sdk"
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       requied: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

interface IPostSchema extends Document{
    name: string;
    size: number;
    key: string;
    url: string;
    user: Types.ObjectId
    createdAt: Schema.Types.Date
}

PostSchema.pre<IPostSchema>('save', function() {
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
})

PostSchema.pre<IPostSchema>('remove', function(){
    if(process.env.STORAGE_TYPE === 's3'){
       return s3.deleteObject({
           Bucket: process.env.AWS_BUCKET as string,
           Key: this.key
       }).promise()
    }else {
         return promisify(fs.unlink)(
            path.resolve(__dirname,'..','..',"tmp", "uploads", this.key)
         )
    }
})

export default mongoose.model<IPostSchema>("Post",PostSchema);