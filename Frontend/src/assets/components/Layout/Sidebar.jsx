import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTruck,
  FaUserTie,
  FaRoute,
  FaTools,
  FaGasPump,
  FaChartBar,
  FaMoneyBillWave
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Vehicles",
      path: "/vehicles",
      icon: <FaTruck />,
    },
    {
      name: "Drivers",
      path: "/drivers",
      icon: <FaUserTie />,
    },
    {
      name: "Trips",
      path: "/trips",
      icon: <FaRoute />,
    },
    {
      name: "Maintenance",
      path: "/maintenance",
      icon: <FaTools />,
    },
    {
      name: "Fuel",
      path: "/fuel",
      icon: <FaGasPump />,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white shadow-xl flex flex-col justify-between">
      {/* Logo */}
      <div className="border-b border-slate-700 px-6 py-6">
        <h1 className="text-3xl font-extrabold tracking-wide">
          🚚 TransitOps
        </h1>

        <p className="text-sm text-slate-300 mt-2">
          Smart Transport Operations
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3 overflow-y-auto">
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all duration-200
                ${
                  active
                    ? "bg-violet-600 shadow-lg"
                    : "hover:bg-slate-800 hover:translate-x-1"
                }`}
            >
              <span className="text-xl">{item.icon}</span>

              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-5 text-center">
        <p className="text-sm text-slate-400">
          Odoo Hackathon 2026
        </p>

        <p className="text-xs text-slate-500 mt-1">
          MERN Stack
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;