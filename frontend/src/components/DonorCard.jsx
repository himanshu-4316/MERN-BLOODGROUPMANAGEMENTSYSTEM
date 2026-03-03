import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const DonorCard = ({ donor, setDonors }) => {
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/donors/${donor._id}`);
      setDonors(prev => prev.filter(d => d._id !== donor._id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-md border p-4">

        <h2 className="font-bold text-lg">{donor.donorName}</h2>

        <p>Group: {donor.bloodGroup}</p>
        <p>City: {donor.city}</p>
        <p>Contact: {donor.contact}</p>
        <p>Units: {donor.unitsAvailable}</p>
        <p>Last Donation: {formatDate(donor.lastDonationDate)}</p>

        <span className={`badge ${
          donor.status === "Available"
          ? "badge-success"
          : "badge-error"
        }`}>
          {donor.status}
        </span>

        <div className="flex justify-between mt-4">
          <Link to={`/donor/${donor._id}`} className="btn btn-sm">
            View
          </Link>

          <button onClick={() => setShow(true)}>
            <Trash2 className="text-red-500"/>
          </button>
        </div>
      </div>

      {show && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold">Delete Donor?</h3>
            <div className="modal-action">
              <button onClick={() => setShow(false)} className="btn">Cancel</button>
              <button onClick={handleDelete} className="btn btn-error">Delete</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default DonorCard;