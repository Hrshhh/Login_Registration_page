import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    }

}, {timestamps: true})


userSchema.pre('save', function(next){
    let user = this;
    if(user.isModified('password')){
        return bcrypt.hash(user.password, 12, function(err, hash){
            if(err){
                console.log("Bcrypt err ", err);
                return next(err);
            }
            user.password = hash;
            return next();

        })
    }
    else{
        return next();
    }
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.model('User', userSchema);