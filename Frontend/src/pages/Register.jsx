import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTie,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { registerUser } from "../services/registerService";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Fleet Manager",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const data = await registerUser(payload);

      toast.success(data.message || "Registration Successful");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-indigo-700 to-slate-900 flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 justify-center items-center text-white p-12">

        <div>

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-white text-violet-700 p-5 rounded-full">
              <FaTruck size={40} />
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                TransitOps
              </h1>

              <p className="text-violet-200 mt-2">
                Smart Fleet Management Platform
              </p>
            </div>

          </div>

          <h2 className="text-4xl font-bold leading-relaxed">
            Create your account
            <br />
            and start managing
            <br />
            your fleet today.
          </h2>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center p-8">

        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

          <h2 className="text-4xl font-bold text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Join TransitOps
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div className="flex items-center border rounded-xl px-4">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-4 outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <FaUserTie className="text-gray-400" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-4 outline-none bg-transparent"
              >
                <option>Fleet Manager</option>
                <option>Driver</option>
                <option>Safety Officer</option>
                <option>Financial Analyst</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-bold"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <p className="text-center mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-violet-600 font-semibold ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;