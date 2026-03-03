import Donor from "../models/donorModel.js";

// GET ALL DONORS
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (error) {
    console.error("Error in getAllDonors controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET DONOR BY ID
export const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json(donor);
  } catch (error) {
    console.error("Error in getDonorById controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// CREATE DONOR
export const createDonor = async (req, res) => {
  try {
    const {
      donorName,
      bloodGroup,
      age,
      contact,
      city,
      lastDonationDate,
      unitsAvailable,
    } = req.body;

    if (
      !donorName ||
      !bloodGroup ||
      !age ||
      !contact ||
      !city
    ) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

   let status = "Not Available";

const today = new Date();
const lastDate = new Date(lastDonationDate);

const diffDays = (today - lastDate) / (1000 * 60 * 60 * 24);

if (unitsAvailable > 0 && diffDays >= 90) {
  status = "Available";

}


    const donor = new Donor({
      donorName,
      bloodGroup,
      age,
      contact,
      city,
      lastDonationDate,
      unitsAvailable,
      status,
    });

    const savedDonor = await donor.save();
    res.status(201).json(savedDonor);
  } catch (error) {
    console.error("Error in createDonor controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE DONOR
export const updateDonor = async (req, res) => {
  try {
    const {
      donorName,
      bloodGroup,
      age,
      contact,
      city,
      lastDonationDate,
      unitsAvailable,
    } = req.body;

    const status = unitsAvailable > 0 ? "Available" : "Not Available";

    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      {
        donorName,
        bloodGroup,
        age,
        contact,
        city,
        lastDonationDate,
        unitsAvailable,
        status,
      },
      { new: true }
    );

    if (!updatedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json(updatedDonor);
  } catch (error) {
    console.error("Error in updateDonor controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE DONOR
export const deleteDonor = async (req, res) => {
  try {
    const deletedDonor = await Donor.findByIdAndDelete(req.params.id);

    if (!deletedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Error in deleteDonor controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
