// reducers/authReducer.js
const initialState = {
    isAuthenticated: false,
    user:null,
    userId: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          userId: action.payload.userId
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          userId:null
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  