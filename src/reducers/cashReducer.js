import { ADD_WALLET, REMOVE_WALLET, SET_WALLET, TOGGLE_CURRENT_WALLET } from '../actions/types';

const initialState = {
  wallets: [
    {
      id: '1',
      title: 'Наличные',
      cash: 741244,
      typeCurrency: 'USD',
      typeCash: 'money',
      description: 'Мой самый первый кошелек werwe werwe werwe wer wer wer wer',
      icon: 'creditcard',
      categories: [ {} ]
    },
    {
      id: '2',
      title: 'Наличные',
      cash: 741244,
      typeCurrency: 'USD',
      typeCash: 'money',
      description: 'Мой самый первый кошелек werwe werwe werwe wer wer wer wer',
      icon: 'creditcard',
      categories: [ {} ]
    },
    {
      id: '3',
      title: 'Наличные',
      cash: 741244,
      typeCurrency: 'USD',
      typeCash: 'money',
      description: 'Мой самый первый кошелек werwe werwe werwe wer wer wer wer',
      icon: 'creditcard',
      categories: [ {} ]
    }
  ],
  currentWallet: 'all'
};

const cashReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_WALLET:
    return {
      ...state,
      wallets: [ ...state.wallets, payload.wallet ]
    };
  case REMOVE_WALLET:
    return {
      ...state,
      wallets: state.wallets.filter((wallet) => wallet.id !== payload.id)
    };
  case SET_WALLET:
    return {
      ...state,
      wallets: state.wallets.map((item) => (item.id === payload.wallet.id ? payload.wallet : item))
    };
  case TOGGLE_CURRENT_WALLET:
    return {
      ...state,
      currentWalletId: payload.id
    };
  default:
    return state;
  }
};

export default cashReducer;
