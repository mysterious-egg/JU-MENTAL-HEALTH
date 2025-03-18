

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import html2pdf from "html2pdf.js";

const apiUrl = import.meta.env.VITE_API_URL;

const FinalPage = () => {
  const evaluationResults = useSelector((state) => state.mentalHealth.evaluationResults);
  const userDetails = useSelector((state) => state.mentalHealth.userDetails);
  const reportRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("📊 Final Evaluation Results:", evaluationResults);
  console.log("👤 User Details:", userDetails);

  // Function to generate PDF
  const handleDownloadPDF = () => {
    if (reportRef.current) {
      html2pdf()
        .set({
          margin: 10,
          filename: "Mental_Health_Assessment_Report.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(reportRef.current)
        .save();
    }
  };

  // Function to submit data to the backend
  const handleSubmitData = async () => {
    setIsSubmitting(true);
    const dataToSend = {
      userInfo: userDetails,
      assessmentResults: evaluationResults,
    };

    try {
      const response = await fetch(`${apiUrl}submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("✅ Your data has been successfully submitted.");
        window.location.href = "/";
      } else {
        alert("❌ Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("⚠️ An error occurred while submitting your data.");
    } finally {
      setIsSubmitting(false);
      setShowPopup(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Final Assessment Results</h2>

      <div ref={reportRef} className="p-6 bg-white shadow-lg rounded-lg">
        {/* User Details Section */}
        {userDetails && Object.keys(userDetails).length > 0 ? (
          <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800">User Information</h3>
            <div className="mt-3 space-y-2">
              {Object.entries(userDetails).map(([key, value]) => (
                <p key={key} className="text-gray-700">
                  <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value || "N/A"}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">User details are not available.</p>
        )}

        {/* Render DASS-21 Results */}
        {evaluationResults?.DASS21 && (
          <div className="p-4 bg-blue-100 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800">DASS-21 (Depression, Anxiety, and Stress Scale)</h3>
            <div className="grid grid-cols-3 gap-4 mt-3">
              {["depression", "anxiety", "stress"].map((key) => (
                <div key={key} className="p-4 bg-white rounded-lg shadow-md text-center">
                  <h4 className="text-lg font-semibold capitalize">{key}</h4>
                  <p className="text-gray-700">
                    <strong>Score:</strong> {evaluationResults.DASS21[key]?.score || 0} / {evaluationResults.DASS21[key]?.totalQuestions * 3 || 0}
                  </p>
                  <p className={`font-bold ${getSeverityColor(evaluationResults.DASS21[key]?.severity)}`}>
                    {evaluationResults.DASS21[key]?.severity || "N/A"}
                  </p>
                  <p className="text-gray-700 text-sm">{evaluationResults.DASS21[key]?.message || "No details available."}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render ASRS (ADHD) Results */}
        {evaluationResults?.ASRS && (
          <div className="p-4 bg-purple-100 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800">ADHD (ASRS)</h3>
            <p className="text-gray-700">
              <strong>Score:</strong> {evaluationResults.ASRS.score} / 6
            </p>
            <p className={`font-bold ${getSeverityColor(evaluationResults.ASRS.severity)}`}>
              {evaluationResults.ASRS.severity}
            </p>
            <p className="text-gray-700">{evaluationResults.ASRS.evaluationMessage}</p>
          </div>
        )}

        {/* Render Emotional Dysregulation Results */}
        {evaluationResults?.EmotionalDysregulation && (
          <div className="p-4 bg-green-100 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Emotional Dysregulation</h3>
            <p className="text-gray-700">
              <strong>Score:</strong> {evaluationResults.EmotionalDysregulation.score} / {evaluationResults.EmotionalDysregulation.totalQuestions}
            </p>
            <p className={`font-bold ${getSeverityColor(evaluationResults.EmotionalDysregulation.severity)}`}>
              {evaluationResults.EmotionalDysregulation.severity}
            </p>
            <p className="text-gray-700">{evaluationResults.EmotionalDysregulation.evaluationMessage}</p>
          </div>
        )}
      </div>

      {/* Buttons Section */}
      <div className="mt-6 text-center flex justify-between">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          Download Report (PDF)
        </button>

        <button 
          onClick={() => setShowPopup(true)} 
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Finish & Go Home
        </button>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800">Do you agree to share your data?</h3>
            <p className="text-gray-600 mt-2">
              Your information and assessment results will be securely shared with JECRC X Mpower’s professionals for further assistance.
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleSubmitData}
                disabled={isSubmitting}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none"
              >
                {isSubmitting ? "Submitting..." : "Yes, Share"}
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                No, Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to set severity colors
const getSeverityColor = (severity) => severity === "Normal" ? "text-green-600" : "text-red-600";

export default FinalPage;
