import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const DonorDetailPage = () => {
  const {id} = useParams();
  const nav = useNavigate();

  const [donor,setDonor] = useState(null);
  const [editMode,setEditMode] = useState(false);

  useEffect(()=>{
    api.get(`/donors/${id}`)
      .then(res=>setDonor(res.data))
      .catch(()=>toast.error("Failed to load donor"));
  },[id]);

  const save = async ()=>{
    try{
      await api.put(`/donors/${id}`,donor);
      toast.success("Updated Successfully");
      setEditMode(false);
    }catch{
      toast.error("Update Failed");
    }
  };

  if(!donor) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-5">

        <h2 className="text-2xl font-bold text-center text-red-600">
          Donor Details
        </h2>

        {Object.keys(donor).map(key =>
          key!=="_id" && key!=="createdAt" && (
            <div key={key}>
              <label className="text-sm font-semibold text-gray-700 capitalize">
                {key.replace(/([A-Z])/g," $1")}
              </label>

              <input
                type={
                  key==="age"||key==="contact"||key==="unitsAvailable"
                    ? "number"
                    : key==="lastDonationDate"
                    ? "date"
                    : "text"
                }
                value={donor[key] || ""}
                disabled={!editMode}
                onChange={e=>setDonor({...donor,[key]:e.target.value})}
                className={`w-full border-2 rounded-lg px-3 py-2 outline-none
                  ${editMode
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 bg-gray-100 cursor-not-allowed"
                  }`}
              />
            </div>
          )
        )}

        <div className="flex gap-3">

          {!editMode ? (
            <button
              onClick={()=>setEditMode(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Edit
            </button>
          ):(
            <button
              onClick={save}
              className="w-full bg-green-600 text-white py-3 rounded-lg"
            >
              Save Changes
            </button>
          )}

          <button
            onClick={()=>nav("/")}
            className="w-full bg-gray-500 text-white py-3 rounded-lg"
          >
            Back
          </button>

        </div>

      </div>
    </div>
  );
};

export default DonorDetailPage;