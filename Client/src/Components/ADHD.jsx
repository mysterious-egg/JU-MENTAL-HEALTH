
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEvaluationResults } from '../../src/redux/Actions/mentalhealthActions'; // Adjust the path as needed

const ASRSAssessment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const test = {
    "test_name": "Adult ADHD Self-Report Scale (ASRS)",
    "questions": [
      {
        "question": "Do you often have difficulty sustaining attention on tasks or activities?",
        "type": "boolean"
      },
      {
        "question": "Do you often feel restless or fidget frequently?",
        "type": "boolean"
      },
      {
        "question": "Do you often make careless mistakes due to lack of attention?",
        "type": "boolean"
      },
      {
        "question": "Do you often interrupt others or struggle to wait for your turn?",
        "type": "boolean"
      }
    ]
  };

  const [responses, setResponses] = useState({});

  const handleChange = (question, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [question]: value
    }));
  };

  const evaluateADHD = (responses) => {
    let score = 0;
    Object.values(responses).forEach(response => {
      if (response === true) score++;
    });

    let evaluationMessage = '';
    if (score >= 3) {
      evaluationMessage = 'High likelihood of ADHD. It is recommended to seek a professional assessment.';
    } else if (score === 2) {
      evaluationMessage = 'Moderate likelihood of ADHD. Consider further observation or consultation.';
    } else {
      evaluationMessage = 'Low likelihood of ADHD. No significant signs based on this screening.';
    }

    return {
      score,
      evaluationMessage
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = evaluateADHD(responses);
    console.log(result);
    // Dispatch the result to the Redux store under the key "ASRS"
    dispatch(setEvaluationResults('ASRS', result));
    navigate('/dashboard');
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Mental Health Assessment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {test.questions.map((q, index) => (
          <div key={index} className="p-4 bg-blue-50 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <p className="text-lg font-semibold text-gray-700">{q.question}</p>
            {q.type === 'boolean' && (
              <div className="mt-2">
                <label className="mr-4">
                  <input 
                    type="radio" 
                    name={q.question} 
                    value="true" 
                    onChange={() => handleChange(q.question, true)} 
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input 
                    type="radio" 
                    name={q.question} 
                    value="false" 
                    onChange={() => handleChange(q.question, false)} 
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            )}
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

export default ASRSAssessment;
