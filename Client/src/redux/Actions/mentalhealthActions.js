// // mentalHealthActions.js
// export const SET_EVALUATION_RESULTS = 'SET_EVALUATION_RESULTS';

// export const setEvaluationResults = (results) => ({
//   type: SET_EVALUATION_RESULTS,
//   payload: results,
// });
// // 
// mentalHealthActions.js
// mentalHealthActions.js
// mentalHealthActions.js
// export const SET_EVALUATION_RESULTS = 'SET_EVALUATION_RESULTS';
// export const UPDATE_DASS21_RESULT = 'UPDATE_DASS21_RESULT';
// export const UPDATE_ASRS_RESULT = 'UPDATE_ASRS_RESULT';
// export const UPDATE_EMOTIONAL_DYSREGULATION_RESULT = 'UPDATE_EMOTIONAL_DYSREGULATION_RESULT';
// export const UPDATE_SELFHARM_RESULT = 'UPDATE_SELFHARM_RESULT';

// // Generic action to set (or replace) results for a form
// export const setEvaluationResults = (formName, results) => ({
//   type: SET_EVALUATION_RESULTS,
//   payload: { formName, results },
// });

// // Action to update (edit) the existing DASS21 result
// export const updateDASS21Result = (updatedData) => ({
//   type: UPDATE_DASS21_RESULT,
//   payload: updatedData,
// });

// // Action to update (edit) the existing ASRS result
// export const updateASRSResult = (updatedData) => ({
//   type: UPDATE_ASRS_RESULT,
//   payload: updatedData,
// });

// // Action to update (edit) the existing Emotional Dysregulation result
// export const updateEmotionalDysregulationResult = (updatedData) => ({
//   type: UPDATE_EMOTIONAL_DYSREGULATION_RESULT,
//   payload: updatedData,
// });

// // Action to update (edit) the existing Self-Harm result
// export const updateSelfHarmResult = (updatedData) => ({
//   type: UPDATE_SELFHARM_RESULT,
//   payload: updatedData,
// });

export const SET_EVALUATION_RESULTS = 'SET_EVALUATION_RESULTS';
export const UPDATE_DASS21_RESULT = 'UPDATE_DASS21_RESULT';
export const UPDATE_ASRS_RESULT = 'UPDATE_ASRS_RESULT';
export const UPDATE_EMOTIONAL_DYSREGULATION_RESULT = 'UPDATE_EMOTIONAL_DYSREGULATION_RESULT';
export const UPDATE_SELFHARM_RESULT = 'UPDATE_SELFHARM_RESULT';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';

// 📝 Action to store or update assessment results
export const setEvaluationResults = (formName, results) => ({
  type: SET_EVALUATION_RESULTS,
  payload: { formName, results },
});

// 📝 Action to store user details
export const setUserDetails = (userData) => ({
  type: SET_USER_DETAILS,
  payload: userData,
});

// 📝 Action to update specific assessment results
export const updateDASS21Result = (updatedData) => ({
  type: UPDATE_DASS21_RESULT,
  payload: updatedData,
});

export const updateASRSResult = (updatedData) => ({
  type: UPDATE_ASRS_RESULT,
  payload: updatedData,
});

export const updateEmotionalDysregulationResult = (updatedData) => ({
  type: UPDATE_EMOTIONAL_DYSREGULATION_RESULT,
  payload: updatedData,
});

export const updateSelfHarmResult = (updatedData) => ({
  type: UPDATE_SELFHARM_RESULT,
  payload: updatedData,
});
