
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEvaluationResults } from '../../src/redux/Actions/mentalhealthActions'; 

const DASS21Assessment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const test = {
    test_name: "Mental Health Assessment)",
    questions: [
      { question: "I found it hard to wind down", category: "stress" },
      { question: "I was aware of dryness of my mouth", category: "anxiety" },
      { question: "I couldn't seem to experience any positive feeling at all", category: "depression" },
      { question: "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)", category: "anxiety" },
      { question: "I found it difficult to work up the initiative to do things", category: "depression" },
      { question: "I tended to over-react to situations", category: "stress" },
      { question: "I experienced trembling (e.g., in the hands)", category: "anxiety" },
      { question: "I felt that I was using a lot of nervous energy", category: "stress" },
      { question: "I was worried about situations in which I might panic and make a fool of myself", category: "anxiety" },
      { question: "I felt that I had nothing to look forward to", category: "depression" },
      { question: "I found myself getting agitated", category: "stress" },
      { question: "I found it difficult to relax", category: "stress" },
      { question: "I felt down-hearted and blue", category: "depression" },
      { question: "I was intolerant of anything that kept me from getting on with what I was doing", category: "stress" },
      { question: "I felt I was close to panic", category: "anxiety" },
      { question: "I was unable to become enthusiastic about anything", category: "depression" },
      { question: "I felt I wasn't worth much as a person", category: "depression" },
      { question: "I felt that I was rather touchy", category: "stress" },
      { question: "I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)", category: "anxiety" },
      { question: "I felt scared without any good reason", category: "anxiety" },
      { question: "I felt that life was meaningless", category: "depression" }
    ]
  };

  const [responses, setResponses] = useState({});

  const evaluateScores = () => {
    const categories = { depression: 0, anxiety: 0, stress: 0 };

    Object.entries(responses).forEach(([question, value]) => {
      const category = test.questions.find(q => q.question === question)?.category;
      if (category) {
        categories[category] += Number(value);
      }
    });

    return {
      depression: {
        score: categories.depression,
        totalQuestions: 7,
        severity: getSeverity(categories.depression, [0, 4, 6, 10, 13, 21]),
        message: getSeverityMessage("depression", categories.depression)
      },
      anxiety: {
        score: categories.anxiety,
        totalQuestions: 7,
        severity: getSeverity(categories.anxiety, [0, 3, 5, 7, 9, 21]),
        message: getSeverityMessage("anxiety", categories.anxiety)
      },
      stress: {
        score: categories.stress,
        totalQuestions: 7,
        severity: getSeverity(categories.stress, [0, 7, 9, 12, 16, 21]),
        message: getSeverityMessage("stress", categories.stress)
      }
    };
  };

  // Function to determine severity level based on score
  const getSeverity = (score, thresholds) => {
    if (score <= thresholds[1]) return "Normal";
    if (score <= thresholds[2]) return "Mild";
    if (score <= thresholds[3]) return "Moderate";
    if (score <= thresholds[4]) return "Severe";
    return "Extremely Severe";
  };

  // Function to return severity messages
  const getSeverityMessage = (category, score) => {
    const messages = {
      depression: [
        "You are within a normal range for depressive symptoms. Maintain a healthy lifestyle.",
        "You have mild depressive symptoms. Consider self-care strategies.",
        "You may be experiencing moderate depressive symptoms. Talking to a professional could be beneficial.",
        "Your symptoms indicate a high level of depression. Seeking professional support is strongly recommended.",
        "You are experiencing extreme levels of depression. Immediate professional help is necessary."
      ],
      anxiety: [
        "Your anxiety levels are within a normal range. No significant distress detected.",
        "You exhibit mild anxiety symptoms. Relaxation techniques could help.",
        "Moderate anxiety symptoms detected. Consider stress-reducing activities.",
        "Your anxiety levels are severe. Therapy or medical consultation might help.",
        "Your anxiety levels are extremely high, which may impact daily functioning. Seeking urgent professional help is advised."
      ],
      stress: [
        "Your stress levels are well-managed and within a normal range.",
        "Mild stress detected. Consider lifestyle adjustments.",
        "Moderate stress levels. Finding relaxation methods or making small lifestyle changes could help.",
        "You are experiencing high stress. Consider professional guidance and relaxation techniques.",
        "Extreme stress levels detected. Prioritizing mental health care and seeking immediate support is necessary."
      ]
    };
  
    const thresholds = {
      depression: [4, 6, 10, 13, 21], 
      anxiety: [3, 5, 7, 9, 21],     
      stress: [7, 9, 12, 16, 21]      
    };
  
    // Find correct severity index
    let severityIndex = messages[category].length - 1; // Default to highest severity
    for (let i = 0; i < thresholds[category].length; i++) {
      if (score <= thresholds[category][i]) {
        severityIndex = i;
        break;
      }
    }
  
    // **Return correct message**
    return messages[category][severityIndex] || "Unknown severity level";
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = evaluateScores();
    console.log("DASS-21 Result:", result);

    // Dispatch the result to the Redux store under the key "DASS21"
    dispatch(setEvaluationResults('DASS21', result));

    navigate('/dashboard');
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Mental Health Assessment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {test.questions.map((q, index) => (
          <div key={index} className="p-4 bg-blue-50 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <p className="text-lg font-semibold text-gray-700">{q.question}</p>
            <div className="mt-2">
              {["Did not apply at all", "Applied to some degree", "Applied considerably", "Applied very much"].map((option, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={q.question}
                    value={i}
                    onChange={() => setResponses(prev => ({ ...prev, [q.question]: i }))}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="mt-4">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DASS21Assessment;
