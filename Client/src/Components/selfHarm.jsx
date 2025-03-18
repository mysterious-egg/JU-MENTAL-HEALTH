import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEvaluationResults } from "../../src/redux/Actions/mentalhealthActions";

const SelfHarmAssessment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve existing results
  const existingResults = useSelector(
    (state) => state.mentalHealth.evaluationResults.GeneralAssessment
  ) || [];

  const test = {
    test_name: "Self-Harm Screening",
    questions: [
      { question: "Have you thought about harming yourself in any way?", type: "scale", options: ["Never", "Sometimes", "Often", "Always"] },
      { question: "Have you engaged in self-harming behaviors?", type: "scale", options: ["Never", "Sometimes", "Often", "Always"] },
      { question: "Do you feel an urge to self-harm when emotional?", type: "scale", options: ["Never", "Sometimes", "Often", "Always"] },
      { question: "Do you struggle with guilt after self-harming?", type: "scale", options: ["Never", "Sometimes", "Often", "Always"] },
      { question: "Have you hidden injuries from others?", type: "scale", options: ["Never", "Sometimes", "Often", "Always"] },
      { question: "Have you self-harmed to cope with emotions?", type: "scale", options: ["Never", "Sometimes", "Often", "Always"] },
    ],
  };

  const [responses, setResponses] = useState({});

  const handleChange = (question, value) => {
    setResponses((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const evaluateSelfHarm = (responses) => {
    let score = 0;
    Object.values(responses).forEach((response) => {
      score += response; // assuming the radio values are numbers (0,1,2,3)
    });

    let evaluationMessage = "";
    if (score >= 18) evaluationMessage = "Severe self-harm tendencies. Seek immediate professional help.";
    else if (score >= 15) evaluationMessage = "Moderately severe self-harm tendencies. Seek professional support.";
    else if (score >= 10) evaluationMessage = "Moderate self-harm tendencies. Consider talking to a professional.";
    else if (score >= 5) evaluationMessage = "Mild self-harm tendencies. Self-care and monitoring are recommended.";
    else evaluationMessage = "Minimal or no self-harm tendencies.";

    return { score, evaluationMessage };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = evaluateSelfHarm(responses);
    const totalQuestions = test.questions.length;

    const finalResult = {
      category: "Self-harm",
      score: result.score,
      totalQuestions,
      result: result.evaluationMessage,
    };

    console.log("✅ Submitting result:", finalResult);

    // 🚨 Ensure only ONE self-harm entry exists in Redux
    const updatedResults = existingResults.filter(
      (res) => res.category !== "Self-harm"
    );

    dispatch(setEvaluationResults("GeneralAssessment", [...updatedResults, finalResult]));

    navigate("/dashboard");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">{test.test_name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {test.questions.map((q, index) => (
          <div key={index} className="p-4 bg-blue-50 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <p className="text-lg font-semibold text-gray-700">{q.question}</p>
            <div className="mt-2">
              {q.options.map((option, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={q.question}
                    value={i}
                    onChange={() => handleChange(q.question, i)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SelfHarmAssessment;
