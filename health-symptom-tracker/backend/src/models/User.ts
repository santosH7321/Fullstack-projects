import mongoose, { HydratedDocument } from "mongoose"
import bcrypt from "bcrypt"

export interface IUser {
  name: string
  email: string
  password: string
  alertsEnabled: boolean
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>

const userSchema = new mongoose.Schema<
  IUser,
  mongoose.Model<IUser, {}, IUserMethods>,
  IUserMethods
>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    alertsEnabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (this: UserDocument) {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (
  this: UserDocument,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model<
  IUser,
  mongoose.Model<IUser, {}, IUserMethods>
>("User", userSchema)

export default User
