import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [agreed, setAgreed] = useState(false);
  const [consentGiven, setConsentGiven] = useState(null);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (agreed && consentGiven !== null) {
      navigate("/details", { state: { processData: consentGiven } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="max-w-2xl w-full p-8 bg-white shadow-lg rounded-lg animate-fadeIn">
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          JECRC Mental Health Campaign
        </h1>
        <p className="text-gray-700 mt-4 text-center">
          Mental health is often misunderstood, and many hesitate to seek help due to societal stigma. 
          The <span className="font-semibold">JECRC X Mpower</span> initiative aims to provide a **safe, anonymous, and professional** 
          mental health assessment to help individuals understand their well-being.
        </p>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Why This Matters?</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>🚀 Break the stigma around mental health</li>
            <li>🔒 Fully **anonymous** & confidential assessment</li>
            <li>🩺 Get connected to **JECRC X Mpower** psychiatrists if needed</li>
          </ul>
        </div>

        {/* Agreement Checkbox */}
        <div className="mt-6 flex items-center space-x-3">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="agree" className="text-gray-700">
            I understand that this is an anonymous assessment and agree to proceed.
          </label>
        </div>

        {/* Additional Consent Question */}
        {agreed && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="text-gray-800 font-medium">
              Do you consent to further processing of your assessment data for research and better recommendations?
            </p>
            <div className="mt-2 flex space-x-4">
              <button
                className={`py-2 px-4 rounded-lg font-semibold shadow-md transition duration-200 ${
                  consentGiven === true
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-green-500"
                }`}
                onClick={() => setConsentGiven(true)}
              >
                Yes, I Consent
              </button>
              <button
                className={`py-2 px-4 rounded-lg font-semibold shadow-md transition duration-200 ${
                  consentGiven === false
                    ? "bg-red-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-red-500"
                }`}
                onClick={() => setConsentGiven(false)}
              >
                No, Keep It Anonymous
              </button>
            </div>
          </div>
        )}

        {/* Start Assessment Button */}
        <button
          onClick={handleProceed}
          disabled={!agreed || consentGiven === null}
          className={`w-full mt-6 py-2 px-4 rounded-lg font-semibold shadow-md transition duration-200 ${
            agreed && consentGiven !== null
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
};

export default HomePage;
