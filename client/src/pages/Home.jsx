import { Link, useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg text-center">

        <h1 className="text-5xl font-bold text-blue-600">
          VITA-AI
        </h1>

        <p className="mt-4 text-gray-600">
          Vitamin D Integrated Tracking and Assessment
        </p>

        <Link
          to="/assessment"
          className="
            inline-block
            mt-6
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
            hover:bg-blue-700
          "
        >
          Start Assessment
        </Link>

        <button
          onClick={() => navigate("/dashboard")}
          className="
            bg-green-600
            text-white
            px-6
            py-3
            rounded-lg
            hover:bg-green-700
            ml-4
          "
        >
          Go To Dashboard
        </button>

      </div>

    </div>
  );
}