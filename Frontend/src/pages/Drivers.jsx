import { useEffect, useState } from "react";
import Table from "../assets/components/common/Table";
import StatusBadge from "../assets/components/common/StatusBadge";
import DriverForm from "../assets/components/drivers/DriverForm";
import DriverModal from "../assets/components/drivers/DriverModal";

import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../services/driverService";

import toast from "react-hot-toast";

function Drivers() {
  const [drivers, setDrivers] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data.drivers);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load drivers");
    }
  };

  const handleAdd = () => {
    setEditingDriver(null);
    setOpenModal(true);
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this driver?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDriver(id);

      toast.success("Driver Deleted");

      fetchDrivers();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingDriver) {
        await updateDriver(editingDriver._id, formData);

        toast.success("Driver Updated");
      } else {
        await createDriver(formData);

        toast.success("Driver Added");
      }

      setOpenModal(false);

      fetchDrivers();
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
      key: "name",
      title: "Driver",
    },
    {
      key: "licenseNumber",
      title: "License No",
    },
    {
      key: "licenseCategory",
      title: "Category",
    },
    {
      key: "licenseExpiryDate",
      title: "Expiry",
      render: (row) =>
        new Date(row.licenseExpiryDate).toLocaleDateString(),
    },
    {
      key: "contactNumber",
      title: "Contact",
    },
    {
      key: "safetyScore",
      title: "Safety",
    },
    {
      key: "status",
      title: "Status",
      render: (row) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      key: "actions",
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
          Drivers
        </h1>

        <button
          onClick={handleAdd}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Driver
        </button>
      </div>

      <Table
        columns={columns}
        data={drivers}
      />

      <DriverModal
        isOpen={openModal}
        title={
          editingDriver
            ? "Edit Driver"
            : "Add Driver"
        }
        onClose={() => setOpenModal(false)}
      >
        <DriverForm
          initialData={editingDriver}
          onSubmit={handleSubmit}
          onCancel={() => setOpenModal(false)}
        />
      </DriverModal>
    </>
  );
}

export default Drivers;