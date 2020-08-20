import * as accountContans from '../const/account';

const initialState = {
  total_page: 1,
  data: [],
  detail: {}
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------REDUCER LIST ACCOUNT-----------------
    case accountContans.FETCH_ACCOUNT: {
      return action.data
    }
    case accountContans.GET_ALL_USER:
      return action.data
    // --------------REDUCER ADD ACCOUNT-----------------
    case accountContans.ADD_ACCOUNT: {
      return {
        ...state,
        data: [
          action.data,
          ..._.slice(state.data, 0, state.data.length - 1),
        ]
      }

    }
    // --------------REDUCER UPDATE ACCOUNT-----------------
    case accountContans.UPDATE_ACCOUNT: {
      const item = action.data;
      const index = _.findIndex(state.data, o => o.id === item.id);
      return {
        ...state,
        data: [
          ..._.slice(state.data, 0, index),
          item,
          ..._.slice(state.data, index + 1),
        ],
        detail: item
      };
    }
    // --------------REDUCER DELETE ACCOUNT-----------------
    case accountContans.DELETE_ACCOUNT: {
      const { data } = action;
      return {
        ...state,
        data: state.data.filter(item => item.id !== data.id)
      };
    }
    // --------------REDUCER DETAIL ACCOUNT-----------------
    case accountContans.DETAIL_ACCOUNT: {
      return {
        ...state,
        detail: action.data
      };
    }
    default:
      return state;
  }
};

export default reducer;
