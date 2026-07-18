import { FaBell, FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/vehicles": "Vehicle Management",
    "/drivers": "Driver Management",
    "/trips": "Trip Management",
    "/maintenance": "Maintenance",
    "/fuel": "Fuel & Expenses",
    "/reports": "Reports & Analytics",
  };

  const title = pageTitles[pathname] || "TransitOps";

  return (
    <header className="bg-white shadow-sm border-b px-8 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <p className="text-sm text-gray-500">
          Smart Transport Operations Platform
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <FaBell className="text-2xl text-gray-600 hover:text-violet-600 transition" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-4xl text-violet-600" />

          <div>
            <p className="font-semibold text-slate-800">
              {user?.name || "Admin"}
            </p>

            <p className="text-sm text-gray-500">
              {user?.role || "Fleet Manager"}
            </p>

            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;