import { useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/donors", form);
      toast.success("Donor Added Successfully ✅");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add donor ❌");
    }
  };

  const fields = [
    "donorName",
    "bloodGroup",
    "age",
    "contact",
    "city",
    "lastDonationDate",
    "unitsAvailable"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-6">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-5 border"
      >
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-red-600">
          BloodGroupManagementSystem
        </h2>

        {/* Inputs */}
        {fields.map((f) => (
          <div key={f} className="space-y-1">

            <label className="text-sm font-semibold text-gray-700">
              {f.replace(/([A-Z])/g, " $1")}
            </label>

            <input
              type={
                f === "age" || f === "contact" || f === "unitsAvailable"
                  ? "number"
                  : f === "lastDonationDate"
                  ? "date"
                  : "text"
              }
              placeholder={f.replace(/([A-Z])/g, " $1")}
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
              onChange={(e) =>
                setForm({ ...form, [f]: e.target.value })
              }
              required
            />
          </div>
        ))}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Add Donor
        </button>

      </form>
    </div>
  );
};

export default CreatePage;