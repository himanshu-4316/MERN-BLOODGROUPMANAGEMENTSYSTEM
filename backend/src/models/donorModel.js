import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    lastDonationDate: {
      type: Date,
    },

    unitsAvailable: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Not Available",
    },
  },
  { timestamps: true } // createdAt & updatedAt (mandatory, not counted)
);

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
