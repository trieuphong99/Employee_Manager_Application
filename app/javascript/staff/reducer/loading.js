import * as uiType from '../const/loading';

const initialState = {
  showLoading: false,
};
const reducer= (state = initialState, action) => {
  switch (action.type) {
    case uiType.SHOW_LOADING: {
      return {
        ...state,
        showLoading: true,
      };
    }
    case uiType.HIDE_LOADING: {
      return {
        ...state,
        showLoading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
