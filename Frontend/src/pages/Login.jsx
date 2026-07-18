import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";
import { FaTruck, FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-indigo-700 to-slate-900 flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 items-center justify-center text-white p-12">

        <div>

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-white text-violet-700 rounded-full p-5">
              <FaTruck size={40} />
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                TransitOps
              </h1>

              <p className="text-violet-200 mt-2">
                Smart Transport Operations
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold leading-relaxed">
            Manage your fleet,
            <br />
            drivers and trips
            <br />
            from one dashboard.
          </h2>

          <p className="mt-8 text-violet-200 text-lg">
            Fleet Management • Fuel Tracking • Maintenance • Reports
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center p-8">

        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <h2 className="text-4xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Login to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="font-semibold mb-2 block">
                Email
              </label>

              <div className="flex items-center border rounded-xl px-4">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />

              </div>

            </div>

            <div>

              <label className="font-semibold mb-2 block">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4">

                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-4 rounded-xl font-bold text-lg"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;