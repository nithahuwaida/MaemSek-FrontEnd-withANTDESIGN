const initialState = {
    userList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  };
  
  const user = (state = initialState, action) => {
    switch (action.type) {
      case 'POST_USER_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'POST_USER_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'POST_LOGIN_FULFILLED':
      state.userList = action.payload.data.response;
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        userList: state.userList,
      };
      case 'POST_REGISTER_FULFILLED':
      state.userList.push (action.payload.data.response);
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        userList: state.userList,
      };
      default:
        return state;
    }
  };
  
  export default user;
  