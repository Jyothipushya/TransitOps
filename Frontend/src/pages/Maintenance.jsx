import { useEffect, useState } from "react";
import Table from "../assets/components/common/Table";
import StatusBadge from "../assets/components/common/StatusBadge";

import MaintenanceForm from "../assets/components/maintenance/MaintenanceForm";
import MaintenanceModal from "../assets/components/maintenance/MaintenanceModal";

import {
  getMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../services/maintenanceService";

import toast from "react-hot-toast";

function Maintenance() {
  const [maintenance, setMaintenance] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState(null);

  useEffect(() => {
    fetchMaintenance();
  }, []);

  const fetchMaintenance = async () => {
    try {
      const data = await getMaintenance();
      setMaintenance(data.maintenance);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load maintenance records");
    }
  };

  const handleAdd = () => {
    setEditingMaintenance(null);
    setOpenModal(true);
  };

  const handleEdit = (record) => {
    setEditingMaintenance(record);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this maintenance record?")) return;

    try {
      await deleteMaintenance(id);
      toast.success("Maintenance deleted");
      fetchMaintenance();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingMaintenance) {
        await updateMaintenance(
          editingMaintenance._id,
          formData
        );
        toast.success("Maintenance updated");
      } else {
        await createMaintenance(formData);
        toast.success("Maintenance added");
      }

      setOpenModal(false);
      fetchMaintenance();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  const columns = [
    {
      title: "Vehicle",
      render: (row) =>
        row.vehicle?.vehicleName || "N/A",
    },
    {
      key: "serviceType",
      title: "Service Type",
    },
    {
      key: "serviceDate",
      title: "Service Date",
      render: (row) =>
        new Date(row.serviceDate).toLocaleDateString(),
    },
    {
      key: "nextServiceDate",
      title: "Next Service",
      render: (row) =>
        row.nextServiceDate
          ? new Date(
              row.nextServiceDate
            ).toLocaleDateString()
          : "-",
    },
    {
      key: "cost",
      title: "Cost (₹)",
    },
    {
      key: "status",
      title: "Status",
      render: (row) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      title: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Maintenance
        </h1>

        <button
          onClick={handleAdd}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Maintenance
        </button>
      </div>

      <Table
        columns={columns}
        data={maintenance}
      />

      <MaintenanceModal
        isOpen={openModal}
        title={
          editingMaintenance
            ? "Edit Maintenance"
            : "Add Maintenance"
        }
        onClose={() => setOpenModal(false)}
      >
        <MaintenanceForm
          initialData={editingMaintenance}
          onSubmit={handleSubmit}
          onCancel={() => setOpenModal(false)}
        />
      </MaintenanceModal>
    </>
  );
}

export default Maintenance;