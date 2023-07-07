import { Schema, model, models, Model } from 'mongoose';

interface IUser {
  email: string
  firstName: string
  lastName: string
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

export const User = models.User as Model<IUser> || model<IUser>('User', userSchema)
