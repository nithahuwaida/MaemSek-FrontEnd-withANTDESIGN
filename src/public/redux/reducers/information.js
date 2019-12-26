const initialState = {
    infoList: [],
    infoLabelGrafik : [],
    infoValueGrafik: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  };
  
  const info = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_INFO_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'GET_INFO_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_INFO_FULFILLED':
        const sumTransaction = action.payload.data.response.sumTransaction
        const infoLabel = []
        const infoValue = []
        sumTransaction.map(item => infoValue.push(parseInt(item.total_transaction)))
        sumTransaction.map(item => {
          if(item.bulan === 1){
            infoLabel.push('Januari')
          }else if(item.bulan === 2){
            infoLabel.push('Februari')
          }else if(item.bulan === 3){
            infoLabel.push('Maret')
          }else if(item.bulan === 4){
            infoLabel.push('April')
          }else if(item.bulan === 5){
            infoLabel.push('Mei')
          }else if(item.bulan === 6){
            infoLabel.push('Juni')
          }else if(item.bulan === 7){
            infoLabel.push('Juli')
          }else if(item.bulan === 8){
            infoLabel.push('Agustus')
          }else if(item.bulan === 9){
            infoLabel.push('September')
          }else if(item.bulan === 10){
            infoLabel.push('Oktober')
          }else if(item.bulan === 11){
            infoLabel.push('November')
          }else if(item.bulan === 12){
            infoLabel.push('Desember')
          }
        })

        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          infoList: action.payload.data.response,
          infoLabelGrafik : infoLabel,
          infoValueGrafik : infoValue,
        };
      default:
        return state;
    }
  };
  
  export default info;