import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getReports } from "../services/reportService";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports();
      setReport(data.report);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reports");
    }
  };

  if (!report) {
    return (
      <h2 className="text-center text-xl mt-20">
        Loading Reports...
      </h2>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Reports & Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Total Vehicles
          </h2>

          <h1 className="text-4xl font-bold text-green-600 mt-2">
            {report.vehicles.totalVehicles}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Available Vehicles
          </h2>

          <h1 className="text-4xl font-bold text-blue-600 mt-2">
            {report.vehicles.availableVehicles}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Vehicles On Trip
          </h2>

          <h1 className="text-4xl font-bold text-orange-600 mt-2">
            {report.vehicles.onTripVehicles}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Total Drivers
          </h2>

          <h1 className="text-4xl font-bold text-purple-600 mt-2">
            {report.drivers.totalDrivers}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Active Trips
          </h2>

          <h1 className="text-4xl font-bold text-red-600 mt-2">
            {report.trips.activeTrips}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Completed Trips
          </h2>

          <h1 className="text-4xl font-bold text-green-600 mt-2">
            {report.trips.completedTrips}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Total Maintenance
          </h2>

          <h1 className="text-4xl font-bold text-yellow-600 mt-2">
            {report.maintenance.totalMaintenance}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Total Fuel Cost
          </h2>

          <h1 className="text-4xl font-bold text-pink-600 mt-2">
            ₹{report.fuel.totalFuelCost}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Total Fuel Used
          </h2>

          <h1 className="text-4xl font-bold text-cyan-600 mt-2">
            {report.fuel.totalFuelLiters} L
          </h1>
        </div>

      </div>
    </>
  );
}

export default Reports;