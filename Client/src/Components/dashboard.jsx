
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEvaluationResults } from "../../src/redux/Actions/mentalhealthActions";
import { useNavigate } from "react-router-dom";

const ConditionRouter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const isNavigating = useRef(false); // Prevents duplicate navigation

  // Retrieve stored results under "GeneralAssessment"
  const generalResults = useSelector(
    (state) => state.mentalHealth.evaluationResults.GeneralAssessment
  ) || [];

  useEffect(() => {
    console.log("🛠 Ordered Results:", generalResults);

    if (!isProcessing && generalResults.length > 0 && !isNavigating.current) {
      setIsProcessing(true);
      isNavigating.current = true; // Prevent duplicate navigation

      // Take the first condition from the array
      const condition = generalResults[0];
      console.log("🔄 Processing condition:", condition);

      // Map category names to routes
      const routeMapping = {
        "Self-harm": "/selfHarm",
        "DAS": "/daas",
        "ADHD": "/adhd",
        "Emotional Dysregulation": "/emoDis"
      };

      const route = routeMapping[condition.category];

      if (route) {
        console.log("➡️ Navigating to:", route);

        // Delay navigation slightly to ensure the UI updates
        setTimeout(() => {
          navigate(route);

          // Delay Redux state update slightly to avoid rapid re-renders
          setTimeout(() => {
            const updatedResults = generalResults.slice(1);
            dispatch(setEvaluationResults("GeneralAssessment", updatedResults));
            isNavigating.current = false; // Allow next processing
            setIsProcessing(false);
          }, 2000); // 2s delay ensures navigation renders properly

        }, 1000); // 1s delay before navigating
      }
    }

    if (generalResults.length === 0 && !isProcessing) {
      console.log("✅ All conditions processed. Redirecting to /fp...");

      setTimeout(() => {
        navigate("/fp");
      }, 2000);
    }
  }, [generalResults, dispatch, navigate, isProcessing]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto text-center animate-fadeIn">
      <h2 className="text-2xl font-bold text-blue-600">Processing...</h2>
      <p className="text-lg text-gray-700">Please wait while we navigate to the next assessment.</p>
    </div>
  );
};

export default ConditionRouter;
