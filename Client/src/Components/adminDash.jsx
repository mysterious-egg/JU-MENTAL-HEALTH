
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation for redirection
// require('dotenv').config();
const apiUrl = import.meta.env.VITE_API_URL;
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); // Ensure token exists

      if (!token) {
        setError("🚫 No token found!");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure correct token format
          },
        });

        if (!response.ok) {
          throw new Error(`❌ Unauthorized: Redirecting to /admin`);
        }

        const data = await response.json();
        setUsers(data); // ✅ Save users in state
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // ✅ Fetch users only when the component mounts

  // Toggle user details on click
  const toggleExpand = (enroll) => {
    setExpandedUser(expandedUser === enroll ? null : enroll);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center">Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-700 mt-4">Loading user data...</p>
      ) : error ? (
        <p className="text-center text-red-600 mt-4">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-700 mt-4">No users found.</p>
      ) : (
        <div className="max-w-4xl mx-auto mt-6 space-y-4">
          {users.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-lg">
              {/* USER CARD (Click to Expand) */}
              <div
                className="cursor-pointer flex justify-between items-center p-4 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200"
                onClick={() => toggleExpand(user.userInfo.enroll)}
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{user.userInfo.name}</h2>
                  <p className="text-gray-600">Enrollment: {user.userInfo.enroll}</p>
                  <p className="text-gray-600">Year: {user.userInfo.courseYear}</p>
                  <p className="text-gray-600">Residency: {user.userInfo.residency}</p>
                </div>
                <span className="text-blue-700 font-semibold">
                  {expandedUser === user.userInfo.enroll ? "▲ Hide Details" : "▼ Show Details"}
                </span>
              </div>

              {/* FULL USER DETAILS + REPORTS */}
              {expandedUser === user.userInfo.enroll && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700">User Information</h3>
                  <p className="text-gray-700"><strong>Name:</strong> {user.userInfo.name}</p>
                  <p className="text-gray-700"><strong>Enrollment:</strong> {user.userInfo.enroll}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {user.userInfo.phone}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {user.userInfo.email}</p>
                  <p className="text-gray-700"><strong>Emergency Contact:</strong> {user.userInfo.emergencyContact}</p>
                  <p className="text-gray-700"><strong>Course Year:</strong> {user.userInfo.courseYear}</p>
                  <p className="text-gray-700"><strong>Residency:</strong> {user.userInfo.residency}</p>

                  {/* ASSESSMENT REPORTS */}
                  <h3 className="mt-6 text-lg font-semibold text-gray-700">Assessment Reports</h3>

                  {/* ASRS Results */}
                  {user.assessmentResults.ASRS && (
                    <div className="mt-3 p-4 bg-white rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-gray-800">ASRS</h3>
                      <p className="text-gray-700"><strong>Score:</strong> {user.assessmentResults.ASRS.score}</p>
                      <p className="text-gray-700">{user.assessmentResults.ASRS.evaluationMessage}</p>
                    </div>
                  )}

                  {/* Emotional Dysregulation Results */}
                  {user.assessmentResults.EmotionalDysregulation && (
                    <div className="mt-3 p-4 bg-white rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-gray-800">Emotional Dysregulation</h3>
                      <p className="text-gray-700"><strong>Score:</strong> {user.assessmentResults.EmotionalDysregulation.score}</p>
                      <p className="text-gray-700">{user.assessmentResults.EmotionalDysregulation.evaluationMessage}</p>
                    </div>
                  )}

                  {/* DASS-21 Results */}
                  {user.assessmentResults.DASS21 && (
                    <div className="mt-3 p-4 bg-white rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-gray-800">DASS-21</h3>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {["depression", "anxiety", "stress"].map((key) => (
                          <div key={key} className="p-2 bg-blue-100 rounded-md text-center">
                            <h4 className="font-semibold capitalize">{key}</h4>
                            <p><strong>Score:</strong> {user.assessmentResults.DASS21[key].score} / 21</p>
                            <p className={`font-bold ${getSeverityColor(user.assessmentResults.DASS21[key].severity)}`}>
                              {user.assessmentResults.DASS21[key].severity}
                            </p>
                            <p className="text-sm">{user.assessmentResults.DASS21[key].message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to set severity colors
const getSeverityColor = (severity) => {
  switch (severity) {
    case "Normal":
      return "text-green-600";
    case "Mild":
      return "text-yellow-600";
    case "Moderate":
      return "text-orange-600";
    case "Severe":
      return "text-red-600";
    case "Extremely Severe":
      return "text-red-800";
    default:
      return "text-gray-600";
  }
};

export default AdminDashboard;
