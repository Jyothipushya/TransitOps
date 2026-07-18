import { useEffect, useState } from "react";
import StatCard from "../assets/components/dashboard/StatCard";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          title="Total Vehicles"
          value={dashboard?.totalVehicles || 0}
          color="#22c55e"
        />

        <StatCard
          title="Available Vehicles"
          value={dashboard?.availableVehicles || 0}
          color="#3b82f6"
        />

        <StatCard
          title="Vehicles In Maintenance"
          value={dashboard?.inShopVehicles || 0}
          color="#f59e0b"
        />

        <StatCard
          title="Active Trips"
          value={dashboard?.activeTrips || 0}
          color="#8b5cf6"
        />

        <StatCard
          title="Available Drivers"
          value={dashboard?.availableDrivers || 0}
          color="#ef4444"
        />

        <StatCard
          title="Total Expenses"
          value={`₹${dashboard?.totalExpenses || 0}`}
          color="#14b8a6"
        />

      </div>
    </>
  );
}

export default Dashboard;