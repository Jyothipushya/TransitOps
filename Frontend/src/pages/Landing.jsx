import { Link } from "react-router-dom";
import {
  FaTruck,
  FaUserTie,
  FaRoute,
  FaGasPump,
  FaTools,
  FaChartLine,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaChartBar,
} from "react-icons/fa";

function Landing() {
  const features = [
    {
      icon: <FaTruck className="text-4xl text-violet-600" />,
      title: "Vehicle Management",
      desc: "Manage fleet details, capacity, registration and vehicle availability.",
    },
    {
      icon: <FaUserTie className="text-4xl text-violet-600" />,
      title: "Driver Management",
      desc: "Track drivers, licenses, availability and performance.",
    },
    {
      icon: <FaRoute className="text-4xl text-violet-600" />,
      title: "Trip Management",
      desc: "Assign vehicles, drivers and monitor ongoing trips.",
    },
    {
      icon: <FaGasPump className="text-4xl text-violet-600" />,
      title: "Fuel Tracking",
      desc: "Monitor fuel usage, costs and improve fleet efficiency.",
    },
    {
      icon: <FaTools className="text-4xl text-violet-600" />,
      title: "Maintenance",
      desc: "Schedule maintenance and keep every vehicle road ready.",
    },
    {
      icon: <FaChartLine className="text-4xl text-violet-600" />,
      title: "Reports",
      desc: "Gain insights through operational and financial analytics.",
    },
  ];

  const highlights = [
    {
      icon: <FaShieldAlt />,
      title: "Secure Authentication",
    },
    {
      icon: <FaClock />,
      title: "Real-Time Monitoring",
    },
    {
      icon: <FaChartBar />,
      title: "Powerful Analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 shadow-sm">

        <div className="flex items-center gap-3">
          <FaTruck className="text-violet-600 text-4xl" />
          <h1 className="text-3xl font-bold">
            TransitOps
          </h1>
        </div>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg font-semibold text-violet-600 hover:bg-violet-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Get Started
          </Link>

        </div>

      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-violet-700 via-indigo-700 to-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-10 py-24 grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h1 className="text-6xl font-extrabold leading-tight">
              Smart Fleet
              <br />
              Management
              <br />
              Platform
            </h1>

            <p className="mt-8 text-xl text-violet-100 leading-8">
              Manage vehicles, drivers, trips, maintenance,
              fuel and expenses from one centralized dashboard.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/register"
                className="bg-white text-violet-700 px-7 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition"
              >
                Get Started
                <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="border border-white px-7 py-4 rounded-xl font-semibold hover:bg-white hover:text-violet-700 transition"
              >
                Login
              </Link>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">

              <h2 className="text-4xl font-bold">
                500+
              </h2>

              <p className="mt-2">
                Fleet Operations
              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">

              <h2 className="text-4xl font-bold">
                120+
              </h2>

              <p className="mt-2">
                Drivers Managed
              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">

              <h2 className="text-4xl font-bold">
                10K+
              </h2>

              <p className="mt-2">
                Trips Completed
              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">

              <h2 className="text-4xl font-bold">
                99.9%
              </h2>

              <p className="mt-2">
                System Availability
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-10 py-20">

        <h2 className="text-4xl font-bold text-center">
          Everything You Need
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-14">
          Manage every aspect of fleet operations in one place.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition"
            >
              {feature.icon}

              <h3 className="text-2xl font-bold mt-5">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* Why Choose */}
      <section className="bg-slate-100 py-20">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-center text-4xl font-bold">
            Why Choose TransitOps?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >

                <div className="text-5xl text-violet-600 flex justify-center mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-violet-700 text-white py-20">

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            Ready to Simplify Fleet Operations?
          </h2>

          <p className="mt-6 text-xl text-violet-100">
            Start managing your transport operations with TransitOps.
          </p>

          <Link
            to="/register"
            className="inline-block mt-10 bg-white text-violet-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            Create Account
          </Link>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-10 text-center">

        <h2 className="text-2xl font-bold">
          TransitOps
        </h2>

        <p className="mt-3 text-slate-400">
          Smart Fleet Management Platform
        </p>

        <p className="mt-6 text-sm text-slate-500">
          © 2026 TransitOps. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Landing;