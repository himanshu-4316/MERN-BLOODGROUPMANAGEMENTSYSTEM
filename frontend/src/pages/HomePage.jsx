import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import DonorCard from "../components/DonorCard";
import DonorNotFound from "../components/DonorNotFound";
import toast from "react-hot-toast";

const HomePage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // fetch donors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await api.get("/donors");
        setDonors(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load donors");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // search filter
  const filteredDonors = donors.filter((d) => {
    const value = search.toLowerCase();

    return (
      d.donorName?.toLowerCase().includes(value) ||
      d.bloodGroup?.toLowerCase().includes(value) ||
      d.city?.toLowerCase().includes(value) ||
      d.contact?.toString().includes(value) ||
      d.unitsAvailable?.toString().includes(value)
    );
  });

  // dashboard stats
  const total = donors.length;
  const available = donors.filter(d => d.status === "Available").length;
  const unavailable = donors.filter(d => d.status !== "Available").length;

  const bloodCounts = donors.reduce((acc, d) => {
    acc[d.bloodGroup] = (acc[d.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  const mostCommonGroup =
    Object.entries(bloodCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">Total</p>
            <h2 className="text-2xl font-bold">{total}</h2>
          </div>

          <div className="bg-green-100 shadow rounded-xl p-4 text-center">
            <p className="text-green-700 text-sm">Available</p>
            <h2 className="text-2xl font-bold text-green-700">{available}</h2>
          </div>

          <div className="bg-red-100 shadow rounded-xl p-4 text-center">
            <p className="text-red-700 text-sm">Unavailable</p>
            <h2 className="text-2xl font-bold text-red-700">{unavailable}</h2>
          </div>

          <div className="bg-blue-100 shadow rounded-xl p-4 text-center">
            <p className="text-blue-700 text-sm">Most Common</p>
            <h2 className="text-2xl font-bold text-blue-700">{mostCommonGroup}</h2>
          </div>

        </div>


        {/* Blood Group Count Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(bloodCounts).map(([group,count]) => (
            <button
              key={group}
              onClick={() => setSearch(group)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              {group} : {count}
            </button>
          ))}
        </div>


        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, group, city, contact, units..."
          className="input input-bordered w-full mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        {/* Loading */}
        {loading && (
          <p className="text-center text-primary py-10">
            Loading donors...
          </p>
        )}


        {/* No donors */}
        {!loading && filteredDonors.length === 0 && (
          <DonorNotFound />
        )}


        {/* Donor Grid */}
        {!loading && filteredDonors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <DonorCard
                key={donor._id}
                donor={donor}
                setDonors={setDonors}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;