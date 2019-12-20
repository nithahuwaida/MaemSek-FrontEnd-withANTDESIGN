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
        if (action.payload.data.status === 'success') {
          const newData = action.payload.data.response;
          state.productList.push(newData);
          console.log('newData',newData)
        }
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productList: state.productList,
      };
      case 'PUT_PRODUCT_FULFILLED':
        let dataAfterEdit = state.productList;
        if (action.payload.status === 200) {
          dataAfterEdit = state.productList.map(product => {
            if (product.id === Number(action.payload.data.response.id))
              return action.payload.data.response;
            return product;
          });
        }
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          productList: dataAfterEdit,
        };
      case 'DELETE_PRODUCT_FULFILLED':
        let id = "";
        let dataAfterDelete = state.productList;
        if (action.payload.status === 200) {
          id = action.payload.data.response.id;
          dataAfterDelete = state.productList.filter(item => item.id !== Number(id));
        }
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
  