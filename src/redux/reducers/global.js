const initGlobalState = {
  isError: false,
  listPemasukan: [],
  listPengeluaran: [],
  totalPemasukan: 0,
  totalPengeluaran: 0,
};

export const globalReducer = (state = initGlobalState, action) => {
  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      isError: action.value.isError,
      message: action.value.message,
    };
  }

  if (action.type === 'SET_LIST_PEMASUKAN') {
    return {
      ...state,
      listPemasukan: action.value,
    };
  }

  if (action.type === 'SET_LIST_PENGELUARAN') {
    return {
      ...state,
      listPengeluaran: action.value,
    };
  }

  if (action.type === 'SET_TOTAL_PEMASUKAN') {
    return {
      ...state,
      totalPemasukan: action.value,
    };
  }

  if (action.type === 'SET_TOTAL_PENGELUARAN') {
    return {
      ...state,
      totalPengeluaran: action.value,
    };
  }

  return state;
};
