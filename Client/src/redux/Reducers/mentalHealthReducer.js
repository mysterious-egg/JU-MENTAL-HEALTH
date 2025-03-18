// import { 
//   SET_EVALUATION_RESULTS, 
//   UPDATE_DASS21_RESULT, 
//   UPDATE_ASRS_RESULT, 
//   UPDATE_EMOTIONAL_DYSREGULATION_RESULT,
//   UPDATE_SELFHARM_RESULT 
// } from '../Actions/mentalhealthActions';

// const initialState = {
//   evaluationResults: {} // Holds results keyed by form names (e.g., DASS21, ASRS, EmotionalDysregulation, SelfHarm, etc.)
// };

// const mentalHealthReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_EVALUATION_RESULTS:
//       return {
//         ...state,
//         evaluationResults: {
//           ...state.evaluationResults,
//           [action.payload.formName]: action.payload.results,
//         },
//       };
//     case UPDATE_DASS21_RESULT:
//       return {
//         ...state,
//         evaluationResults: {
//           ...state.evaluationResults,
//           DASS21: {
//             ...state.evaluationResults.DASS21,
//             ...action.payload,
//           },
//         },
//       };
//     case UPDATE_ASRS_RESULT:
//       return {
//         ...state,
//         evaluationResults: {
//           ...state.evaluationResults,
//           ASRS: {
//             ...state.evaluationResults.ASRS,
//             ...action.payload,
//           },
//         },
//       };
//     case UPDATE_EMOTIONAL_DYSREGULATION_RESULT:
//       return {
//         ...state,
//         evaluationResults: {
//           ...state.evaluationResults,
//           EmotionalDysregulation: {
//             ...state.evaluationResults.EmotionalDysregulation,
//             ...action.payload,
//           },
//         },
//       };
//     case UPDATE_SELFHARM_RESULT:
//       return {
//         ...state,
//         evaluationResults: {
//           ...state.evaluationResults,
//           SelfHarm: {
//             ...state.evaluationResults.SelfHarm,
//             ...action.payload,
//           },
//         },
//       };
//     default:
//       return state;
//   }
// };

// export default mentalHealthReducer;
// // 
import { 
  SET_EVALUATION_RESULTS, 
  UPDATE_DASS21_RESULT, 
  UPDATE_ASRS_RESULT, 
  UPDATE_EMOTIONAL_DYSREGULATION_RESULT,
  UPDATE_SELFHARM_RESULT,
  SET_USER_DETAILS
} from '../Actions/mentalhealthActions';

const initialState = {
  evaluationResults: {},  // 📝 Holds all assessment results
  userDetails: {},  // 📝 Holds user personal details
};

const mentalHealthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVALUATION_RESULTS:
      return {
        ...state,
        evaluationResults: {
          ...state.evaluationResults,
          [action.payload.formName]: action.payload.results,
        },
      };

    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,  // Store user details
      };

    case UPDATE_DASS21_RESULT:
      return {
        ...state,
        evaluationResults: {
          ...state.evaluationResults,
          DASS21: {
            ...state.evaluationResults.DASS21,
            ...action.payload,
          },
        },
      };

    case UPDATE_ASRS_RESULT:
      return {
        ...state,
        evaluationResults: {
          ...state.evaluationResults,
          ASRS: {
            ...state.evaluationResults.ASRS,
            ...action.payload,
          },
        },
      };

    case UPDATE_EMOTIONAL_DYSREGULATION_RESULT:
      return {
        ...state,
        evaluationResults: {
          ...state.evaluationResults,
          EmotionalDysregulation: {
            ...state.evaluationResults.EmotionalDysregulation,
            ...action.payload,
          },
        },
      };

    case UPDATE_SELFHARM_RESULT:
      return {
        ...state,
        evaluationResults: {
          ...state.evaluationResults,
          SelfHarm: {
            ...state.evaluationResults.SelfHarm,
            ...action.payload,
          },
        },
      };

    default:
      return state;
  }
};

export default mentalHealthReducer;
