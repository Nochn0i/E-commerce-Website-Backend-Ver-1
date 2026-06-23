import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 255,
      match: /^[0-9A-Za-z_]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    type: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userAccountSchema.set("toObject", {
  transform: (_, ret) => {
    delete ret.password;
    delete ret.updatedAt;
    delete ret.createdAt;
    delete ret.__v;
    return ret;
  },
});

const UserAccount = mongoose.model("User_Account", userAccountSchema);

export default UserAccount;
