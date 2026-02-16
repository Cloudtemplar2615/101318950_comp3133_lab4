const mongoose = require("mongoose");

const geoSchema = new mongoose.Schema(
  {
    lat: { type: String, required: true },
    lng: { type: String, required: true }
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: {
      type: String,
      required: true,
      match: [/^[A-Za-z ]+$/, "City must contain only alphabets and spaces"]
    },
    zipcode: {
      type: String,
      required: true,
      match: [/^\d{5}-\d{4}$/, "Zipcode must be in format 12345-1234"]
    },
    geo: { type: geoSchema, required: true }
  },
  { _id: false }
);

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
    bs: { type: String, required: true }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    username: {
      type: String,
      required: true,
      minlength: [4, "Username must be at least 4 characters"],
      maxlength: [100, "Username must be at most 100 characters"]
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email must be valid"]
    },

    address: { type: addressSchema, required: true },

    phone: {
      type: String,
      required: true,
      match: [/^\d-\d{3}-\d{3}-\d{4}$/, "Phone must be in format 1-123-123-1234"]
    },

    website: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^https?:\/\/.+/i.test(v),
        message: "Website must be a valid URL starting with http or https"
      }
    },

    company: { type: companySchema, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
