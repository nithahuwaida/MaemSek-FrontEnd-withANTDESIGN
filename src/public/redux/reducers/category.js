const initialState = {
    categoryList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  };
  
  const category = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CATEGORY_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'GET_CATEGORY_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_CATEGORY_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoryList: action.payload.data.response,
        };
      case 'POST_CATEGORY_FULFILLED':
      state.categoryList.push (action.payload.data.response);
      console.log('data post',action.payload.data.response)
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        categoryList: state.categoryList,
      };
      case 'PUT_CATEGORY_FULFILLED':
        const dataAfterPatch = state.categoryList.map (category => {
          if (category.id_category === parseInt(action.payload.data.result.id_category) ) {
            return action.payload.data.result;
          }
          return category;
        });
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoryList: dataAfterPatch,
        };
      case 'DELETE_CATEGORY_FULFILLED':
        const dataAfterDelete = state.categoryList.filter (
          category => category.id_category !== action.payload.data.id
        );
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoryList: dataAfterDelete,
        };
      default:
        return state;
    }
  };
  
  export default category;