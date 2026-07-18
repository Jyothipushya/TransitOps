import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-7xl font-bold">404</h1>

      <h2 className="text-2xl mt-4">
        Page Not Found
      </h2>

      <Link
        to="/dashboard"
        className="mt-6 bg-violet-600 text-white px-5 py-3 rounded-lg"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;