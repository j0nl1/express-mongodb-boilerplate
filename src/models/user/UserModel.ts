import { EMAIL_PATTERN, PASSWORD_PATTERN, SALT, ROLE_USER, ROLE_ADMIN } from '../../utils/constants';
import { Schema, model, HookNextFunction } from 'mongoose';
import { IUserModel } from '../../interfaces';
import * as bcrypt from 'bcryptjs';

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      match: [EMAIL_PATTERN, 'Please fill a valid email address'],
      trim: true,
      required: true,
      sparse: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      match: [PASSWORD_PATTERN, 'Invalid password pattern'],
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    role: {
      type: String,
      enum: [ROLE_USER, ROLE_ADMIN],
      default: ROLE_USER
    },
    fullName: String,
    bio: String,
    image: String,
    badges: [String]
  },
  { timestamps: true }
);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret.password;
    delete ret._id;
  }
});

UserSchema.pre<IUserModel>('save', function(next: HookNextFunction) {
  if (!this.isModified('password')) return next();
  try {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(SALT));
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = function(password: string) {
  return bcrypt.compareSync(password, this.password);
};

export const UserModel = model<IUserModel>('User', UserSchema);
