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
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        categoryList: state.categoryList,
      };
      case 'PUT_CATEGORY_FULFILLED':
        let dataAfterEdit = state.categoryList;
        if (action.payload.status === 200) {
          dataAfterEdit = state.categoryList.map(category => {
            if (category.id === Number(action.payload.data.response.id))
              return action.payload.data.response;
            return category;
          });
        }
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          categoryList: dataAfterEdit,
        };
      case 'DELETE_CATEGORY_FULFILLED':
        let id = "";
        let dataAfterDelete = state.categoryList;
        if (action.payload.status === 200) {
          id = action.payload.data.response.id;
          dataAfterDelete = state.categoryList.filter(item => item.id !== Number(id));
        }
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