
// import { createStore, combineReducers } from 'redux';
// import mentalHealthReducer from './Reducers/mentalHealthReducer';

// const rootReducer = combineReducers({
//   mentalHealth: mentalHealthReducer,
//   // add other reducers as needed
// });

// const store = createStore(rootReducer);

// export default store;
// store.js
import { createStore, combineReducers } from 'redux';
import mentalHealthReducer from './Reducers/mentalHealthReducer';

const rootReducer = combineReducers({
  mentalHealth: mentalHealthReducer,
  // add other reducers as needed
});

const store = createStore(rootReducer);

export default store;
