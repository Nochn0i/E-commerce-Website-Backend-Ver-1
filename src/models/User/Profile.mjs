import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User_Account",
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      trim: true,
      default: "",
      minlength: 2,
      maxlength: 100,
    },
    phone_number: {
      type: String,
      trim: true,
      defautl: "",
      match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
    },
    profile_type: {
      type: String,
      required: true,
      enum: ["buyer", "seller", "admin"],
    },
    avatar_url: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    discriminatorKey: "profile_type",
    collection: "user_profiles",
  },
);

const UserProfile = mongoose.model("User_Profile", userProfileSchema);
const profileAdminSchema = new mongoose.Schema(
  {
    is_admin: {
      type: Boolean,
      default: true,
      required: true,
      immutable: true,
    },
    designation: {
      type: String,
      default: "System Administrator",
      immutable: true,
    },
  },
  {
    timestamps: true,
  },
);

const AdminProfile = UserProfile.discriminator("admin", profileAdminSchema);

const profileUserSchema = new mongoose.Schema({
  seller_metrics: {
    rating: { type: Number, default: 0 },
    total_sales: { type: Number, default: 0 },
    shop_name: { type: String, trim: true },
  },

  buyer_preferences: {
    saved_categories: [String],
    shipping_address: {
      street: String,
      city: String,
      state: String,
      zip_code: String,
    },
  },
});

const BuyerProfile = UserProfile.discriminator("buyer", profileUserSchema);
const SellerProfile = UserProfile.discriminator("seller", profileUserSchema);

export { UserProfile, AdminProfile, BuyerProfile, SellerProfile };
