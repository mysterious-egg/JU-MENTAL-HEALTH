
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import generalAssessmentData from '../../FormsJson/genralAssesment.json';
import { setEvaluationResults } from '../../src/redux/Actions/mentalhealthActions';

const DynamicForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [responses, setResponses] = useState({});

  const handleChange = (question, value) => {
    setResponses({ ...responses, [question]: value });
  };

  const handleSubmit = () => {
    const results = {};

    // Loop through each question to calculate the score for each category
    generalAssessmentData.questions.forEach((q) => {
      const category = q.category;
      const questionResponse = responses[q.question];

      if (!results[category]) {
        results[category] = { score: 0, totalQuestions: 0 };
      }

      // Get the score for this question based on its scoreMapping
      const score = q.scoreMapping[questionResponse];

      if (score !== undefined) {
        results[category].score += score;
        results[category].totalQuestions += 1;
      }
    });

    // Calculate the final result for each category (positive/negative)
    Object.keys(results).forEach((category) => {
      const categoryResult = results[category];
      const percentageScore = (categoryResult.score / categoryResult.totalQuestions) * 100;
      results[category].result = percentageScore >= 50 ? 'Positive' : 'Negative';
    });

    // Desired order: Self-harm, DAS, ADHD, Emotional Dysregulation.
    const desiredOrder = ['Self-harm', 'DAS', 'ADHD', 'Emotional Dysregulation'];
    const orderedResults = [];

    // First, add categories in desired order if they exist
    desiredOrder.forEach((key) => {
      if (results[key] !== undefined) {
        orderedResults.push({ category: key, ...results[key] });
      }
    });

    // Then, add any extra categories that were not part of the predefined order
    Object.keys(results).forEach((key) => {
      if (!desiredOrder.includes(key)) {
        orderedResults.push({ category: key, ...results[key] });
      }
    });

    // console.log(" Ordered Results:", orderedResults);

    // Ensure Redux state does not contain duplicate entries
    dispatch(setEvaluationResults("GeneralAssessment", [...orderedResults]));

    // Allow Redux to update before navigating
    setTimeout(() => {
      navigate('/dashboard');
    }, 300); // Add delay for Redux update
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Mental Health Assessment</h2>
      <form className="space-y-4">
        {generalAssessmentData.questions.map((q, index) => (
          <div key={index} className="p-4 bg-blue-50 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-700">{q.question}</p>
            {q.type === "boolean" ? (
              <div className="mt-2">
                <label className="mr-4">
                  <input
                    type="radio"
                    name={q.question}
                    value="true"
                    onChange={() => handleChange(q.question, "true")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={q.question}
                    value="false"
                    onChange={() => handleChange(q.question, "false")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            ) : q.type === "scale" ? (
              <div className="mt-2">
                {q.options.map((option, i) => (
                  <label key={i} className="mr-4">
                    <input
                      type="radio"
                      name={q.question}
                      value={option}
                      onChange={() => handleChange(q.question, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
