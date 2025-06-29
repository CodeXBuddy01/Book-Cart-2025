import mongoose, {Document, Schema} from "mongoose";
import bcrypt from 'bcryptjs'

// Create User Interface
export interface IUSER extends Document {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    profilePicture?: string;
    phoneNumber?: string;
    isVerified: boolean;
    verificationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    agreeTerms: boolean;
    addresses: mongoose.Types.ObjectId[];
    comparePassword(candidatePassword: string) : Promise<boolean>
}

// Create User Schema
const userSchema = new Schema<IUSER>({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String},
    googleId: {type:String},
    profilePicture: {type:String, default:null},
    phoneNumber: {type:String, default:null},
    isVerified: {type:Boolean, default:false},
    verificationToken: {type:String, default:null},
    resetPasswordToken: {type:String, default:null},
    resetPasswordExpires: {type:Date, default:null},
    agreeTerms: {type:Boolean, default:false},
    addresses: [{type:Schema.Types.ObjectId, ref: 'Address'}],
}, {timestamps:true})


// Compare Password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt)
    next();
})

//Compare Candidate Password
userSchema.methods.comparePassword = async function (candidatePassword:string) : Promise<boolean>{
    return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IUSER>('User', userSchema)