import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { instanceMethod, pre, prop, Typegoose } from "typegoose";

// export type UserModel = mongoose.Document & {
//   email: string,
//   password: string,
//   passwordResetToken: string,
//   passwordResetExpires: Date,

//   facebook: string,
//   tokens: AuthToken[],

//   profile: {
//     name: string,
//     gender: string,
//     location: string,
//     website: string,
//     picture: string
//   },

//   comparePassword: comparePasswordFunction,
//   gravatar: (size: number) => string
// };

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => {}
) => void;

type gravatarFunction = (size: number) => string;

export interface IAuthToken {
  accessToken: string;
  kind: string;
}

@pre<UserType>("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(
      this.password,
      salt,
      undefined,
      (error: mongoose.Error, hash) => {
        if (error) {
          return next(error);
        }
        this.password = hash;
        next();
      }
    );
  });
})
export class UserType extends Typegoose {
  @prop({ unique: true })
  email: string;
  @prop() password: string;
  @prop() passwordResetToken: string;
  @prop() passwordResetExpires: string;
  @prop() facebook: string;
  @prop() twitter: string;
  @prop() google: string;
  @prop() tokens: IAuthToken[];
  @prop()
  profile: {
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
  };
  @prop()
  comparePassword: comparePasswordFunction = function(candidatePassword, cb) {
    bcrypt.compare(
      candidatePassword,
      this.password,
      (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
      }
    );
  };
  @prop()
  gravatar: gravatarFunction = function(size: number) {
    if (!size) {
      size = 200;
    }
    if (!this.email) {
      return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto
      .createHash("md5")
      .update(this.email)
      .digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
  };
}

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   password: String,
//   passwordResetToken: String,
//   passwordResetExpires: Date,

//   facebook: String,
//   twitter: String,
//   google: String,
//   tokens: Array,

//   profile: {
//     name: String,
//     gender: String,
//     location: String,
//     website: String,
//     picture: String
//   }
// }, { timestamps: true });

/**
 * Password hash middleware.
 */
// userSchema.pre("save", function save(next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });

// const comparePassword: comparePasswordFunction = function(
//   candidatePassword,
//   cb
// ) {
//   bcrypt.compare(
//     candidatePassword,
//     this.password,
//     (err: mongoose.Error, isMatch: boolean) => {
//       cb(err, isMatch);
//     }
//   );
// };

// UserType.prototype.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
// UserType.prototype.gravatar = function(size: number) {
//   if (!size) {
//     size = 200;
//   }
//   if (!this.email) {
//     return `https://gravatar.com/avatar/?s=${size}&d=retro`;
//   }
//   const md5 = crypto
//     .createHash("md5")
//     .update(this.email)
//     .digest("hex");
//   return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
// };

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
// const User = mongoose.model("User", userSchema);
// export default User;

export const UserModel = new UserType().getModelForClass(UserType);
export default UserModel;
