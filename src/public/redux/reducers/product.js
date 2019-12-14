const initialState = {
    productList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  };
  
  const product = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PRODUCT_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'GET_PRODUCT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_PRODUCT_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          productList: action.payload.data.response,
        };
      case 'POST_PRODUCT_FULFILLED':
      state.productList.push (action.payload.data.response);
      console.log('data post',action.payload.data.response)
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productList: state.productList,
      };
      case 'PUT_PRODUCT_FULFILLED':
        const dataAfterPatch = state.productList.map (product => {
          if (product.id_product === parseInt(action.payload.data.result.id_product) ) {
            return action.payload.data.result;
          }
          return product;
        });
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          productList: dataAfterPatch,
        };
      case 'DELETE_PRODUCT_FULFILLED':
        const dataAfterDelete = state.productList.filter (
          product => product.id_product !== action.payload.data.id
        );
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          productList: dataAfterDelete,
        };
      default:
        return state;
    }
  };
  
  export default product;
  