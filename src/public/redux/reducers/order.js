const initialState = {
    recentOrderList: {},
    detailOrder: [],
    productListCart: [],
    isLoading: false,
    isRejected: false,
    total_price: 0
  };
  
const order = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_IN_ORDER_PENDING':
            return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
            };
        case 'GET_PRODUCT_IN_ORDER_REJECTED':
            return {
            ...state,
            isLoading: false,
            isRejected: true,
            };
        case "GET_PRODUCT_IN_ORDER_FULFILLED":
            const productListCart =
                action.payload.status === 200
                ? action.payload.data.response.map(item => ({
                    ...item,
                    isselected: state.detailOrder.some(row => row.product_id === item.id)
                    }))
                : [];
            return {
                ...state,
                isLoading: false,
                productListCart: productListCart
            };
        case "ADD_ITEM_IN_ORDER":
            // let sumCart
            // let afterAddCart = state.detailOrder.map(item => ({...item}));
            // const filterOrderList = state.detailOrder.filter(value => value.id === action.product.id)
            // if(filterOrderList.length > 0){
            //     const noFilterOrderList = state.detailOrder.filter(value => value.id !== action.product.id)
            //     const updateQtyProduct = {
            //         ...filterOrderList[0],
            //         subTotal : filterOrderList[0].subTotal + action.product.price_product,
            //         productQty : filterOrderList[0].productQty + action.product.productQty,
            //         isselected : !filterOrderList[0].isselected,
            //     }
            //     afterAddCart = [...noFilterOrderList, updateQtyProduct]
            //     sumCart = action.product.subTotal
            // }else{
            //     action.product.subTotal = (action.product.subTotal === undefined) ? action.product.price_product : action.product.subTotal
            //     action.product.productQty = (action.product.productQty === undefined) ? 1 : action.product.productQty
            //     action.product.isselected = (action.product.isselected === undefined) ? true : action.product.isselected
            //     sumCart = action.product.subTotal
            //     afterAddCart.push(action.product)
            // }
            // return {
            //     ...state,
            //     detailOrder: afterAddCart,
            //     total_price: state.total_price + sumCart
            // };
            state.detailOrder.push({
                product_id: action.product.id,
                product_name: action.product.name_product,
                product_image: action.product.image_product,
                sub_total: action.product.price_product,
                quantity: 1,
                oldPrice: action.product.price_product,
                oldQuantity: action.product.quantity_product
            });
            const afterAddCart = state.productListCart.map(item => {
                if (item.id === Number(action.product.id))
                return { ...action.product, isselected: true };
                return item;
            });
            return {
                ...state,
                detailOrder: state.detailOrder,
                productListCart: afterAddCart,
                total_price: state.total_price + action.product.price_product
            };
        case "REMOVE_ITEM_IN_ORDER":
            const removeProduct = state.detailOrder.find(
                item =>
                Number(item.product_id) ===
                Number(action.product.id || action.product.product_id)
            );
            const afterRemove = state.detailOrder.filter(
                item =>
                Number(item.product_id) !==
                Number(action.product.id || action.product.product_id)
            );
            const afterEditRemove = state.productListCart.map(item => {
                if (Number(item.id) === Number(action.product.id))
                return { ...item, isselected: false };
                return item;
            });
        
            return {
                ...state,
                detailOrder: afterRemove,
                productListCart: afterEditRemove,
                total_price: state.total_price - removeProduct.sub_total
            };
        
        case "QUANTITY_CHANGE_IN_ORDER":
            const changeQuantity = state.detailOrder.map(item => {
                if (Number(item.product_id) === Number(action.product.id))
                return {
                    ...item,
                    quantity: action.product.quantity,
                    sub_total: item.oldPrice * action.product.quantity
                };
                return item;
            });
        
            const totalPrice = changeQuantity.reduce(
                (prev, next) => prev + next.sub_total,
                0
            );
        
            return {
                ...state,
                detailOrder: changeQuantity,
                total_price: totalPrice
            };
        default:
        return state;
    }
};
  
export default order;