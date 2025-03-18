import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEvaluationResults } from "../../src/redux/Actions/mentalhealthActions";
import { useNavigate } from "react-router-dom";

const ConditionRouterr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  // Retrieve ordered results from Redux store
  const generalResults = useSelector(
    (state) => state.mentalHealth.evaluationResults.GeneralAssessment
  ) || [];

  useEffect(() => {
    if (generalResults.length > 0 && !processing) {
      setProcessing(true); // Prevent multiple triggers

      // Take the first condition from the array
      const currentCondition = generalResults[0];
      console.log("🔄 Processing condition:", currentCondition);

      // Map category names to routes
      const routeMapping = {
        "Self-harm": "/selfHarm",
        "DAS": "/daas",
        "ADHD": "/adhd",
        "Emotional Dysregulation": "/emoDis"
      };

      const route = routeMapping[currentCondition.category];

      if (route) {
        console.log("➡️ Navigating to:", route);

        // Delay navigation slightly to ensure state updates first
        setTimeout(() => {
          navigate(route);
        }, 500);

        // Remove the first condition and update the Redux store
        const updatedResults = generalResults.slice(1);
        dispatch(setEvaluationResults("GeneralAssessment", updatedResults));
      }
    } else if (generalResults.length === 0 && processing) {
      console.log("✅ All conditions processed. Redirecting to /fp...");
      setTimeout(() => {
        navigate("/fp");
      }, 500);
    }
  }, [generalResults, dispatch, navigate, processing]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto text-center animate-fadeIn">
      <h2 className="text-2xl font-bold text-blue-600">Processing...</h2>
      <p className="text-lg text-gray-700">Please wait while we navigate to the next assessment.</p>
    </div>
  );
};

export default ConditionRouterr;
