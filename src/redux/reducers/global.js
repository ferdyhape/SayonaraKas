const initGlobalState = {
  isError: false,
  isLogin: false,
  user: {},
  listPemasukan: [],
  listPengeluaran: [],
  listPemasukan2: [],
  listPengeluaran2: [],
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

  if (action.type === 'SET_LOGIN') {
    return {
      ...state,
      isLogin: action.value,
    };
  }

  if (action.type === 'SET_USER') {
    return {
      ...state,
      user: action.value,
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

  if (action.type === 'SET_LIST_PEMASUKAN2') {
    return {
      ...state,
      listPemasukan2: action.value,
    };
  }

  if (action.type === 'SET_LIST_PENGELUARAN2') {
    return {
      ...state,
      listPengeluaran2: action.value,
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
