import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-red-400 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">BLOOD GROUP MANAGEMENT SYSTEM </h1>

        <Link to="/create" className="btn btn-primary flex gap-2">
          <PlusIcon size={18} /> Add Donor
        </Link>
      </div>
    </header>
  );
};

export default Navbar;