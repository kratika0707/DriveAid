// reducers.js
import { combineReducers } from 'redux';
import authReducer from '../Reducers/authreducer'; // Example reducer

const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers as needed
});

export default rootReducer;
