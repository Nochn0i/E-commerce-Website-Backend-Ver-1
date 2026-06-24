import mongoose from "mongoose";

const userWalletSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User_Account",
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0.0,
      min: [0, "Balance cannot be negative"],
    },
    currency: {
      type: String,
      default: "NPR",
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserWallet = mongoose.model("User_Wallet", userWalletSchema);

export default UserWallet;
